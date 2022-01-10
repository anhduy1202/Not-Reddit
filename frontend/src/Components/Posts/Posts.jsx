import { BiCommentDetail, BiUpvote, BiDownvote } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { format } from "timeago.js";
import { FiStar } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./post.css";
import "../Feed/HomePage/homepage.css";
import { fullPostToggle, setDelete } from "../../redux/navigateSlice";
import {
  addComment,
  addToFavorites,
  downvotePost,
  upvotePost,
} from "../../redux/apiRequests";
import Comments from "../Comments/Comments";
import InputField from "../InputFields/Input";
import React, { useState } from "react";
import listContainer from "../../utils/listContainer";
import { useEffect } from "react";

const Posts = React.forwardRef((props, ref) => {
  const { post, comments, setDeleteComment, deleteComment } = props;
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.user.user?.currentUser);
  const [totalVotes, setTotal] = useState(
    post?.upvotes?.length - post?.downvotes?.length
  );
  const [isUpVote, setUpVote] = useState(post?.upvotes?.includes(user?._id));
  const [isDownVote, setDownVote] = useState(
    post?.downvotes?.includes(user?._id)
  );
  const fullPost = useSelector((state) => state.nav.fullPost);
  const tags = listContainer.tags;
  const dispatch = useDispatch();
  useEffect(() => {
    setUpVote(post?.upvotes?.includes(user?._id));
    setDownVote(post?.downvotes?.includes(user?._id));
    setTotal(post?.upvotes?.length - post?.downvotes?.length);
  }, [fullPost]);
  const handleDelete = (id) => {
    dispatch(
      setDelete({
        status: false,
        open: true,
        id: id,
      })
    );
  };
  const handleReadmore = (id) => {
    const setFullPost = {
      open: true,
      postId: id,
    };
    dispatch(fullPostToggle(setFullPost));
  };
  const closeFullPost = () => {
    const closePost = {
      open: false,
    };
    dispatch(fullPostToggle(closePost));
  };
  const handleUpVote = (id) => {
    const userId = {
      userId: user?._id,
    };
    setTotal(
      isUpVote ? totalVotes - 1 : isDownVote ? totalVotes + 2 : totalVotes + 1
    );
    setUpVote(isUpVote ? false : true);
    setDownVote(false);
    upvotePost(dispatch, user?.accessToken, id, userId);
  };
  const handleDownVote = (id) => {
    const userId = {
      userId: user?._id,
    };
    setTotal(
      isDownVote ? totalVotes + 1 : isUpVote ? totalVotes - 2 : totalVotes - 1
    );
    setDownVote(isDownVote ? false : true);
    setUpVote(false);
    downvotePost(dispatch, user?.accessToken, id, userId);
  };

  const handleComment = (event, id) => {
    event.preventDefault();
    const newComment = {
      content: comment,
      ownerId: user?._id,
    };
    setComment("");
    addComment(dispatch, user?.accessToken, id, newComment);
  };

  return (
    <div key={post?._id} ref={ref} className="post-container">
      {fullPost?.postId === post?._id && (
        <div className="close-post" onClick={closeFullPost}>
          Close
        </div>
      )}
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
        <div className="features-container">
          {(user?._id === post?.userId || user?.isAdmin) && (
            <div className="post-edit-delete">
              <BsTrash
                size={"24px"}
                color="red"
                onClick={() => handleDelete(post?._id)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="post-context">
        <button className={`posts-tags-${tags[post?.tags]}`}>
          {" "}
          {tags[post?.tags]}
        </button>
        <div className="post-title">{post?.title}</div>
        {fullPost?.postId === post?._id ? (
          <></>
        ) : (
          post?.description?.length > 200 && (
            <span
              className="post-desc-readmore"
              onClick={() => handleReadmore(post?._id)}
            >
              Click to read more
            </span>
          )
        )}
        <div
          className={`${
            fullPost?.postId === post?._id ? "post-desc-full" : "post-desc"
          }`}
        >
          {post?.description}
        </div>
        {post?.imageUrl && (
          <div className="post-image-container">
            <img className="post-image" src={post?.imageUrl} alt="postImg" />
          </div>
        )}
      </div>
      <div className="post-interactions">
        <div className="post-vote">
          <div className="upvote">
            <BiUpvote
              size={"24px"}
              color={`${isUpVote ? "#ff9051" : ""}`}
              onClick={() => handleUpVote(post?._id)}
            />
          </div>
          <div className="votes">{totalVotes}</div>
          <div className="downvote">
            <BiDownvote
              size={"24px"}
              color={`${isDownVote ? "rgb(146, 0, 214)" : ""}`}
              onClick={() => handleDownVote(post?._id)}
            />
          </div>
          <div className="comments">
            <BiCommentDetail
              size={"24px"}
              onClick={() => handleReadmore(post?._id)}
            />
          </div>
          <div className="comment-no"> {post?.comments} </div>
        </div>
        {fullPost?.postId === post?._id && (
          <div className="comments-opened">
            <div className="comments-title">All comments</div>
            {comments?.map((comment) => {
              return (
                <Comments
                  key={comment._id}
                  _id={comment._id}
                  setDeleteComment={setDeleteComment}
                  deleteComment={deleteComment}
                  postId={comment.postId}
                  ownerId={comment.ownerId}
                  username={comment.username}
                  avaUrl={comment.avaUrl}
                  theme={comment.theme}
                  createdAt={comment.createdAt}
                  updatedAt={comment.updatedAt}
                  content={comment.content}
                />
              );
            })}
            <form
              className="comments-interact"
              onSubmit={(e) => handleComment(e, post?._id)}
            >
              <img
                src={user?.profilePicture}
                className="user-avatar"
                style={{ backgroundColor: `${user?.theme}` }}
                alt="user avatar"
              />
              <InputField
                data={comment}
                value={comment}
                setData={setComment}
                type="text"
                placeholder="Add a comment"
                classStyle="comment-input"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
});

export default Posts;
<></>;
