import "../feed.css";
import { useSelector } from "react-redux";
import SideBar from "../SideBar/FeedSideBar";
import FeedHeader from "../Header/FeedHeader";
import FeedNavBar from "../FeedNavBar/FeedNavBar";
import Footer from "../../Footer/Footer";
import MakePost from "../../Posts/MakePost";
const FeedLayout = ({ children }) => {
  const isOpenPost = useSelector((state) => state.nav.makepost.open);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isOpen = useSelector((state) => state.nav.sidebar.open);

  return (
    <>
      {user && (
        <>
          <SideBar />

          {isOpenPost ? (
            <section
              className={`${
                isOpen ? "feed-container-opened" : "feed-container"
              }`}
            >
              <FeedHeader />
              <FeedNavBar />
              <MakePost />
            </section>
          ) : (
            <section
              className={`${
                isOpen ? "feed-container-opened" : "feed-container"
              }`}
            >
              <FeedHeader />
              <FeedNavBar />
              {children}
            </section>
          )}
            <Footer />
        </>
      )}
    </>
  );
};

export default FeedLayout;
