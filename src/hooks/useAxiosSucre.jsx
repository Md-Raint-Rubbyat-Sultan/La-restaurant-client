import axios from "axios";
import { useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";

const url = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

const useAxiosSucre = () => {
  const { logoutUser } = useContext(AuthContext);

  useEffect(() => {
    let mount = true;
    if (mount) {
      axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          if (
            error?.response?.status === 401 ||
            error?.response?.status === 403
          ) {
            logoutUser()
              .then(() => {
                if (error?.response?.status === 401) {
                  return toast.error("Access denied, please login.");
                }
                if (error?.response?.status === 403) {
                  return toast.error("Forbidden Access.");
                }
              })
              .catch((er) => toast.error(er.message));
            // console.log(error);
          }
        }
      );
    }
    return () => (mount = false);
  }, [logoutUser]);
  return url;
};

export default useAxiosSucre;
