import { useSelector } from "react-redux";
import { format } from "timeago.js";
const Message = (props) => {
  const partnerTheme = useSelector((state) => state.nav.message?.partnerName?.theme);
  const partnerPic = useSelector((state) => state.nav.message?.partnerName?.profilePicture);
  const user = useSelector((state) => state.user.user?.currentUser);
  const userPic = user?.profilePicture;
  const { message, own } = props;
  return (
    <section className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className={own ? "msg-img-mypic" : "msg-img"} style={{backgroundColor: `${own ? user?.theme : partnerTheme}`}}src={own ? `${userPic}` : `${partnerPic}`} alt="pic"/>
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </section>
  );
};

export default Message;
