import { useEffect } from "react";
import { useSelector } from "react-redux";
import "../feed.css";
const FeedHeader = (props) => {
  const { setOpen, isOpen } = props;
  const user = useSelector((state) => state.auth.login?.currentUser);
  useEffect(()=>{
    console.log(isOpen);
  },[isOpen])
  return (
    <header className="feed-logo">
      <img
        onClick={() => setOpen(true)}
        className="feed-logo-img"
        src={user?.profilePicture}
        alt=""
      />
    </header>
  );
};

export default FeedHeader;
