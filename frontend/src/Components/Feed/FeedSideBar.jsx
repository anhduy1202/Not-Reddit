import "./sidebar.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import arrowDown from "../../assets/icons/arrow.svg";
import shirtIcon from "../../assets/icons/shirt.svg";
import karmasIcon from "../../assets/icons/karmas.svg";
import cakeIcon from "../../assets/icons/cake.svg";
import SideNavBar from "./SideNavBar/SideNavBar";
import { useEffect } from "react";

const SideBar = (props) => {
  const { setOpen } = props;
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user?.currentUser);

  const goToHeader = () => {
    let id = user?._id;
    navigate("/user/" + id);
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      {user && (
        <>
          <div className="sidebar-close" onClick={() => setOpen(false)}>
            X
          </div>
          <section className="sidebar-container">
            <div className="sidebar-ava">
              <img src={user?.profilePicture} className="sidebar-img" />
            </div>
            <div className="sidebar-username">
              u/{user?.username}
              <img className="sidebar-username-dropdown" src={arrowDown} />
            </div>
            <div className="sidebar-styleava">
              <img src={shirtIcon} />
              <p className="sidebar-styleava-title" onClick={goToHeader}>
                Style Avatar
              </p>
            </div>
            <div className="sidebar-info">
              <div className="karmas-container">
                <img src={karmasIcon} className="karmas-logo" />
                <p className="karmas-title">
                  {user?.karmas}
                  <div className="karmas-header">Karma </div>
                </p>
              </div>
              <div className="age-container">
                <img src={cakeIcon} className="age-logo" />
                <p className="age-title">
                  {format(user?.createdAt).split("ago")}
                  <div className="age-header"> Age </div>{" "}
                </p>
              </div>
            </div>
            <div className="sidebar-nav">
              <SideNavBar id={user?._id} />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default SideBar;
