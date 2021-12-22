import FeedLayout from "../Layout/FeedLayout";
import "./homepage.css";
import "../../Posts/post.css";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../../redux/apiRequests";
import Popup from "../Popup/Popup";
import Posts from "../../Posts/Posts";
import FullPost from "../../Posts/FullPost/FullPost";

const HomePage = () => {
  const user = useSelector((state) => state.user.user?.currentUser);
  const createPost = useSelector((state) => state.post.createPost);
  const fullPost = useSelector((state) => state.nav.fullPost);
  const interactPost = useSelector((state) => state.post.interactPost);
  const allPosts = useSelector((state) => state.post.allPosts?.posts);
  const isDelete = useSelector((state) => state.nav.deleteState);
  const deletePost = useSelector((state) => state.post.deletePost);
  const [filter, setFilters] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getAllPosts(dispatch, user?.accessToken, filter);
    console.log("rendered");
  }, [user, filter, deletePost, createPost, interactPost]);

  const handleFilters = (e) => {
    setFilters(e.target.value);
  };

  return (
    <FeedLayout>
      <section className="homepage-container">
        {!isDelete.open && (
          <select className="filter-posts" onChange={handleFilters}>
            <option disabled value="">
              SORT POSTS BY
            </option>
            <option value=""> 🤩 NEW</option>
            <option value="hot"> 🔥 HOT</option>
          </select>
        )}
        <div className="popup">
          {isDelete.open && (
            <Popup
              h1="Are you sure?"
              h2="You cannot restore posts that have been deleted"
              button1="Go Back"
              button2="Delete"
            />
          )}
        </div>
        <div className="homepage-post">
          {fullPost.open && <FullPost />}
          {allPosts?.map((post, idx) => {
            return <Posts post={post} />;
          })}
        </div>
      </section>
    </FeedLayout>
  );
};

export default HomePage;
