import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Check, X } from "lucide-react";
import { HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const availableLanguages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C#",
  "C++",
  "C",
  "Ruby",
  "Go",
  "Swift",
  "Kotlin",
  "PHP",
  "Dart",
  "Rust",
  "Scala",
  "Perl",
  "Haskell",
  // "Lua",
  // "R",
  // "Objective-C",
  // "Shell",
  // "F#",
  // "Elixir",
  // "Clojure",
  // "Erlang",
  // "Julia",
  // "Groovy",
  // "MATLAB",
  // "VB.NET",
  // "Pascal",
  // "Fortran",
];

const smallText = ` Web & Frontend: JavaScript, TypeScript, PHP
 Backend: Python, Java, C#, Ruby, Go, Swift, Kotlin
 Systems & Performance: C, C++, Rust
 Functional: Haskell, Elixir, Clojure, Erlang, Scala
 Data Science & Math: R, MATLAB, Julia
 Mobile: Swift (iOS), Kotlin (Android), Dart (Flutter)
 Legacy & Niche: Objective-C, Pascal, Fortran, Shell, Perl`;
export default function SetLanguages({ userId, initialLanguages = [] }) {
  const [selectedLanguages, setSelectedLanguages] = useState(initialLanguages);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // Fetch user's preferred languages
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/get-languages`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSelectedLanguages(response.data.preferredLanguages || []);
      } catch (error) {
        toast.error("Failed to fetch languages");
      }
    };
    fetchLanguages();
  }, []);

  const handleSelect = (lang) => {
    if (!selectedLanguages.includes(lang)) {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const handleRemove = (lang) => {
    setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/user/set-languages",
        { languages: selectedLanguages },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Languages updated successfully!");

      // Redirect after successful update
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      toast.error("Error updating languages");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-500 to-green-700 px-2">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-green-600 text-center">
          Select Your Preferred Languages
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full transition"
          >
            <HelpCircle size={12} />
          </button>
        </h2>
        {showInfo && (
          <div className="bg-gray-100 text-gray-700 p-4 mt-4 rounded-lg text-sm">
            {smallText.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}

        {/* Language Selection Grid */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {availableLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleSelect(lang)}
              className={`px-4 py-2 rounded-md font-medium text-sm transition flex items-center justify-center ${
                selectedLanguages.includes(lang)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-green-200"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Selected Languages */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Selected Languages
          </h3>
          {selectedLanguages.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedLanguages.map((lang) => (
                <span
                  key={lang}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {lang}
                  <button
                    onClick={() => handleRemove(lang)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-black mt-2">No languages selected</p>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-green-500 text-white px-4 py-2 rounded-md mt-6 hover:bg-green-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            "Saving..."
          ) : (
            <>
              <Check size={18} /> Save & Continue
            </>
          )}
        </button>
      </div>
    </div>
  );
}
