// add a redirect after the language has been set.

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const availableLanguages = [
  "JavaScript",
  "Python",
  "Java",
  "C#",
  "C++",
  "Ruby",
  "Go",
  "Swift",
  "PHP",
];

export default function SetLanguages({ userId, initialLanguages = [] }) {
  const [selectedLanguages, setSelectedLanguages] = useState(initialLanguages);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user's preferred languages from API
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/get-languages`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) setSelectedLanguages(data.preferredLanguages);
      } catch (error) {
        toast.error("Failed to fetch languages");
      }
    };
    fetchLanguages();
  }, []);

  const handleSelect = (e) => {
    const value = e.target.value;
    if (!selectedLanguages.includes(value)) {
      setSelectedLanguages([...selectedLanguages, value]);
    }
  };

  const handleRemove = (lang) => {
    setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // console.log("Token being sent:", token); // Debugging log

      const response = await axios.put(
        "http://localhost:5000/api/user/set-languages",
        { languages: selectedLanguages }, // Pass data here
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response.data); // Debugging log

      toast.success("Languages updated successfully!");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Error updating languages");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Preferred Languages
      </h2>

      <div className="flex gap-3">
        <select
          className="p-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-400"
          onChange={handleSelect}
        >
          <option value="" disabled selected>
            Select Language
          </option>
          {availableLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="mt-4">
        {selectedLanguages.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedLanguages.map((lang) => (
              <span
                key={lang}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {lang}
                <button
                  onClick={() => handleRemove(lang)}
                  className="text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-2">No languages selected</p>
        )}
      </div>
    </div>
  );
}
