import React, { useState, useEffect } from "react";

const Streak = () => {
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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-blue-600">Streak</h1>
        <p className="mt-4 text-lg font-semibold">
          🔥 Current Streak:{" "}
          <span className="text-green-500">{streak} days</span>
        </p>
      </div>
    </div>
  );
};

export default Streak;
