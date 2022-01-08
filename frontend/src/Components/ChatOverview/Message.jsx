import { useSelector } from "react-redux";
import { format } from "timeago.js";
const Message = (props) => {
  const user = useSelector((state) => state.user.user?.currentUser);
  const userPic = user?.profilePicture;
  const { message, own, partner } = props;
  return (
    <section className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className={own ? "msg-img-mypic" : "msg-img"} style={{backgroundColor: `${own ? user?.theme : partner?.theme}`}}src={own ? `${userPic}` : `${partner?.profilePicture}`} alt="pic"/>
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </section>
  );
};

export default Message;
