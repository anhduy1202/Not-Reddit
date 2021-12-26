import "../Edit/edit.css";
import "../Posts/post.css";
const InputField = (props) => {
  const {
    id,
    name,
    value,
    placeholder,
    inputType,
    type,
    data,
    setData,
    label,
    classStyle,
  } = props;
  return (
    <>
      <label> {label} </label>
      {inputType === "textarea" ? (
        <textarea
          type="text"
          value={value}
          className={classStyle}
          placeholder={data}
          onChange={(e) => setData(e.target.value)}
        />
      ) : inputType === "file" ? (
        <input
          value={value}
          id={id}
          name={name}
          type={type}
          className={classStyle}
          placeholder={placeholder}
          onChange={(e) => setData(e.target.value)}
        />
      ) : (
        <input
          value={value}
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
