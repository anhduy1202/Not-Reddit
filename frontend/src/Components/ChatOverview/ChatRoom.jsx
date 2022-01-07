import { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";
import "./chatroom.css";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Message from "./Message";
import Footer from "../Footer/Footer";
import InputField from "../InputFields/Input";
const ChatRoom = () => {
  const user = useSelector((state) => state.user.user?.currentUser);
  const room = useSelector((state) => state.nav.message.room);
  const [messages, setMessage] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [isConnected, setConnected] = useState(false);
  const [receivedMsg, setReceivedMsg] = useState("");
  const socket = useRef();
  const navigate = useNavigate();
  const scrollRef = useRef();
  const { id } = useParams();
  const partnerName = useSelector(
    (state) => state.nav.message.partnerName?.username
  );
  const handleGoBack = () => {
    navigate("/");
  };
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setReceivedMsg({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    console.log(receivedMsg);
    receivedMsg &&
      room?.members.includes(receivedMsg.sender) &&
      setMessage((prev) => [...prev, receivedMsg]);
  }, [receivedMsg, room]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(`/v1/message/${room?._id}`, {
          headers: { token: `Bearer ${user.accessToken}` },
        });
        setMessage(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getMessage();
  }, []);
  const submitMessage = async () => {
    const message = {
      sender: user?._id,
      text: newMsg,
      conversationId: id,
    };
    if (newMsg.length === 0) {
      console.log("Empty msg");
    } else {
      const receiverId = room?.members.find((member) => member !== user?._id);
      socket.current.emit("sendMessage", {
        senderId: user?._id,
        receiverId: receiverId,
        text: newMsg,
      });
      try {
        const res = await axios.post("/v1/message", message, {
          headers: { token: `Bearer ${user.accessToken}` },
        });
        setMessage([...messages, res.data]);
        setNewMsg("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <section className="convo-container">
      <div className="go-back-convo" onClick={handleGoBack}>
        <IoIosArrowRoundBack size={"48px"} />
      </div>
      <div className="message-header"> {partnerName} </div>
      <div className="chat-box-top">
        {messages.map((msg) => {
          return (
            <div ref={scrollRef} className="msg-container">
              <Message message={msg} own={msg.sender === user._id} />
            </div>
          );
        })}
      </div>
      <div className="chat-box-bot">
        <InputField
          classStyle="chat-msg-input"
          inputType="textarea"
          placeholder="write something..."
          setData={setNewMsg}
          value={newMsg}
          data={newMsg}
        />
        <button className="chat-submit" onClick={submitMessage}>
          Send
        </button>
      </div>
      <Footer />
    </section>
  );
};

export default ChatRoom;
