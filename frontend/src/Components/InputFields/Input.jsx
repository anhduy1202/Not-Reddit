import "../Edit/edit.css";
import "../Posts/post.css";
const InputField = (props) => {
  const { inputType, data, setData, label, classStyle } = props;
  return (
    <>
      <label> {label} </label>
      {inputType === "textarea" ? (
        <textarea
          type="text"
          className={classStyle}
          placeholder={data}
          onChange={(e) => setData(e.target.value)}
        />
      ) : (
        <input
          type="text"
          placeholder={data}
          onChange={(e) => setData(e.target.value)}
        />
      )}
    </>
  );
};

export default InputField;
