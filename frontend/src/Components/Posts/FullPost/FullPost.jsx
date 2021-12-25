import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserPost } from "../../../redux/apiRequests";
import Comments from "../../Comments/Comments";
import Overlay from "../../Overlay/Overlay";
import Posts from "../Posts";

const FullPost = () => {
  const fullPost = useSelector((state) => state.nav.fullPost);
  const [deleteComment, setDeleteComment] = useState([]);
  const allPosts = useSelector((state) => state.post.allPosts?.posts);
  const allComments = useSelector((state) => state.post.allPosts?.comments);
  const openedPost = allPosts?.filter((post) => post._id === fullPost.postId);
  const openedComment = allComments?.filter(
    (comment) => comment.postId === fullPost.postId
  );
  const filteredComment = openedComment.filter(
    (comment) => !deleteComment.includes(comment._id)
  );
  useEffect(() => {
    console.log(openedPost);
  }, []);
  return (
    <>
      {fullPost.open && (
        <Overlay>
          <section className="fullpost-container">
            {openedPost?.map((post) => {
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
