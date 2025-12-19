import React from "react";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/UseAuth";


const MyProfile = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login"); // Redirect to login after logout
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">My Profile</h1>

      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <img
          src={user?.photoURL || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
        />
      </div>

      <div className="space-y-2 text-center">
        <p><strong>Name:</strong> {user?.displayName || "N/A"}</p>
        <p><strong>Email:</strong> {user?.email || "N/A"}</p>
        
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default MyProfile;
