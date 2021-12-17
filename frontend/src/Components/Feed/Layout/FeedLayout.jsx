import "../feed.css";
import { useSelector } from "react-redux";
import SideBar from "../SideBar/FeedSideBar";
import FeedHeader from "../Header/FeedHeader";
import FeedNavBar from "../FeedNavBar/FeedNavBar";
const FeedLayout = ({ children }) => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isOpen = useSelector((state) => state.nav.sidebar.open);

  return (
    <>
      {user && (
        <>
          <SideBar />
          <section
            className={`${isOpen ? "feed-container-opened" : "feed-container"}`}
          >
            <FeedHeader />
            <FeedNavBar />
            {children}
          </section>
        </>
      )}
    </>
  );
};

export default FeedLayout;
