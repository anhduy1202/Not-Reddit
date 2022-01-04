import FeedLayout from "../Layout/FeedLayout";
import "./homepage.css";
import "../../Posts/post.css";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../../redux/apiRequests";
import Popup from "../Popup/Popup";
import Posts from "../../Posts/Posts";
import FullPost from "../../Posts/FullPost/FullPost";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { unmountPost } from "../../../redux/postSlice";
import Loading from "../../Loading/Loading";
import useInfiniteScroll from "../../Hooks/useInfiniteScroll";

const HomePage = () => {
  const user = useSelector((state) => state.user.user?.currentUser);
  const location = useLocation();
  const createPost = useSelector((state) => state.post.createPost);
  const fullPost = useSelector((state) => state.nav.fullPost);
  const allComments = useSelector((state) => state.comment.addComments);
  const deleteComment = useSelector((state) => state.comment.deleteComments);
  const interactPost = useSelector((state) => state.post.interactPost);
  const allPosts = useSelector((state) => state.post.allPosts?.posts);
  const [deletedPostId, setDeletedId] = useState([]);
  const isDelete = useSelector((state) => state.nav.deleteState);
  const [filter, setFilters] = useState("");
  const loading = useSelector((state) => state.post.allPosts?.pending);
  const filteredPost = allPosts?.filter(
    (post) => !deletedPostId.includes(post._id)
  );
  const dispatch = useDispatch();
  const { pageNumber, setHasMore, setPageNumber, lastPostRef } =
    useInfiniteScroll(loading);

  useEffect(() => {
    dispatch(unmountPost());
  }, [location]);

  const handleFilters = (e) => {
    dispatch(unmountPost());
    setPageNumber(1);
    setHasMore(false);
    setFilters(e.target.value);
  };

  useEffect(() => {
    getAllPosts(dispatch, user?.accessToken, filter, pageNumber, setHasMore);
  }, [
    user,
    filter,
    createPost,
    allComments,
    dispatch,
    deleteComment,
    interactPost,
    pageNumber,
  ]);

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
              deletedPostId={deletedPostId}
              setDeletedPostId={setDeletedId}
              h1="Are you sure?"
              h2="You cannot restore posts that have been deleted"
              button1="Go Back"
              button2="Delete"
            />
          )}
        </div>
        <div className="homepage-post">
          <Loading
            loadingType="BeatLoader"
            color="white"
            size="10px"
            loading={loading}
          />
          {fullPost.open && <FullPost />}
          {filteredPost?.map((post, idx) => {
            if (filteredPost.length === idx + 1) {
              return <Posts key={filteredPost?._id} ref={lastPostRef} post={post} />;
            }
            return <Posts key={filteredPost?._id} post={post} />;
          })}
        </div>
      </section>
    </FeedLayout>
  );
};

export default HomePage;
