import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/apiRequests";
import { makePostToggle } from "../../redux/navigateSlice";
import InputField from "../InputFields/Input";
import { listContainer } from "../../utils/listContainer";
import "./post.css";
const MakePost = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user?.currentUser);
  const [title, setTitle] = useState("Add a title");
  const [desc, setDesc] = useState("Add some descriptions");
  const [selectIdx, setSelectIdx] = useState(0);
  const tags = listContainer.tags;
  const [previewSource, setPreviewSource] = useState("");
  const handlePost = () => {
    if (!previewSource) {
      const newPost = {
        userId: user?._id,
        title: title,
        description: desc,
        tags: selectIdx,
      };
      createPost(dispatch, user?.accessToken, newPost, makePostToggle);
    } else if (previewSource) {
      const newPost = {
        userId: user?._id,
        title: title,
        description: desc,
        tags: selectIdx,
        imageUrl: previewSource,
      };
      createPost(dispatch, user?.accessToken, newPost, makePostToggle);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const removePreviewSrc = () => {
    setPreviewSource("");
  };

  return (
    <section className="makepost-container">
      <div className="makepost-navigation">
        <p className="makepost-save" onClick={handlePost}>
          Post
        </p>
      </div>
      <InputField
        type="text"
        data={title}
        inputType="textarea"
        setData={setTitle}
        label="Title"
        classStyle="makepost-title"
      />
      <InputField
        type="text"
        data={desc}
        inputType="textarea"
        setData={setDesc}
        label="Descriptions"
        classStyle="makepost-desc"
      />
      <label className="makepost-file-label">
        <input
          type="file"
          id="fileInput"
          name="image"
          onChange={handleFileInputChange}
          className="makepost-img"
        />
      </label>
      {previewSource && (
        <div className="makepost-img-preview">
          <p className="remove-preview" onClick={removePreviewSrc}>
            {" "}
            X{" "}
          </p>
          <img src={previewSource} alt="chosen" />
        </div>
      )}
      <label> Tags </label>
      <div className="makepost-tags">
        {tags.map((tag, idx) => {
          return (
            <button
              key={idx}
              className={`${
                selectIdx === idx
                  ? `makepost-tags-selected`
                  : `makepost-tags-${tag}`
              }`}
              onClick={() => setSelectIdx(idx)}
            >
              {tag}
            </button>
          );
        })}
      </div>
      <p className="makepost-save-bottom" onClick={handlePost}>
        POST
      </p>
    </section>
  );
};

export default MakePost;
