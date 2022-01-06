import { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import axios from "axios";
import "./chatroom.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
const ChatRoom = () => {
  const user = useSelector((state) => state.user.user?.currentUser);
  const room = useSelector((state) => state.nav.message.room);
  const [message, setMessage] = useState([]);
  const navigate = useNavigate();
  const partnerName = useSelector((state) => state.nav.message.partnerName);
  const handleGoBack = () => {
    navigate("/");
  };
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
  return (
    <section className="convo-container">
      <div className="go-back-convo" onClick={handleGoBack}>
        <IoIosArrowRoundBack size={"48px"} />
      </div>
      <div className="message-header"> {partnerName} </div>
      <div className="msgs-container">
      {message.map((msg) => {
        return (
          <div className="msg-container">
            <Message message={msg} own={msg.sender === user._id} />
          </div>
        );
      })}
      </div>
    </section>
  );
};

export default ChatRoom;
