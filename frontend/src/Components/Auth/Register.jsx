import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequests";
import InputField from "../InputFields/Input";
import "./register.css";

const Register = () => {
  const [email, setEmail] = useState("email");
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = (e)=>{
    e.preventDefault();
    const newUser = {
      email: email,
      username: username,
      password: password
    }
    registerUser(newUser,dispatch,navigate);
  }
  return (
    <section className="register-container">
      <div className="register-title"> Sign Up </div>
      <div className="register-input">
        <form onSubmit={handleRegister}>
          <InputField
            data={email}
            type="text"
            placeholder="Enter email"
            setData={setEmail}
            label="EMAIL"
            classStyle="register-email"
          />
          <InputField
            data={username}
            type="text"
            placeholder="Enter username"
            setData={setUsername}
            label="USERNAME"
            classStyle="register-username"
          />
          <InputField
            data={password}
            type="password"
            placeholder="Enter password"
            setData={setPassword}
            label="PASSWORD"
            classStyle="register-password"
          />
          <button type="submit"> Create account </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
