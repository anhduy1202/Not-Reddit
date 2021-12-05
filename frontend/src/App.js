import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import EditPage from "./Components/Edit/EditPage";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import MakePost from "./Components/Posts/MakePost";
import Posts from "./Components/Posts/Posts";

function App() {
  const [isEdit, setEdit] = useState(false);
  const [isOpenPost, setOpen] = useState(false);
  const pending = useSelector((state) => state.user.pending);
  const error = useSelector((state) => state.user.error);
  return (
    <div className="App">
      {isEdit ? (
        <EditPage setEdit={setEdit} data-testid="editPage"/>
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
    </div>
  );
}

export default App;
