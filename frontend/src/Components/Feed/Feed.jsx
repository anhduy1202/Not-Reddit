import "./feed.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import SideBar from "./FeedSideBar";
import { Link, useNavigate } from "react-router-dom";
import FeedHeader from "./Header/FeedHeader";
const Feed = (props) => {
  const { setOpenSide, isOpenSide } = props;
  const user = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      {user && (
        <>
          <div
            className={`${isOpenSide ? "feed-sidebar-opened" : "feed-sidebar"}`}
          >
            <SideBar setOpen={setOpenSide} />
          </div>
          <section
            className={`${
              isOpenSide ? "feed-container-opened" : "feed-container"
            }`}
          >
            <FeedHeader setOpen={setOpenSide} isOpen={isOpenSide} user={user} />
          </section>
        </>
      )}
    </>
  );
};

export default Feed;
