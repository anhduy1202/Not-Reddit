import "./chatroom.css";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Conversation from "./Conversation";
import { setRoom } from "../../redux/navigateSlice";
const ChatOverview = () => {
  //dummy data
  const [conversation, setConversations] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //io("ws://localhost:8900")
  const user = useSelector((state) => state.user.user?.currentUser);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get("/v1/conversation/" + user?._id, {
          headers: { token: `Bearer ${user?.accessToken}` },
        });
        setConversations(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getConversation();
  }, []);

  const openConversation = (conversation) => {
    console.log("open convo");
    dispatch(setRoom(conversation));
    navigate("/chat/" + conversation._id);
  };
  return (
    <section className="message-container">
      <ul className="contact-list">
        <li> Chats </li>
        <li> Contacts </li>
      </ul>
      <div className="contact-container-div">
        {conversation.map((conversation) => {
          return (
            <div
              className="conversation-container"
              onClick={() => openConversation(conversation)}
            >
              <Conversation
                key={conversation._id}
                conversation={conversation}
                currentUser={user}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ChatOverview;
