import upVoteIcon from "../../assets/icons/upvote.svg";
import downVoteIcon from "../../assets/icons/downvote.svg";
import commentIcon from "../../assets/icons/comments.svg";
import trashIcon from "../../assets/icons/trash.svg";
import editIcon from "../../assets/icons/edit.svg";
import { useEffect } from "react";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserPost } from "../../redux/apiRequests";
import "./post.css";
import "../Feed/HomePage/homepage.css";
import { setDelete } from "../../redux/navigateSlice";
const Posts = (props) => {
  const { post } = props;
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user?.currentUser);
  const tags = ["None", "NSFW", "Mood", "Quotes", "Shitpost"];
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(
      setDelete({
        status: false,
        open: true,
        id: id,
      })
    );
  };

  return (
    <div key={post?._id} className="post-container">
      <div className="post-info">
        <div
          className="post-ava-container"
          style={{ backgroundColor: `${post?.theme}` }}
        >
          <img
            className="post-ava"
            src={post?.avaUrl}
            onClick={() => navigate(`/user/${post?.userId}`)}
            alt="post user img"
          />
        </div>
        <div className="post-author">
          u/{post?.username}
          <div className="post-time">{format(post?.createdAt)}</div>
        </div>
        {user?._id === post?.userId && (
          <div className="post-edit-delete">
            <img
              src={trashIcon}
              alt="delete"
              onClick={() => handleDelete(post?._id)}
            />
            <img src={editIcon} alt="delete" />
          </div>
        )}
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
            {post?.upvotes?.length - post?.downvotes?.length}
          </div>
          <div className="downvote">
            <img src={downVoteIcon} alt="" />
          </div>
          <div className="comments">
            <img src={commentIcon} alt="" />
          </div>
          <div className="comment-no"> {post?.comments?.length} </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
<></>;
