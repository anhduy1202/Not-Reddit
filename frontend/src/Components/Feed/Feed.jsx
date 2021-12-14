import "./feed.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import SideBar from "./FeedSideBar";
import { Link, useNavigate } from "react-router-dom";
const Feed = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [isOpen, setOpen] = useState(false);
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
          {isOpen && (
            <div className="feed-sidebar">
              <SideBar setOpen={setOpen} />
            </div>
          )}
          <section
            className={`${isOpen ? "feed-container-opened" : "feed-container"}`}
          >
            <header className="feed-logo">
              <img
                onClick={() => setOpen(true)}
                className="feed-logo-img"
                src={user?.profilePicture}
                alt=""
              />
            </header>
            <Link to="/user/122"> go to header</Link>
          </section>
        </>
      )}
    </>
  );
};

export default Feed;
