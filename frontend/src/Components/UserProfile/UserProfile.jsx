import { useDispatch, useSelector } from "react-redux";
import EditPage from "../Edit/EditPage";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MakePost from "../Posts/MakePost";
import Posts from "../Posts/Posts";
import "../../App.css";
import Popup from "../Feed/Popup/Popup";
import { useEffect } from "react";
import { getUserPost } from "../../redux/apiRequests";
import { useParams } from "react-router-dom";
import FullPost from "../Posts/FullPost/FullPost";

const UserProfile = (props) => {
  const { isEdit, setEdit } = props;
  const { id } = useParams();
  const post = useSelector((state) => state.post.userPost?.posts);
  const fullPost = useSelector((state) => state.nav.fullPost);
  const allComments = useSelector((state) => state.comment.addComments);
  const isOpenPost = useSelector((state) => state.nav.makepost.open);
  const isDelete = useSelector((state) => state.nav.deleteState);
  const interactPost = useSelector((state) => state.post.interactPost);
  const currentUser = useSelector((state) => state.user.otherUser?.otherUser);
  const user = useSelector((state) => state.user.user?.currentUser);
  const deletePost = useSelector((state) => state.post.deletePost);
  const createPost = useSelector((state) => state.post.createPost);
  const loading = useSelector((state) => state.user.otherUser?.pending);
  const pending = useSelector((state) => state.user.user.pending);
  const error = useSelector((state) => state.user.user.error);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserPost(dispatch, user?.accessToken, id);
  }, [dispatch, user, id, deletePost, createPost, interactPost, allComments]);

  return (
    <section className="userprofile-container">
      {isEdit ? (
        <EditPage setEdit={setEdit} data-testid="editPage" />
      ) : !isEdit && !isOpenPost ? (
        <>
          <Header isEdit={isEdit} setEdit={setEdit} />
          <div
            className="follow-container"
            style={{ boxShadow: `0px 0px 10px 3px ${currentUser?.theme}` }}
          >
            <div
              className="follower"
              style={{ borderRight: `1px solid ${currentUser?.theme}` }}
            >
              <p className="follower-num">{currentUser?.followers.length}</p>
              <p className="follower-title">Followers</p>
            </div>
            <div className="following">
              <p className="following-num">
                {" "}
                {currentUser?.followings.length}{" "}
              </p>
              <p className="following-title"> Following</p>
            </div>
          </div>
          <div className="popup">
            {isDelete?.open && (
              <Popup
                h1="Are you sure?"
                h2="You cannot restore posts that have been deleted"
                button1="Go Back"
                button2="Delete"
              />
            )}
          </div>
          <div className="fullpost-container">
            {fullPost.open && <FullPost />}
            {post?.map((post) => {
              return <Posts key={post._id} post={post} />;
            })}
          </div>
          <Footer />
        </>
      ) : (
        <>
          <Header isEdit={isEdit} setEdit={setEdit} />   
          <MakePost />
          <Footer />
        </>
      )}
      {pending && <p className="loading"> Loading... </p>}
      {!isEdit && error && (
        <p className="error"> Errors when fetching data from server </p>
      )}
    </section>
  );
};

export default UserProfile;
