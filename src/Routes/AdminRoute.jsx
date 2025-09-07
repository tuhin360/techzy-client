import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  console.log(isAdmin);
  const location = useLocation();

  // Show loading state
  if (loading || isAdminLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-10 h-screen ">
        <div className="w-20 h-20 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
