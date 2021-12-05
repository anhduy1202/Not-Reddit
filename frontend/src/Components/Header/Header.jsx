import { useState } from "react";
import { useSelector } from "react-redux";
import "./header.css";
const Header = (props) => {
  const name = useSelector((state) => state.user.name);
  const age = useSelector((state) => state.user.age);
  const about = useSelector((state) => state.user.about);
  const avaUrl = useSelector((state) => state.user.avaUrl);
  const themeColor = useSelector((state) => state.theme.theme);
  const { setEdit, isEdit } = props;
  const handleEdit = () => {
    setEdit(!isEdit);
  };
  return (
    <>
      <header
        style={{
          backgroundColor: `${themeColor}`,
          backgroundImage: `linear-gradient(180deg,${themeColor} 2%,${themeColor}, 65%,#181818 100%)`,
        }}
      >
        <div className="info-container">
          <div className="info-edit" onClick={handleEdit}>
            Edit
          </div>
          <img className="info-ava" src={avaUrl} alt="" srcset="" />
          <div className="info-username"> {name} </div>
          <div className="info-age"> {age} years old </div>
          <div className="info-about"> {about} </div>
        </div>
      </header>
    </>
  );
};

export default Header;
