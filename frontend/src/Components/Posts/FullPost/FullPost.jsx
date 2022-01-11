import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserComment, getUserPost } from "../../../redux/apiRequests";
import { baseURL } from "../../../utils/listContainer";
import useFetchData from "../../Hooks/useFetchData";
import Overlay from "../../Overlay/Overlay";
import Posts from "../Posts";

const FullPost = () => {
  const fullPost = useSelector((state) => state.nav.fullPost);
  const [deleteComment, setDeleteComment] = useState([]);
  const addComments = useSelector((state) => state.comment.addComments);
  const deleteComments = useSelector((state) => state.comment.deleteComments);
  const userComments = useSelector((state) => state.comment.userComments);
  const openedComment = userComments?.comments;
  const user = useSelector((state) => state.user.user?.currentUser);
  const dispatch = useDispatch();
  const filteredComment = openedComment?.filter(
    (comment) => !deleteComment.includes(comment._id)
  );
  const { isLoading, apiData, serverError } = useFetchData(
    `${baseURL}/post/fullpost/${fullPost.postId}`,
    user?.accessToken,
    "get"
  );

  useEffect(() => {
    getUserComment(dispatch, user?.accessToken, fullPost?.postId);
  }, [addComments, deleteComments]);
  return (
    <>
      {fullPost.open && (
        <Overlay>
          <section className="fullpost-container">
            {userComments?.pending && <div className=""> Loading...</div>}
            {apiData?.map((post) => {
              return (
                <>
                  <Posts
                    key={post._id}
                    post={post}
                    comments={filteredComment}
                    setDeleteComment={setDeleteComment}
                    deleteComment={deleteComment}
                  />
                </>
              );
            })}
          </section>
        </Overlay>
      )}
    </>
  );
};

export default FullPost;
