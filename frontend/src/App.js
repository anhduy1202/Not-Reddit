import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./Components/UserProfile/UserProfile";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import HomePage from "./Components/Feed/HomePage/HomePage";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import News from "./Components/Feed/News/News";
import Footer from "./Components/Footer/Footer";
import Friends from "./Components/Friends/Friends";
import ChatRoom from "./Components/ChatOverview/ChatRoom";
import LeaderBoard from "./Components/LeaderBoard/LeaderBoard";
import LandingPage from "./Components/LandingPage/LandingPage";
import { useEffect } from "react";
import DesktopLanding from "./Components/DesktopLanding/DesktopLanding";

function App() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [isMobile, setMobile] = useState(true);
  const [isEdit, setEdit] = useState(false);
  const [isOpenPost, setOpen] = useState(false);
  useEffect(() => {
    const handleSize = () => {
      setWindowSize({
        width: window.innerWidth,
        heigth: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleSize);
    handleSize();
    return () => window.removeEventListener("resize", handleSize);
  }, []);
  useEffect(() => {
    if (windowSize.width > 500) {
      setMobile(false);
    } else {
      setMobile(true);
    }
  }, [windowSize]);
  return (
    <Router>
      <div className="App">
        <Routes>
          {isMobile ? (
            <>
              <Route path="/landingpage" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <HomePage />
                  </RequireAuth>
                }
              />
              <Route
                path="/news"
                element={
                  <RequireAuth>
                    <News />
                  </RequireAuth>
                }
              />
              <Route
                path="/friends"
                element={
                  <RequireAuth>
                    <Friends />
                  </RequireAuth>
                }
              />
              <Route
                path="/leaderboard"
                element={
                  <RequireAuth>
                    <LeaderBoard />
                  </RequireAuth>
                }
              />
              <Route
                path="/chat/:id"
                element={
                  <RequireAuth>
                    <ChatRoom />
                  </RequireAuth>
                }
              />
              <Route
                path="/user/:id"
                element={
                  <RequireAuth>
                    <UserProfile
                      isEdit={isEdit}
                      setEdit={setEdit}
                      isOpenPost={isOpenPost}
                      setOpen={setOpen}
                    />
                  </RequireAuth>
                }
              />
            </>
          ) : (
            <Route path="/landingpage" element={<DesktopLanding />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
