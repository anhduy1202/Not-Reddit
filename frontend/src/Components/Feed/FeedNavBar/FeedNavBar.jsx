import { Link, useLocation } from "react-router-dom";
import "./feednavbar.css";
import {listContainer} from "../../../utils/listContainer";

const FeedNavBar = () => {
  const location = useLocation();
  return (
    <nav className="feed-navbar">
      {listContainer.routes.map((route, key) => {
        return (
          <Link
            key={key}
            to={route.path}
            className={`${
              location.pathname === route.path ? "feed-navbar-selected" : ""
            }`}
          >
            {route.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default FeedNavBar;
