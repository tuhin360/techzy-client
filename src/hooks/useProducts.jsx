import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useProducts = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: products = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  return { products, loading, error, refetch };
};

export default useProducts;


