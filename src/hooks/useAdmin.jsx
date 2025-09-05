import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !!user?.email, // only run if user email exists
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      return res.data?.admin; // use correct property name
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
