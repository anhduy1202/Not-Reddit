import { useEffect } from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { sideBarToggle } from "../../../redux/navigateSlice";
import InputField from "../../InputFields/Input";
import "../feed.css";
const FeedHeader = () => {
  const user = useSelector((state) => state.user.user?.currentUser);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [result, setResulsts] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const setOpen = () => {
    dispatch(sideBarToggle(true));
  };
  const goToProfile = (id) => {
    navigate("/user/"+id);
  }
  const searchUsername = async () => {
    await axios
      .get(`/v1/users?username=${search}`, {
        headers: { token: `Bearer ${user.accessToken}` },
      })
      .then((res) => {
        if (search === "") {
          setResulsts([]);
        } else {
          setResulsts(res.data);
        }
      });
  };
  useEffect(() => {
    if (search === "") {
      setOpenSearch(false);
    } else {
      setOpenSearch(true);
    }
    searchUsername();
  }, [search]);
  return (
    <header className="feed-logo">
      <img
        onClick={() => setOpen(true)}
        className="feed-logo-img"
        src={user?.profilePicture}
        alt=""
      />
      <div className="search-container">
        <InputField
          classStyle="search-bar"
          placeholder="🔎 Search for username"
          data={search}
          setData={setSearch}
        />
        {openSearch && (
          <div className="feed-username-display">
            {result?.map((username) => {
              return (
                <div className="user-container" onClick={()=>goToProfile(username._id)}>
                  <img
                    style={{ backgroundColor: `${username.theme}` }}
                    src={username.profilePicture}
                    alt="profile pic"
                    className="username-profile"
                  />
                  <div className="username"> u/{username.username}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

export default FeedHeader;
