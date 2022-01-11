import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOnePost,
  getUserComment,
  getUserPost,
} from "../../../redux/apiRequests";
import Overlay from "../../Overlay/Overlay";
import Posts from "../Posts";

const FullPost = () => {
  const fullPost = useSelector((state) => state.nav.fullPost);
  const [deleteComment, setDeleteComment] = useState([]);
  const addComments = useSelector((state) => state.comment.addComments);
  const deleteComments = useSelector((state) => state.comment.deleteComments);
  const userComments = useSelector((state) => state.comment.userComments);
  const openedComment = userComments?.comments;
  const openedPost = useSelector((state) => state.post.onePost?.post);
  const user = useSelector((state) => state.user.user?.currentUser);
  const dispatch = useDispatch();
  const filteredComment = openedComment?.filter(
    (comment) => !deleteComment.includes(comment._id)
  );

  useEffect(() => {
    getOnePost(dispatch, user?.accessToken, fullPost?.postId);
  }, []);

  useEffect(() => {
    getUserComment(dispatch, user?.accessToken, fullPost?.postId);
  }, [addComments, deleteComments]);
  return (
    <>
      {fullPost.open && (
        <Overlay>
          <section className="fullpost-container">
            {userComments?.pending && <div className=""> Loading...</div>}
            <Posts
              type="fullpost"
              fullUp={openedPost.upvotes}
              fullDown={openedPost.fullDown}
              key={openedPost._id}
              post={openedPost}
              comments={filteredComment}
              setDeleteComment={setDeleteComment}
              deleteComment={deleteComment}
            />
          </section>
        </Overlay>
      )}
    </>
  );
};

export default FullPost;
