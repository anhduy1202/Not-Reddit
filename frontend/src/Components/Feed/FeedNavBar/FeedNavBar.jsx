import { Link } from "react-router-dom";
import "./feednavbar.css";

const FeedNavBar = () => {
  return (
    <nav className="feed-navbar">
      <Link to="/"> Home </Link>
      <Link to="/news"> News </Link>
      <Link to="/friends"> Friends </Link>
    </nav>
  );
};

export default FeedNavBar;
