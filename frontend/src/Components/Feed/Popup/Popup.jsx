import "./popups.css";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../../redux/apiRequests";
import { setDelete } from "../../../redux/navigateSlice";
import Overlay from "../../Overlay/Overlay";

const Popup = (props) => {
  const { h1, h2, button2 } = props;
  const user = useSelector((state) => state.user.user?.currentUser);
  const dispatch = useDispatch();
  const isDelete = useSelector((state) => state.nav.deleteState);

  const handleDelete = () => {
    dispatch(
      setDelete({
        status: false,
        open: false,
      })
    );
    deletePost(dispatch, user?.accessToken, isDelete.id, user?._id, setDelete);
  };
  const closePopup = () => {
    dispatch(
      setDelete({
        status: false,
        open: false,
      })
    );
  };

  return (
    <Overlay>
      <div className="popups-close" onClick={closePopup}>
        X
      </div>
      <div className="popups-h1">{h1}</div>
      <div className="popups-h2">{h2}</div>
      <button className="delete" onClick={handleDelete}>
        {" "}
        {button2}{" "}
      </button>
    </Overlay>
  );
};

export default Popup;
