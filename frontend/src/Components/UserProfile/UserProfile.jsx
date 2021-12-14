import { useSelector } from "react-redux";
import EditPage from "../Edit/EditPage";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MakePost from "../Posts/MakePost";
import Posts from "../Posts/Posts";
import "../../App.css";

const UserProfile = (props) => {
  const { isEdit, setEdit, isOpenPost, setOpen } = props;
  const pending = useSelector((state) => state.user.pending);
  const error = useSelector((state) => state.user.error);
  return (
    <section>
      {isEdit ? (
        <EditPage setEdit={setEdit} data-testid="editPage" />
      ) : !isEdit && !isOpenPost ? (
        <>
          <Header isEdit={isEdit} setEdit={setEdit} />
          <div className="post-container">
            <Posts setOpen={setOpen} />
          </div>
          <Footer setOpen={setOpen} isOpenPost={isOpenPost} />
        </>
      ) : (
        <>
          <Header isEdit={isEdit} setEdit={setEdit} />
          <MakePost setOpen={setOpen} />
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
