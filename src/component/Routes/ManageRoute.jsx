import { Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function ManagerRoute({ children }) {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: dbUser, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`); // backend route for role
      return res.data;
    },
  });

  // 🔹 Wait for both auth & query to finish
  if (loading || isLoading) return <p>Loading...</p>;

  // 🔹 Only check backend role
  if (!dbUser || dbUser.role?.toLowerCase() !== "manager") {
    return <Navigate to="/forbidden" />;
  }

  return children;
}
