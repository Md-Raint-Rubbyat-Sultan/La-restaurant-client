import axios from "axios";
import { useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";

const url = axios.create({
  baseURL: "https://la-server.vercel.app/api/v1/",
  withCredentials: true,
});

const useAxiosSucre = () => {
  const { logoutUser } = useContext(AuthContext);

  useEffect(() => {
    let mount = true;
    if (mount) {
      url.interceptors.response.use(
        (response) => {
          // console.log("form res of itercept");
          return response;
        },
        (error) => {
          if (
            error?.response?.status === 401 ||
            error?.response?.status === 403
          ) {
            // console.log("error from axios");
            logoutUser()
              .then(() => {
                console.log("error from logout");
                url
                  .post("/logout", {})
                  .then(() => {
                    if (error?.response?.status === 401) {
                      return toast.error("Access denied, please login.");
                    }
                    if (error?.response?.status === 403) {
                      return toast.error("Forbidden Access.");
                    }
                  })
                  .catch((er) => toast.error(er.message));
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
