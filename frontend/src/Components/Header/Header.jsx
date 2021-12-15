import { useState } from "react";
import { useSelector } from "react-redux";
import "./header.css";
const Header = (props) => {
  const currentUser = useSelector((state)=>state.user.user?.currentUser);
  const { setEdit, isEdit } = props;
  const handleEdit = () => {
    setEdit(!isEdit);
  };
  return (
    <>
      <header
        style={{
          backgroundColor: `${currentUser?.theme}`,
          backgroundImage: `linear-gradient(180deg,${currentUser?.theme} 2%,${currentUser?.theme}, 65%,#181818 100%)`,
        }}
      >
        <div className="info-container">
          <div className="info-edit" onClick={handleEdit}>
            Edit
          </div>
          <img className="info-ava" src={currentUser?.profilePicture} alt="" srcset="" />
          <div className="info-username"> {currentUser?.displayName} </div>
          <div className="info-age"> {currentUser?.age} years old </div>
          <div className="info-about"> {currentUser?.about} </div>
        </div>
      </header>
    </>
  );
};

export default Header;
