import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequests";
import * as Yup from "yup";
import "./register.css";
import { useFormik } from "formik";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.register.message);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, "Maximum 20 characters")
        .min(6, "Minimum 6 characters")
        .required("Required"),
      email: Yup.string()
        .max(50, "Maximum 50 character")
        .required("Required")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter valid email address"
        ),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{6,19}$/,
          "Minimum 6 characters, at least one letter and one number"
        ),
    }),
    onSubmit: (values) => {
      const newUser = {
        email: values.email,
        username: values.username,
        password: values.password,
      };
      registerUser(newUser, dispatch, navigate);
    },
  });

  return (
    <section className="register-container">
      <div className="register-title"> Sign Up </div>
      <div className="register-input">
        <form onSubmit={formik.handleSubmit}>
          <label className="email-label"> EMAIL </label>
          <input
            required
            id="email"
            name="email"
            type="text"
            className="register-email"
            placeholder="Enter email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <label className="username-label"> USERNAME </label>
          <input
            id="username"
            name="username"
            value={formik.values.username}
            type="text"
            placeholder="Enter username"
            onChange={formik.handleChange}
            className="register-username"
          />
          {formik.errors.username && (
            <p className="errorMsg">{formik.errors.username}</p>
          )}
          <label className="password-label"> PASSWORD </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            placeholder="Enter password"
            onChange={formik.handleChange}
            className="register-password"
          />
          {formik.errors.password && (
            <p className="errorMsg">{formik.errors.password}</p>
          )}
          {error && <p className="register-err"> {error.substr(50).replace("to be unique","already existed")} </p>}
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
