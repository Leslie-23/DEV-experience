import { UserButton } from "@clerk/clerk-react";
import React from "react";
import { useClerk } from "@clerk/clerk-react";
import "./Home.css";
import landingbg from "../assets/landingbg.mp4";
import "./Dashboard.css";
import Reminder from "../Components/Reminder";
import ReminderForm from "../Components/ReminderForm";

const Dashboard = () => {
  const { user } = useClerk();
  return (
    <>
      <div className="dashboard-container">
        <h1 className="dashboard-title">
          Welcome to your dasboard {user.firstName}
        </h1>
        <UserButton />
        {/* <video autoPlay muted loop playsInline className="background-video">
        <source src={landingbg} type="video/mp4" />
      </video> */}
        {/* the video resource is too large for this. */}
      </div>

      <ReminderForm />
    </>
  );
};

export default Dashboard;
