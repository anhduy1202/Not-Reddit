import { useState, useEffect } from "react";
import axios from "axios";
import "./chatroom.css";
import { useDispatch } from "react-redux";
import { setPartnerName } from "../../redux/navigateSlice";

const Conversation = (props) => {
  const { conversation, currentUser } = props;
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser?._id);
    const getOtherUser = async () => {
      try {
        const res = await axios.get(`/v1/users/${friendId}`, {
          headers: { token: `Bearer ${currentUser.accessToken}` },
        });
        setUser(res.data);
        const partnerName = {
          id: res.data._id,
          username: res.data.username,
          profilePicture: res.data.profilePicture,
          theme: res.data.theme,
        };
        dispatch(setPartnerName(partnerName));
      } catch (e) {
        console.log(e);
      }
    };
    getOtherUser();
  }, []);
  return (
    <section className="contact-container">
      <div className="contact-img-container">
        <img
          src={user?.profilePicture}
          alt="profile pic"
          className="contact-img"
          style={{ backgroundColor: `${user?.theme}` }}
        />
      </div>
      <div className="preview-container">
        <div className="preview-username">{user?.username}</div>
      </div>
    </section>
  );
};

export default Conversation;
