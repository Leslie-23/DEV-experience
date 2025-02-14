import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SetReminder = () => {
  // State for time reminder
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle time change
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  // Validate time format (HH:mm)
  const validateTime = () => {
    const regex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
    return regex.test(time);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (validateTime()) {
      setLoading(true);
      try {
        // Retrieve the token from localStorage (or wherever it's stored)
        const token = localStorage.getItem("token");

        // Check if the token exists before proceeding
        if (!token) {
          setError("You must be logged in to set a reminder");
          return;
        }

        // Send POST request to backend with time data
        const response = await axios.post(
          "http://localhost:5000/api/user/set-reminder",
          { reminderTime: time },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Assuming the response is in JSON format
        const data = response.data;
        console.log(` { reminderTime: ${time} }`);
        if (response.status === 200) {
          alert(`Reminder set for ${time}`);
          navigate("/dashboard");
        } else {
          setError(data.message || "Failed to set reminder");
          console.log(data.message);
        }
      } catch (error) {
        setError("An error occurred while setting the reminder");
        console.error(error);
      }
    } else {
      setError("Invalid time format. Please use HH:mm.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-500 to-green-700">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Set Your Daily Reminder
        </h2>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Reminder Time
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={handleTimeChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition"
              disabled={loading}
            >
              {loading ? "Setting..." : "Set Reminder"}
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate(-1)}
            className="w-1/4 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetReminder;

// code below is stable with issues in the axios (400 and 401)

// import React, { useState } from "react";
// import axios from "axios";
// const SetReminder = () => {
//   // State for time reminder
//   const [time, setTime] = useState("");
//   const [error, setError] = useState("");

//   // Handle time change
//   const handleTimeChange = (e) => {
//     setTime(e.target.value);
//   };

//   // Validate time format (HH:mm)
//   const validateTime = () => {
//     const regex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
//     return regex.test(time);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (validateTime()) {
//       try {
//         // Retrieve the token from localStorage (or wherever it's stored)
//         const token = localStorage.getItem("token");
//         // console.log("Token:", token);

//         // Check if the token exists before proceeding
//         if (!token) {
//           setError("You must be logged in to set a reminder");
//           return;
//         }

//         // Send POST request to backend with time data
//         const response = await axios.post(
//           "http://localhost:5000/api/user/set-reminder",
//           { time },
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ time }),
//           }
//         );

//         const data = await response.json();

//         if (response.ok) {
//           alert(`Reminder set for ${data.time}`);
//         } else {
//           setError(data.message || "Failed to set reminder");
//           console.log(data.message);
//         }
//       } catch (error) {
//         setError("An error occurred while setting the reminder");
//         console.error(error);
//       }
//     } else {
//       setError("Invalid time format. Please use HH:mm.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-semibold text-center mb-6">
//           Set Reminder
//         </h2>

//         {/* Error Message */}
//         {error && (
//           <p className="text-red-500 text-sm text-center mb-4">{error}</p>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="time"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Reminder Time
//             </label>
//             <input
//               type="time"
//               id="time"
//               value={time}
//               onChange={handleTimeChange}
//               className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//               required
//             />
//           </div>

//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition"
//             >
//               Set Reminder
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SetReminder;
