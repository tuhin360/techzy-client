import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "https://techzy-server.vercel.app"
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
