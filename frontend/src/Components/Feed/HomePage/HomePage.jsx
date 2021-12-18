import FeedLayout from "../Layout/FeedLayout";
import "./homepage.css";
import "../../Posts/post.css";
import upVoteIcon from "../../../assets/icons/upvote.svg";
import downVoteIcon from "../../../assets/icons/downvote.svg";
import commentIcon from "../../../assets/icons/comments.svg";
import trashIcon from "../../../assets/icons/trash.svg";
import editIcon from "../../../assets/icons/edit.svg";
import rocketIcon from "../../../assets/icons/rocket.svg";
import { useState } from "react";
import { useEffect } from "react";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../../redux/apiRequests";
import Popup from "../Popup/Popup";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  //Dummy data
  const user = useSelector((state) => state.auth.login?.currentUser);
  const location = useLocation();
  const cat = location.pathname.split("/")[1];
  const allPosts = useSelector((state) => state.post.allPosts?.posts);
  const [isDelete, setDelete] = useState({
    status: false,
    id: 0,
  });
  const [filter,setFilters] = useState("");
  const tags = ["None", "NSFW", "Mood", "Quotes", "Shitpost"];
  const dispatch = useDispatch();

  // const [isDownVote, setDownVote] = useState(false);
  useEffect(() => {
    getAllPosts(dispatch, user?.accessToken,filter);
  }, [user,filter]);

  const handleDelete = (id) => {
    setDelete({
      status: true,
      id: id,
    });
  };

  const handleFilters = (e) => {
    setFilters(e.target.value);
  }

  return (
    <FeedLayout>
      <section className="homepage-container">
        <select className="filter-posts" onChange={handleFilters}>
          <option disabled selected value=""> SORT POSTS BY </option>
          <option value=""> 🤩 NEW</option>
          <option value="hot"> 🔥 HOT</option>
        </select>
        <div className="popup">
          {isDelete.status && (
            <Popup
              setDelete={setDelete}
              isDelete={isDelete}
              h1="Are you sure?"
              h2="You cannot restore posts that have been deleted"
              button1="Go Back"
              button2="Delete"
            />
          )}
        </div>
        <div className="homepage-post">
          {allPosts?.map((post, idx) => {
            return (
              <div key={post?._id} className="post-container">
                <div className="post-info">
                  <div
                    className="post-ava-container"
                    style={{ backgroundColor: `${post?.theme}` }}
                  >
                    <img
                      className="post-ava"
                      src={post.avaUrl}
                      alt="post user img"
                    />
                  </div>
                  <div className="post-author">
                    u/{post.username}
                    <div className="post-time">{format(post?.createdAt)}</div>
                  </div>
                  <div className="post-edit-delete">
                    <img
                      src={trashIcon}
                      alt="delete"
                      onClick={() => handleDelete(post._id)}
                    />
                    <img src={editIcon} alt="delete" />
                  </div>
                </div>
                <div className="post-context">
                  <button className={`posts-tags-${tags[post?.tags]}`}>
                    {" "}
                    {tags[post?.tags]}
                  </button>
                  <div className="post-title">{post?.title}</div>
                  <div className="post-desc">{post?.description}</div>
                </div>
                <div className="post-interactions">
                  <div className="post-vote">
                    <div className="upvote">
                      <img src={upVoteIcon} alt="" />
                    </div>
                    <div className="votes">
                      {post?.upvotes.length - post?.downvotes.length}
                    </div>
                    <div className="downvote">
                      <img src={downVoteIcon} alt="" />
                    </div>
                    <div className="comments">
                      <img src={commentIcon} alt="" />
                    </div>
                    <div className="comment-no"> {post?.comments.length} </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </FeedLayout>
  );
};

export default HomePage;
