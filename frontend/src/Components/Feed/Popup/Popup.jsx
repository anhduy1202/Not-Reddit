import { useEffect } from "react";
import "./popups.css";
const Popup = (props) => {
  const { setDelete, isDelete, h1, h2, button1, button2 } = props;
  const deletePost = () => {
    setDelete({
      status: false,
    });
  };
  const closePopup = () => {
    setDelete({
      status: false,
    });
  };
  useEffect(() => {
    console.log(isDelete);
  }, [isDelete]);
  return (
    <section className="popups-overlay">
      <div className="popups-container">
        <div className="popups-close" onClick={closePopup}>
          X
        </div>
        <div className="popups-h1">{h1}</div>
        <div className="popups-h2">{h2}</div>
        <button className="delete" onClick={deletePost}>
          {" "}
          {button2}{" "}
        </button>
      </div>
    </section>
  );
};

export default Popup;
