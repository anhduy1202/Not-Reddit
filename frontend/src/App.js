import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./Components/UserProfile/UserProfile";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Feed from "./Components/Feed/Feed";

function App() {
  const [isEdit, setEdit] = useState(false);
  const [isOpenPost, setOpen] = useState(false);
  const [isOpenSide,setOpenSide] = useState(false);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Feed setOpenSide={setOpenSide} isOpenSide={isOpenSide}/>} />
          <Route
            path="/user/:id"
            element={
              <UserProfile
                isEdit={isEdit}
                setEdit={setEdit}
                isOpenPost={isOpenPost}
                setOpen={setOpen}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
