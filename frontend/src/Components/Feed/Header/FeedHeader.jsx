import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sideBarToggle } from "../../../redux/navigateSlice";
import InputField from "../../InputFields/Input";
import "../feed.css";
const FeedHeader = () => {
  const user = useSelector((state) => state.user.user?.currentUser);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
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
      <InputField
        classStyle="search-bar"
        placeholder="Search for username"
        data={search}
        setData={setSearch}
      />
    </header>
  );
};

export default FeedHeader;
