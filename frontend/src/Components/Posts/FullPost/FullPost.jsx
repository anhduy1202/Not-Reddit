import { useEffect } from "react";
import { useSelector } from "react-redux";
import Comments from "../../Comments/Comments";
import Overlay from "../../Overlay/Overlay";
import Posts from "../Posts";

const FullPost = () => {
  const fullPost = useSelector((state) => state.nav.fullPost);
  const allPosts = useSelector((state) => state.post.allPosts?.posts);
  const allComments = useSelector((state) => state.post.allPosts?.comments);
  const openedPost = allPosts.filter((post) => post._id === fullPost.postId);
  const openedComment = allComments.filter(
    (comment) => comment.postId === fullPost.postId
  );

  return (
    <>
      {fullPost.open && (
        <Overlay>
          <section className="fullpost-container">
            {openedPost?.map((post) => {
              return (
                <>
                  <Posts key={post._id} post={post} comments={openedComment}/>
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
