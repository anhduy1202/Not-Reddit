import "./sidebar.css";
import { useSelector } from "react-redux";
import { useState } from "react";

const SideBar = (props) => {
  const { setOpen } = props;
  const avaUrl = useSelector((state) => state.user.avaUrl);
  const username = useSelector((state) => state.user.username);

  return (
    <>
      {" "}
      <div className="sidebar-close" onClick={() => setOpen(false)}>
        X
      </div>
    </>
  );
};

export default SideBar;
