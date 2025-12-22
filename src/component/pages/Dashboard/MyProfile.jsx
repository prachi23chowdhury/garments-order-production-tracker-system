import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/UseAuth";

const MyProfile = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchUser = async () => {
      try {
        const res = await axiosSecure.get(
          `/users/email/${encodeURIComponent(user.email)}`
        );
        setDbUser(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user, axiosSecure]);

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!dbUser) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg text-red-500">User data not found.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-8 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={dbUser.photoURL || user?.photoURL || "https://i.ibb.co/2d0QKQv/user.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-primary object-cover"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">My Profile</h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Name</span>
            <span>{dbUser.name || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Email</span>
            <span>{dbUser.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Role</span>
            <span className="capitalize">{dbUser.role || "user"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Feedback</span>
            <span>{dbUser.feedback || "No feedback"}</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
