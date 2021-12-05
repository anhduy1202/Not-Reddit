import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/postSlice";
import InputField from "../InputFields/Input";
import "./post.css";
const MakePost = (props) => {
  const { setOpen } = props;
  const dispatch = useDispatch();
  const [title, setTitle] = useState("Add a title");
  const [desc, setDesc] = useState("Add some descriptions");
  const [selectIdx, setSelectIdx] = useState(0);
  const tags = ["None", "NSFW", "Mood", "Quotes", "Shitpost"];
  const handlePost = () => {
    setOpen(false);
    const newPost = {
      title: title,
      description: desc,
      tag: selectIdx,
    };
    dispatch(createPost(newPost));
  };
  return (
    <section className="makepost-container">
      <div className="makepost-navigation">
        <p className="makepost-save" onClick={handlePost}>
          Post
        </p>
      </div>
      <InputField
        data={title}
        inputType="textarea"
        setData={setTitle}
        label="Title"
        classStyle="makepost-title"
      />
      <InputField
        data={desc}
        inputType="textarea"
        setData={setDesc}
        label="Descriptions"
        classStyle="makepost-desc"
      />
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
              {" "}
              {tag}{" "}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default MakePost;
