import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import toast, { Toaster } from 'react-hot-toast';

const Reminder = () => {
    const [reminderTime, setReminderTime] = useState('');
    const { user } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return toast.error('Please login to set a reminder');

        const data = {
            userId: user.id,
            reminderTime: reminderTime
        };

        try {
            const response = await fetch("/api/user/set-reminder", {
                method: "POST",  // Fixed: POST should be a string
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to save reminder");
            }

            const result = await response.json();
            toast.success("Reminder saved successfully!"); // Fixed: Proper toast message
        } catch (error) {
            toast.error(error.message || "Error saving reminder"); // Fixed: Correct error handling
        }
    };

    return (
        <>
            <Toaster position="top-center" />
            <form onSubmit={handleSubmit}>
                <label>
                    Set reminder time:
                    <input
                        type='time'
                        value={reminderTime}
                        onChange={(e) => setReminderTime(e.target.value)}
                        required
                    />
                </label>
                <button type='submit'>Save Reminder</button>
            </form>
        </>
    );
};

export default Reminder;
