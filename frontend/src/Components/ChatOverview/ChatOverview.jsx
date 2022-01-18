import "./chatroom.css";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Conversation from "./Conversation";
import { baseURL } from "../../utils/listContainer";
import { setRoom } from "../../redux/navigateSlice";
import Loading from "../Loading/Loading";
const ChatOverview = () => {
  //dummy data
  const [conversation, setConversations] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  let filteredConversation = [];
  //io("ws://localhost:8900")
  const user = useSelector((state) => state.user.user?.currentUser);
  const axiosInstance = axios.create({
    headers: {
      token: `Bearer ${user?.accessToken}`,
    },
  });

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseURL}/conversation/` + user?._id, {
          headers: { token: `Bearer ${user?.accessToken}` },
        });
        setLoading(false);
        filteredConversation = res.data.filter((c) => c.messageCount > 0);
        setConversations(filteredConversation);
      } catch (e) {
        setLoading(false);
      }
    };
    getConversation();
  }, []);

  const openConversation = (conversation) => {
    dispatch(setRoom(conversation));
    navigate("/chat/" + conversation._id);
  };
  return (
    <section className="message-container">
      <ul className="contact-list">
        <li> Chats </li>
      </ul>
      <div className="contact-container-div">
        {isLoading ? (
          <Loading
            loadingType="ClipLoader"
            color="white"
            size="32px"
            loading={isLoading}
          />
        ) : (
          <>
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
          </>
        )}
      </div>
    </section>
  );
};

export default ChatOverview;
