import { useState } from "react";
import { useSelector } from "react-redux";
import "./header.css";
const Header = (props) => {
  const user  = useSelector((state)=>state.auth.login?.currentUser);
  const { setEdit, isEdit } = props;
  const handleEdit = () => {
    setEdit(!isEdit);
  };
  return (
    <>
      <header
        style={{
          backgroundColor: `${user?.theme}`,
          backgroundImage: `linear-gradient(180deg,${user?.theme} 2%,${user?.theme}, 65%,#181818 100%)`,
        }}
      >
        <div className="info-container">
          <div className="info-edit" onClick={handleEdit}>
            Edit
          </div>
          <img className="info-ava" src={user?.profilePicture} alt="" srcset="" />
          <div className="info-username"> {user?.displayName} </div>
          <div className="info-age"> {user?.age} years old </div>
          <div className="info-about"> {user?.about} </div>
        </div>
      </header>
    </>
  );
};

export default Header;
