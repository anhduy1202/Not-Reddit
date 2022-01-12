import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/apiRequests";
import { useFormik } from "formik";
import { makePostToggle } from "../../redux/navigateSlice";
import * as Yup from "yup";
import { listContainer } from "../../utils/listContainer";
import "./post.css";
import Loading from "../Loading/Loading";
const MakePost = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(10, "Minimum 10 characters")
        .max(100, "Maximum 100 characters")
        .required("Required"),
      desc: Yup.string().min(4, "Minimum 4 characters").required("Required"),
    }),
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user?.currentUser);
  const [selectIdx, setSelectIdx] = useState(0);
  const tags = listContainer.tags;
  const loading = useSelector((state) => state.post.createPost?.pending);
  const [previewSource, setPreviewSource] = useState("");
  const handlePost = () => {
    if (!previewSource) {
      const newPost = {
        userId: user?._id,
        title: formik.values.title,
        description: formik.values.desc,
        tags: selectIdx,
      };
      createPost(dispatch, user?.accessToken, newPost, makePostToggle);
    } else if (previewSource) {
      const newPost = {
        userId: user?._id,
        title: formik.values.title,
        description: formik.values.desc,
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
      <label className="Title"> Title </label>
      <textarea
        required
        id="title"
        name="title"
        type="text"
        className="makepost-title"
        placeholder="Enter title"
        onChange={formik.handleChange}
        value={formik.values.title}
      />
      {formik.errors.title && <p className="errorMsg">{formik.errors.title}</p>}
      <label className="Desc"> Descriptions </label>
      <textarea
        required
        id="desc"
        name="desc"
        type="text"
        className="makepost-desc"
        placeholder="Enter descriptions"
        onChange={formik.handleChange}
        value={formik.values.desc}
      />
      {formik.errors.desc && <p className="errorMsg">{formik.errors.desc}</p>}

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
                  ? `makepost-tags-selected-${tag}`
                  : `makepost-tags-${tag}`
              }`}
              onClick={() => setSelectIdx(idx)}
            >
              {tag}
            </button>
          );
        })}
      </div>
      <div className="makepost-save-bottom">
        {loading ? (
            <Loading
              loadingType="ClipLoader"
              color="white"
              size="32px"
              loading={loading}
            />
        ) : (
          <p className="submit" onClick={handlePost}>
            POST
          </p>
        )}
      </div>
    </section>
  );
};

export default MakePost;
