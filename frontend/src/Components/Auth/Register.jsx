import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequests";
import InputField from "../InputFields/Input";
import "./register.css";

const Register = () => {
  const [email, setEmail] = useState("email");
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      username: username,
      password: password,
    };
    registerUser(newUser, dispatch, navigate);
  };
  return (
    <section className="register-container">
      <div className="register-title"> Sign Up </div>
      <div className="register-input">
        <form onSubmit={handleRegister}>
          <InputField
            errorMsg="Email should be valid"
            data={email}
            type="email"
            placeholder="Enter email"
            setData={setEmail}
            label="EMAIL"
            classStyle="register-email"
          />
          <InputField
            errorMsg="Username should be 6-20 characters"
            data={username}
            type="text"
            placeholder="Enter username"
            setData={setUsername}
            label="USERNAME"
            classStyle="register-username"
          />
          <InputField
            errorMsg="Password should have minimum 6 characters"
            data={password}
            type="password"
            placeholder="Enter password"
            setData={setPassword}
            label="PASSWORD"
            classStyle="register-password"
          />
          <button type="submit"> Create account </button>
        </form>
        <div className="register-login"> Already have an account? </div>
        <Link className="register-login-link" to="/login">
          Log in
        </Link>
      </div>
    </section>
  );
};

export default Register;
