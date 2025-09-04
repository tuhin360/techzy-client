import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  // request interceptor to add authorization header for every secure call to the api
  axiosSecure.interceptors.request.use((config) => {
    const token = localStorage.getItem("access-token");
    console.log("request stopped by interceptor", token);
    config.headers.authorization = `Bearer ${token}`;
    return config;
  });

  // response interceptor to handle error responses from the api
  axiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log("response stopped by interceptor", error.response.status);
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem("access-token");
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );


  return axiosSecure;
};

export default useAxiosSecure;
