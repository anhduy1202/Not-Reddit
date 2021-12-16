import { Link } from "react-router-dom";
import profileIcon from "../../../assets/icons/profile.svg";
import savedIcon from "../../../assets/icons/saved.svg";
import exitIcon from "../../../assets/icons/logout.svg";


import "./navbar.css";
const SideNavBar = (props) => {
  const { id } = props;
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
      <div className="navbar-logout">
        <Link to={`/logout`}>
          <img src={exitIcon} />
          Log out{" "}
        </Link>
      </div>
    </nav>
  );
};

export default SideNavBar;
