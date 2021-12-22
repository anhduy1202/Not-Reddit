import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import gpBackIcon from "../../assets/icons/leftarrow.svg";
import { getUser } from "../../redux/apiRequests";
import "./header.css";
const Header = (props) => {
  const user = useSelector((state) => state.user.user?.currentUser);
  const currentUser = useSelector((state) => state.user.otherUser?.otherUser);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setEdit, isEdit } = props;
  const handleEdit = () => {
    setEdit(!isEdit);
  };
  useEffect(() => {
    getUser(dispatch, id, user?.accessToken);
  }, []);
  return (
    <>
      <header
        style={{
          backgroundColor: `${currentUser?.theme}`,
          backgroundImage: `linear-gradient(180deg,${currentUser?.theme} 2%,${currentUser?.theme}, 65%,#181818 100%)`,
        }}
      >
        <div className="info-container">
          <div className="edit-goback">
            <p className="go-back">
              <img
                src={gpBackIcon}
                onClick={() => navigate("/")}
                alt="go back icon"
              />
            </p>
            {user?._id === id && (
              <div className="info-edit" onClick={handleEdit}>
                Edit
              </div>
            )}
          </div>
          <img className="info-ava" src={currentUser?.profilePicture} alt="" />
          <div className="info-displayname"> {`${currentUser?.displayName}`} <span className="info-username"> (u/{currentUser?.username})</span> </div>
          <div className="info-age"> {currentUser?.age} years old </div>
          <div className="info-about"> {currentUser?.about} </div>
        </div>
      </header>
    </>
  );
};

export default Header;
