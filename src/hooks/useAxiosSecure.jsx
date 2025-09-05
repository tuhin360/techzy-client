import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // request interceptor to add authorization header for every secure call to the api
  axiosSecure.interceptors.request.use((config) => {
    const token = localStorage.getItem("access-token");
    // console.log("request stopped by interceptor", token);
    config.headers.authorization = `Bearer ${token}`;
    return config;
  });

  // response interceptor to handle error responses from the api
  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      // console.log("status error in the interceptor", error.response.status);
      if (error.response.status === 401 || error.response.status === 403) {
        await logout();
        localStorage.removeItem("access-token");
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
