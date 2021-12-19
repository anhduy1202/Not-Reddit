import { useEffect } from "react";
import "./popups.css";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../../redux/apiRequests";

const Popup = (props) => {
  const { setDelete, isDelete, h1, h2, button2 } = props;
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const handleDelete = () => {
    deletePost(dispatch, user?.accessToken, isDelete.id, user?._id, setDelete);
  };
  const closePopup = () => {
    setDelete({
      status: false,
      open: false,
    });
  };

  return (
    <section className="popups-overlay">
      <div className="popups-container">
        <div className="popups-close" onClick={closePopup}>
          X
        </div>
        <div className="popups-h1">{h1}</div>
        <div className="popups-h2">{h2}</div>
        <button className="delete" onClick={handleDelete}>
          {" "}
          {button2}{" "}
        </button>
      </div>
    </section>
  );
};

export default Popup;
