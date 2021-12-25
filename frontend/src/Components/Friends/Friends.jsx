import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeedLayout from "../Feed/Layout/FeedLayout";
import Posts from "../Posts/Posts";

const Friends = () => {
  const allPosts = useSelector((state) => state.post.allPosts?.posts);
  const fullPost = useSelector((state) => state.nav.fullPost);
  const user = useSelector((state) => state.user.user?.currentUser);
  const dispatch = useDispatch();
  const [deleteComment, setDeleteComment] = useState([]);
  const allComments = useSelector((state) => state.post.allPosts?.comments);
  const openedPost = allPosts?.filter((post) => post._id === fullPost.postId);
  const openedComment = allComments?.filter(
    (comment) => comment.postId === fullPost.postId
  );
  const filteredComment = openedComment.filter(
    (comment) => !deleteComment.includes(comment._id)
  );

  const [friendsPosts, setFriendsPosts] = useState(
    allPosts?.filter((post) => user?.followings.includes(post.userId))
  );
  useEffect(() => {
    setFriendsPosts(
      allPosts?.filter((post) => user?.followings.includes(post.userId))
    );
  }, []);

  return (
    <FeedLayout>
      {friendsPosts.map((post) => {
        return (
          <Posts
            key={post._id}
            post={post}
            comments={filteredComment}
            setDeleteComment={setDeleteComment}
            deleteComment={deleteComment}
          />
        );
      })}
    </FeedLayout>
  );
};

export default Friends;
