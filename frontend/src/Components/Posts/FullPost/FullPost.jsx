import { useEffect } from "react";
import { useSelector } from "react-redux";
import Overlay from "../../Overlay/Overlay";
import Posts from "../Posts";

const FullPost = () => {
  const fullPost = useSelector((state) => state.nav.fullPost);
  const allPosts = useSelector((state) => state.post.allPosts?.posts);
  const openedPost = allPosts.filter((post) => post._id === fullPost.postId);
  useEffect(() => {
    console.log(openedPost);
  }, []);
  return (
    <>
      {fullPost.open && (
        <Overlay>
          <section className="fullpost-container">
            {openedPost?.map((post) => {
              return <Posts post={post} />;
            })}
          </section>
        </Overlay>
      )}
    </>
  );
};

export default FullPost;
