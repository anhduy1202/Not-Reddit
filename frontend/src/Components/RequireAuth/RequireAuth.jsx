import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const auth = useSelector((state) => state.auth.login?.currentUser);
  return auth === null ? (
    <Navigate to="/landingpage"/>
  ) : (
    children
  );
};

export default RequireAuth;
