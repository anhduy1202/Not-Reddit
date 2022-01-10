import { useState } from "react";
import { useSelector } from "react-redux";
import FeedLayout from "../Feed/Layout/FeedLayout";
import useFetchData from "../Hooks/useFetchData";
import { baseURL } from "../../utils/listContainer";
import Loading from "../Loading/Loading";
import Posts from "../Posts/Posts";

const Friends = () => {
  const fullPost = useSelector((state) => state.nav.fullPost);
  const user = useSelector((state) => state.user.user?.currentUser);
  const { isLoading, apiData, serverError } = useFetchData(
    `${baseURL}/post/timeline`,
    user?.accessToken,
    "post",
    user._id
  );

  const [deleteComment, setDeleteComment] = useState([]);
  const allComments = useSelector((state) => state.post.allPosts?.comments);
  const openedComment = allComments?.filter(
    (comment) => comment.postId === fullPost.postId
  );
  const filteredComment = openedComment.filter(
    (comment) => !deleteComment.includes(comment._id)
  );

  // const [friendsPosts, setFriendsPosts] = useState(
  //   allPosts?.filter((post) => user?.followings.includes(post.userId))
  // );
  // useEffect(() => {
  //   setFriendsPosts(
  //     allPosts?.filter((post) => user?.followings.includes(post.userId))
  //   );
  // }, []);

  return (
    <FeedLayout>
      <Loading
        loadingType="BeatLoader"
        color="white"
        size="10px"
        loading={isLoading}
      />
      {apiData?.map((post) => {
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
