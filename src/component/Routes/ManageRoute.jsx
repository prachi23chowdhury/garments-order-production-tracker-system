import useAuth from "../../hooks/UseAuth";


export default function ManagerRoute({ children }) {
  const { user, loading } = useAuth();
  console.log(user);

  if (loading) return <p>Loading...</p>;

  if (user?.role !== "manager") {
    return <p>Access Denied</p>;
  }

  return children;
}
