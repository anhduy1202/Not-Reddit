import { useDispatch, useSelector } from "react-redux";
import { makePostToggle } from "../../redux/navigateSlice";
import "./footer.css";
const Footer = () => {
  const isOpenPost = useSelector((state) => state.nav.makepost.open);
  const dispatch = useDispatch();
  const handleOpenPost = () => {
    dispatch(makePostToggle(!isOpenPost));
  };
  return (
    <footer className="footer">
      <div className="footer-title" onClick={handleOpenPost}>
        {isOpenPost ? "x" : "+"}
      </div>
    </footer>
  );
};

export default Footer;
