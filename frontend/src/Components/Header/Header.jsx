import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { baseURL } from "../../utils/listContainer";
import { AiOutlineMessage } from "react-icons/ai";
import { followUser, getUser } from "../../redux/apiRequests";
import "./header.css";
import { setRoom } from "../../redux/navigateSlice";
const Header = (props) => {
  const user = useSelector((state) => state.user.user?.currentUser);
  const currentUser = useSelector((state) => state.user.otherUser?.otherUser);
  const { id } = useParams();
  const [isFollowed, setFollowed] = useState(user?.followings.includes(id));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setEdit, isEdit } = props;
  const handleEdit = () => {
    setEdit(!isEdit);
  };
  useEffect(() => {
    console.log(isFollowed);
    getUser(dispatch, id, user?.accessToken);
  }, []);
  const handleFollow = () => {
    const userId = {
      userId: user?._id,
    };
    followUser(
      dispatch,
      id,
      userId,
      user?.accessToken,
      setFollowed,
      isFollowed
    );
  };

  const goToChat = async () => {
    try {
      const res = await axios.get(`${baseURL}/conversation/find/${id}/${user?._id}`, {
        headers: { token: `Bearer ${user?.accessToken}` },
      });
      if (res.data) {
        dispatch(setRoom(res.data));
        navigate(`/chat/${res.data._id}`);
      } else {
        const newConvo = {
          senderId: user?._id,
          receiverId: id,
        };
        await axios
          .post(`${baseURL}/conversation`, newConvo, {
            headers: { token: `Bearer ${user?.accessToken}` },
          })
          .then((res) => {
            dispatch(setRoom(res.data));
            navigate(`/chat/${res.data._id}`);
          });
      }
    } catch (err) {
      console.log(err);
    }
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
          <div className="edit-goback">
            <p className="go-back">
              <IoIosArrowRoundBack
                size={"52px"}
                onClick={() => navigate("/")}
              />
            </p>
            {user?._id === id ? (
              <div className="info-edit" onClick={handleEdit}>
                Edit
              </div>
            ) : (
              <div className="chat-follow-container">
                <AiOutlineMessage
                  size={"36px"}
                  className="chat"
                  onClick={goToChat}
                />
                <button className="follow" onClick={handleFollow}>
                  {`${isFollowed ? "👌 Following" : "Follow"}`}
                </button>
              </div>
            )}
          </div>
          <img className="info-ava" src={currentUser?.profilePicture} alt="" />
          <div className="info-displayname">
            {`${currentUser?.displayName}`}
            <span className="info-username"> (u/{currentUser?.username})</span>
          </div>
          <div className="info-age"> {currentUser?.age} years old </div>
          <div className="info-about"> {currentUser?.about} </div>
        </div>
      </header>
    </>
  );
};

export default Header;
