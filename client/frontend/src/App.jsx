// app.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
// import Projects from "./pages/Projects";
// import ProjectDetails from "./pages/ProjectDetails";
// import Community from "./pages/Community";
// import Settings from "./pages/Settings";
// import AdminPanel from "./pages/AdminPanel";
import SetReminder from "./pages/SetReminder";
import Submissions from "./pages/Submissions";
import NotFound from "./pages/404";
import "./App.css";

function App() {
  return (
    <>
      {" "}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* 
        <Route path="/profile" element={<Profile />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/community" element={<Community />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<AdminPanel />} /> 
        */}
        <Route path="/set-reminder" element={<SetReminder />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
