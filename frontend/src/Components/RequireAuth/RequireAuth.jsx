import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const auth = useSelector((state) => state.auth.login?.currentUser);
  const location = useLocation();
  return auth === null ? (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  ) : (
    children
  );
};

export default RequireAuth;
