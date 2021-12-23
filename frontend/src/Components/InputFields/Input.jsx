import "../Edit/edit.css";
import "../Posts/post.css";
const InputField = (props) => {
  const { placeholder, inputType, type, data, setData, label, classStyle } =
    props;
  return (
    <>
      <label> {label} </label>
      {inputType === "textarea" ? (
        <textarea
          type="text"
          value={data}
          className={classStyle}
          placeholder={data}
          onChange={(e) => setData(e.target.value)}
        />
      ) : (
        <input
          value={data}
          type={type}
          className={classStyle}
          placeholder={placeholder}
          onChange={(e) => setData(e.target.value)}
        />
      )}
    </>
  );
};

export default InputField;
