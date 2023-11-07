import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import PropTypes from "prop-types";
import { AuthContext } from "../providers/AuthProvider";

const PrivetRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) return <Spinner />;

  if (user) return children;

  return <Navigate state={location?.pathname} to={"/login"} replace={true} />;
};

PrivetRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivetRoute;
