import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequests";
import InputField from "../InputFields/Input";
import Loading from "../Loading/Loading";
import "./login.css";

const Login = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const error = useSelector((state) => state.auth.login?.message);
  const loading = useSelector((state) => state.auth.login?.isFetching);
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <section className="login-container">
      <div className="login-title"> Log in </div>
      <div className="login-input">
        <form onSubmit={handleLogin}>
          <InputField
            data={username}
            type="text"
            placeholder="Enter username"
            setData={setUsername}
            label="USERNAME"
            classStyle="login-username"
          />
          <InputField
            data={password}
            type="password"
            placeholder="Enter password"
            setData={setPassword}
            label="PASSWORD"
            classStyle="login-password"
          />
          {loading ? (
            <button type="submit">
              <Loading
                loadingType="ClipLoader"
                color="white"
                loading={loading}
                size="36px"
              />
            </button>
          ) : (
            <button type="submit"> Continue </button>
          )}
        </form>
        {error && <p className="loginError"> {error} </p>}
        <div className="login-register"> Don't have an account yet? </div>
        <Link className="login-register-link" to="/register">
          Register now
        </Link>
      </div>
    </section>
  );
};

export default Login;
