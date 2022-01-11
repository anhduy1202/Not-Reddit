import { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";
import "./chatroom.css";
import { useState } from "react";
import { useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Message from "./Message";
import { baseURL } from "../../utils/listContainer";
import Footer from "../Footer/Footer";
import InputField from "../InputFields/Input";
const ChatRoom = () => {
  const user = useSelector((state) => state.user.user?.currentUser);
  const room = useSelector((state) => state.nav.message.room);
  const [messages, setMessage] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [receivedMsg, setReceivedMsg] = useState("");
  const socket = useRef();
  const [partner, setPartner] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const navigate = useNavigate();
  const scrollRef = useRef();
  const { id } = useParams();
  const axiosInstance = axios.create({
    headers: {
      token: `Bearer ${user?.accessToken}`,
    },
  });

  const handleGoBack = () => {
    navigate("/");
    socket.current.disconnect();
  };
  useEffect(() => {
    socket.current = io("https://reddat-socket.onrender.com", {
      transports: ["websocket"],
    });
    socket.current.on("getMessage", (data) => {
      setReceivedMsg({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    receivedMsg &&
      room?.members.includes(receivedMsg.sender) &&
      setMessage((prev) => [...prev, receivedMsg]);
  }, [receivedMsg, room]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    console.log(room._id);
    const getMessage = async () => {
      try {
        const partnerId = room?.members.find((m) => m !== user?._id);
        axios
          .all([
            axiosInstance.get(`${baseURL}/users/${partnerId}`),
            axiosInstance.get(`${baseURL}/message/${room._id}`),
          ])
          .then(
            axios.spread((partnerRes, msgRes) => {
              setPartner(partnerRes.data);
              setMessage(msgRes.data);
            })
          )
          .catch((err) => {
            console.log(err);
          });
      } catch (e) {
        console.log(e);
      }
    };
    getMessage();
  }, [room]);

  const submitMessage = async () => {
    const message = {
      sender: user?._id,
      text: newMsg,
      conversationId: id,
    };
    if (newMsg.length === 0) {
      console.log("Empty msg");
    } else {
      const receiverId = partner?._id;
      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMsg,
      });
      try {
        const res = await axios.post(`${baseURL}/message`, message, {
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
      <div className="convo-header">
        <div className="go-back-convo" onClick={handleGoBack}>
          Back
        </div>
        <div className="message-header"> {partner?.username} </div>
      </div>
      <div className="chat-box-top">
        {messages.map((msg) => {
          return (
            <div ref={scrollRef} className="msg-container">
              <Message
                message={msg}
                own={msg.sender === user._id}
                partner={partner}
              />
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
