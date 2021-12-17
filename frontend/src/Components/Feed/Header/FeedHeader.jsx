import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sideBarToggle } from "../../../redux/navigateSlice";
import "../feed.css";
const FeedHeader = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isOpen = useSelector((state) => state.nav.sidebar.open);
  const dispatch = useDispatch();
  const setOpen = () => {
    dispatch(sideBarToggle(true));
  };

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
