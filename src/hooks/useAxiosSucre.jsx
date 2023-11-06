import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const url = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

const useAxiosSucre = () => {
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
            toast.error(error.message);
            console.log(error);
          }
        }
      );
    }
    return () => (mount = false);
  }, []);
  return url;
};

export default useAxiosSucre;
