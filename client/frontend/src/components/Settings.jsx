import React, { useState, useEffect } from "react";
import axios from "axios";

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [reminderTime, setReminderTime] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/view/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data.user);
      } catch (err) {
        setError("Failed to fetch user details");
      }
    };
    fetchUser();
  }, [userId, token]);

  // Handle Theme Change
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  // Update Reminder
  const handleReminderUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:5000/api/user/update-reminder",
        { reminderTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Reminder updated!");
    } catch (err) {
      setError("Failed to update reminder");
    }
  };

  // Delete Account
  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete(`http://localhost:5000/api/user/delete/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.clear();
        alert("Account deleted.");
        window.location.href = "/signup";
      } catch (err) {
        setError("Failed to delete account");
      }
    }
  };

  // Logout User
  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully.");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center dark:text-white">
          Settings
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Theme Toggle */}
        <div className="mt-4">
          <label className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
            <button
              onClick={toggleTheme}
              className="bg-gray-200 dark:bg-gray-600 px-4 py-2 rounded-md"
            >
              {theme === "light" ? "Enable" : "Disable"}
            </button>
          </label>
        </div>

        {/* Update Reminder */}
        <form onSubmit={handleReminderUpdate} className="mt-4">
          <label className="block text-gray-700 dark:text-gray-300">
            Update Reminder
          </label>
          <input
            type="time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="mt-2 w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
          >
            Update Reminder
          </button>
        </form>

        {/* Delete Account */}
        <button
          onClick={handleDeleteAccount}
          className="mt-4 w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
        >
          Delete Account
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-2 w-full bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
