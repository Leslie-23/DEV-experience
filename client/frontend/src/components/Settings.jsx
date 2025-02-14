import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Moon,
  Bell,
  Clock,
  Trash2,
  LogOut,
  ShieldCheck,
  User,
} from "lucide-react";

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
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-500 to-green-700 dark:bg-gray-900 px-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-green-600 text-center">
          Settings
        </h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        {/* Theme Toggle */}
        <div className="flex items-center justify-between mt-6 border-b pb-4">
          <div className="flex items-center gap-3">
            <Moon className="text-green-500" size={20} />
            <span className="text-black ">Dark Mode</span>
          </div>
          <button
            onClick={toggleTheme}
            className="bg-green-500 px-4 py-2 rounded-md"
          >
            {theme === "light" ? "Enable" : "Disable"}
          </button>
        </div>

        {/* Account & Security */}
        <div className="flex items-center justify-between mt-4 border-b pb-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-green-500" size={20} />
            <span className="text-black ">Account & Security</span>
          </div>
          <button className="text-green-600 hover:underline">Manage</button>
        </div>

        {/* Notification Settings */}
        <div className="flex items-center justify-between mt-4 border-b pb-4">
          <div className="flex items-center gap-3">
            <Bell className="text-green-500" size={20} />
            <span className="text-black">Notifications</span>
          </div>
          <button className="text-green-600 hover:underline">Edit</button>
        </div>

        {/* Update Reminder */}
        <form onSubmit={handleReminderUpdate} className="mt-4 border-b pb-4">
          <label className="flex items-center gap-3 text-black ">
            <Clock className="text-green-500" size={20} />
            Set Reminder Time
          </label>
          <input
            type="time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md "
          />
          <button
            type="submit"
            className="mt-2 w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Update Reminder
          </button>
        </form>

        {/* Delete Account */}
        <div className="mt-4">
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-600 text-white p-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-700"
          >
            <Trash2 size={18} />
            Delete Account
          </button>
        </div>

        {/* Logout */}
        <div className="mt-2">
          <button
            onClick={handleLogout}
            className="w-full bg-gray-600 text-white p-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-700"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
