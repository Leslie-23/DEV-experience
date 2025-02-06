import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:5000/api/user/view/${userId}`
        );
        setUser(response.data.user);
      } catch (err) {
        setError("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/";
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold uppercase">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-gray-700 font-semibold">Phone</h3>
          <p className="text-gray-600">{user.phone}</p>
        </div>

        <div className="mt-4">
          <h3 className="text-gray-700 font-semibold">Languages</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {user.languages.map((lang, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition">
            Edit Profile
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
