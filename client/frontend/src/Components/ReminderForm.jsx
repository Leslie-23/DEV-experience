import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

const ReminderForm = ({ onClose }) => {
  const { getToken } = useAuth(); // Move inside component
  const [hour, setHour] = useState(14);
  const [minute, setMinute] = useState(0);
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    const storedTime = localStorage.getItem("reminderTime");
    if (storedTime) {
      setIsSet(true);
    }
  }, []);

  const formatTime = (h, m) =>
    `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reminderTime = formatTime(hour, minute);

    try {
      const token = await getToken(); // Fetch Clerk token

      const response = await axios.post(
        `${BACKEND_API_URL}/api/user/set-reminder`,
        { reminderTime }, // Correct payload format
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(`Reminder Set: ${response.data.message}`);
      console.log(`BACKEND_API_URL: ${BACKEND_API_URL}`);
      console.log(`token: ${token}`);
      //   console.log(`reminderTime: ${reminderTime}`);

      localStorage.setItem("reminderTime", reminderTime);
      setIsSet(true);
      onClose();
    } catch (error) {
      console.error("Error setting reminder:", error);
      alert(error.response?.data?.message || "Failed to set reminder.");
    }
  };

  return !isSet ? (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <h3>Set Reminder Time</h3>

      <label>Hour: {hour}</label>
      <input
        type="number"
        min="0"
        max="23"
        value={hour}
        onChange={(e) => setHour(Number(e.target.value))}
      />

      <label>Minute: {minute}</label>
      <input
        type="number"
        min="0"
        max="59"
        step="5"
        value={minute}
        onChange={(e) => setMinute(Number(e.target.value))}
      />

      <button type="submit">Save Reminder</button>
    </form>
  ) : null;
};

// Inline styles
const styles = {
  formContainer: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
};

export default ReminderForm;

// the below code is flawed. it works but not as expected

// import React, { useState } from "react";

// const ReminderForm = () => {
//   const [reminderTime, setReminderTime] = useState("");

//   const handleChange = (event) => {
//     setReminderTime(event.target.value); // Captures time input as "HH:MM"
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formattedData = { reminderTime };

//     try {
//       const response = await fetch("https://your-backend.com/api/reminders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formattedData),
//       });

//       if (response.ok) {
//         alert("Reminder set successfully!");
//       } else {
//         alert("Failed to set reminder.");
//       }
//     } catch (error) {
//       console.error("Error posting reminder:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Set Reminder Time:
//         <input
//           type="time"
//           value={reminderTime}
//           onChange={handleChange}
//           required
//         />
//       </label>
//       <button type="submit">Set Reminder</button>
//     </form>
//   );
// };

// export default ReminderForm;
