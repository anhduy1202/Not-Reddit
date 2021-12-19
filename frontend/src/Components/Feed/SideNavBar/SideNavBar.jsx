import { Link, useNavigate } from "react-router-dom";
import profileIcon from "../../../assets/icons/profile.svg";
import savedIcon from "../../../assets/icons/saved.svg";
import exitIcon from "../../../assets/icons/logout.svg";

import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../../redux/apiRequests";
const SideNavBar = (props) => {
  const { id } = props;
  const user = useSelector(
    (state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    logOutUser(dispatch, user?.accessToken, user?._id, navigate);
  };
  return (
    <nav className="navbar-container">
      <div className="navbar-profile">
        <Link to={`/user/${id}`}>
          <img src={profileIcon} />
          My profile
        </Link>
      </div>
      <div className="navbar-saved">
        <Link to={`/user/${id}/saved`}>
          <img src={savedIcon} />
          Saved{" "}
        </Link>
      </div>
      <div className="navbar-logout" onClick={logOut}>
        <img src={exitIcon} />
        Log out{" "}
      </div>
    </nav>
  );
};

export default SideNavBar;
