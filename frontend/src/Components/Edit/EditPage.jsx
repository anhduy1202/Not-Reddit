import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import listContainer from "../../utils/listContainer";
import { updateUser } from "../../redux/apiRequests";
import InputField from "../InputFields/Input";

import "./edit.css";
const EditPage = (props) => {
  const { setEdit } = props;
  const { id } = useParams();
  const user = useSelector((state) => state.user.user?.currentUser);
  const [name, setName] = useState(user?.displayName);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [age, setAge] = useState(user?.age);
  const [about, setAbout] = useState(user?.about);
  const [theme, setTheme] = useState(user?.theme);
  const [url, setUrl] = useState(
    "https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a"
  );
  const dispatch = useDispatch();
  const avaUrl = listContainer.avaUrl;

  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(false);
    const updatedUser = {
      displayName: name,
      age: age,
      about: about,
      profilePicture: url,
      theme: theme,
    };
    updateUser(dispatch, updatedUser, id, user?.accessToken);
  };
  const changeAvatar = (e, idx) => {
    setUrl(e.target.src);
    setSelectedIdx(idx);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="edit-form"
        data-testid="editForm"
      >
        <section className="edit-container">
          <div className="close-container">
            <p className="close-x" onClick={() => setEdit(false)}>
              X
            </p>
            <button type="submit" className="close">
              SAVE
            </button>
          </div>
          <div className="edit-profile"> Edit Profile </div>
          <div className="input-container">
            <InputField
              type="text"
              data={user.name}
              setData={setName}
              label="Display name"
            />
            <InputField
              type="text"
              data={user.age}
              setData={setAge}
              label="Age"
            />
            <InputField
              inputType="textarea"
              data={user.about}
              setData={setAbout}
              classStyle="input-about"
              label="About"
            />
            <label> Profile Picture </label>
            <section className="input-image-container">
              {avaUrl.map((url, idx) => {
                return (
                  <>
                    <img
                      onClick={(e) => changeAvatar(e, idx)}
                      className={`${
                        selectedIdx === idx
                          ? `input-image-selected`
                          : `input-image`
                      }`}
                      src={url}
                      alt=""
                    />
                  </>
                );
              })}
            </section>
            <div className="theme-container">
              <label> Theme </label>
              <input
                className="theme-color"
                type="color"
                onChange={(e) => setTheme(e.target.value)}
              />
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default EditPage;
