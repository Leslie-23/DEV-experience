import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Home,
  Clock,
  ClipboardList,
  FileText,
  Folder,
  User,
  Settings,
  Languages,
  Bell,
  Flame,
} from "lucide-react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userLanguages, setUserLanguages] = useState([]);
  const hasFetched = useRef(false);
  const [streak, setStreak] = useState(0);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5000/api/submission/streak/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.streakCount !== undefined) setStreak(data.streakCount);
      })
      .catch((err) => console.error("Error fetching streak:", err));
  }, [userId]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Function to fetch selected languages
  const fetchUserLanguages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/get-languages",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ); // Update with actual API route
      // console.log(response);
      const data = response;
      setUserLanguages(data.data.languages || []);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };
  useEffect(() => {
    if (!hasFetched.current) {
      fetchUserLanguages();
      hasFetched.current = true; // Mark as executed
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={closeSidebar}
      ></div>
      <div
        className={`fixed top-0 left-0 z-50 h-full bg-white w-64 transition-transform transform md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold text-green-500">Dashboard</h2>
          <button onClick={closeSidebar} className="text-gray-600 md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="mt-8">
          <ul>
            <li>
              <a
                href="/"
                className="flex items-center gap-3 py-2 px-4 text-gray-800 hover:bg-green-500 hover:text-white transition duration-200"
              >
                {" "}
                <Home
                  size={18}
                  className="text-green-600 group-hover:text-white transition duration-200"
                />
                Home
              </a>
            </li>
            <li>
              <a
                href="/set-reminder"
                className="flex items-center gap-3 py-2 px-4 text-gray-800 hover:bg-green-500 hover:text-white transition duration-200"
              >
                {" "}
                <Clock
                  size={18}
                  className="text-green-600 group-hover:text-white transition duration-200"
                />
                Set Daily Timer
              </a>
            </li>
            <li>
              <a
                href="/submissions1"
                className="flex items-center gap-3 py-2 px-4 text-gray-800 hover:bg-green-500 hover:text-white transition duration-200"
              >
                {" "}
                <ClipboardList
                  size={18}
                  className="text-green-600 group-hover:text-white transition duration-200"
                />
                Submissions
              </a>
            </li>
            <li>
              <a
                href="/submissions"
                className="flex items-center gap-3 py-2 px-4 text-gray-800 hover:bg-green-500 hover:text-white transition duration-200"
              >
                {" "}
                <FileText
                  size={18}
                  className="text-green-600 group-hover:text-white transition duration-200"
                />
                Code Review
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 py-2 px-4 text-gray-800 hover:bg-green-500 hover:text-white transition duration-200"
              >
                {" "}
                <Folder
                  size={18}
                  className="text-green-600 group-hover:text-white transition duration-200"
                />
                Projects
              </a>
            </li>
            <li>
              <a
                href="/profile"
                className="flex items-center gap-3 py-2 px-4 text-gray-800 hover:bg-green-500 hover:text-white transition duration-200"
              >
                <User
                  size={18}
                  className="text-green-600 group-hover:text-white transition duration-200"
                />
                Profile
              </a>
            </li>
            <li>
              <a
                href="/languages"
                className="flex items-center gap-3 py-2 px-4 text-gray-800 hover:bg-green-500 hover:text-white transition duration-200"
              >
                {" "}
                <Languages
                  size={18}
                  className="text-green-600 group-hover:text-white transition duration-200"
                />
                Languages
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="flex items-center gap-3 py-2 px-4 text-gray-800 hover:bg-green-500 hover:text-white transition duration-200"
              >
                <Settings
                  size={18}
                  className="text-green-600 group-hover:text-white transition duration-200"
                />
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64 transition-all duration-300">
        {/* Navbar */}
        <header className="bg-green-500 text-white p-4 fixed w-full top-0 left-0 z-10 shadow-md">
          <div className="flex items-center justify-between">
            <button onClick={toggleSidebar} className="md:hidden text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-3xl font-extrabold text-green-500">DX</h1>
            <div className="flex items-center  space-x-4">
              <button className="text-white">
                {" "}
                <a href="/profile">
                  <Bell
                    size={18}
                    className="text-white group-hover:text-gray-900 transition duration-200"
                  />
                </a>
              </button>
              <button className="text-white">
                <a href="/profile">
                  <User
                    size={18}
                    className="text-white group-hover:text-gray-700 transition duration-200"
                  />
                </a>
              </button>
              <button className=" flex justify-center gap-2 text-white ">
                {" "}
                <a
                  href="/streak"
                  className="flex justify-center gap-2 text-white"
                >
                  <Flame size={18} className="text-white gap-0 p-0 m-0" />{" "}
                  <span className="text-white font-bold">{streak} days</span>
                </a>
              </button>
            </div>
          </div>
        </header>

        {/* Main Dashboard Section */}
        <main className="flex-grow p-6 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Set Daily Timer Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
              <h3 className="text-xl font-semibold text-gray-800">
                Set Daily Timer
              </h3>
              <p className="text-gray-600 mt-2">
                Stay productive by managing your daily coding tasks and setting
                a timer to track your progress.
              </p>
              <button className="mt-4 text-indigo-600 hover:text-indigo-700">
                <a href="/set-reminder">Configure Timer</a>
              </button>
            </div>

            {/* Profile Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
              <h3 className="text-xl font-semibold text-gray-800">Profile</h3>
              <p className="text-gray-600 mt-2">
                View and manage your personal details and preferences.
              </p>
              <button className="mt-4 text-indigo-600 hover:text-indigo-700">
                <a href="/profile">View Profile</a>
              </button>
            </div>

            {/* Projects Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
              <h3 className="text-xl font-semibold text-gray-800">Projects</h3>
              <p className="text-gray-600 mt-2">
                Manage your coding projects, track progress, and collaborate.
              </p>
              <button className="mt-4 text-indigo-600 hover:text-indigo-700">
                View Projects
              </button>
            </div>

            {/* Settings Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
              <h3 className="text-xl font-semibold text-gray-800">Settings</h3>
              <p className="text-gray-600 mt-2">
                Configure your dashboard settings, theme, and notifications.
              </p>
              <button className="mt-4 text-indigo-600 hover:text-indigo-700">
                <a href="/settings">Go to Settings</a>
              </button>
            </div>

            {/* Languages Card */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
              <h3 className="text-xl font-semibold text-gray-800">
                Your Preferred Languages
              </h3>

              {userLanguages.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-4">
                  {userLanguages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-white text-sm font-semibold"
                      style={{
                        backgroundColor: `hsl(${
                          Math.random() * 360
                        }, 70%, 50%)`,
                      }}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-gray-600">
                  You haven't selected any languages yet.
                  <a
                    href="/languages"
                    className="text-indigo-600 hover:underline"
                  >
                    {" "}
                    Choose your languages here.
                  </a>
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
