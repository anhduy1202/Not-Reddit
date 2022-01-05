import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import {FaTshirt} from "react-icons/fa";
import { RiCopperCoinLine, RiCake3Line } from "react-icons/ri";
import SideNavBar from "../SideNavBar/SideNavBar";
import { sideBarToggle } from "../../../redux/navigateSlice";

const SideBar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user?.currentUser);
  const isOpen = useSelector((state) => state.nav.sidebar.open);
  const dispatch = useDispatch();
  const setOpen = () => {
    dispatch(sideBarToggle(false));
  };

  const goToHeader = () => {
    let id = user?._id;
    navigate("/user/" + id);
  };

  return (
    <>
      {user && (
        <>
          <div className={`${isOpen ? "feed-sidebar-opened" : "feed-sidebar"}`}>
            <div className="sidebar-close" onClick={setOpen}>
              X
            </div>
            <section className="sidebar-container">
              <div className="sidebar-ava">
                <img
                  src={user?.profilePicture}
                  className="sidebar-img"
                  alt="profile pic"
                />
              </div>
              <div className="text-4xl font-bold">
                u/{user?.username}
              </div>
              <div className="sidebar-styleava">
                <FaTshirt size={"24px"} className="sidebar-shirt"/>
                <span className="sidebar-styleava-title" onClick={goToHeader}>
                  Style Avatar
                </span>
              </div>
              <div className="sidebar-info">
                <div className="karmas-container">
                  <RiCopperCoinLine
                    size={"24px"}
                    color="rgb(2, 88, 158)"
                    className="karmas-logo"
                  />
                  <span className="karmas-title">
                    {user?.karmas}
                    <div className="karmas-header">Karma </div>
                  </span>
                </div>
                <div className="age-container">
                  <RiCake3Line
                    size={"24px"}
                    color="rgb(2, 88, 158)"
                    className="age-logo"
                  />
                  <span className="age-title">
                    {format(user?.createdAt).split("ago")}
                    <div className="age-header"> Age </div>{" "}
                  </span>
                </div>
              </div>
              <div className="sidebar-nav">
                <SideNavBar id={user?._id} />
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default SideBar;
