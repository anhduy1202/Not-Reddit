import { format } from "timeago.js";
const Message = (props) => {
  const { message, own } = props;
  return (
    <section className={own ? "message own" : "message"}>
      <div className="messageTop">
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </section>
  );
};

export default Message;
