import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// import ProjectDetails from "./pages/ProjectDetails";
// import Community from "./pages/Community";
// import AdminPanel from "./pages/AdminPanel";
import SetReminder from "./pages/SetReminder";
import Submissions from "./pages/Submissions";
import SubmissionsOne from "./pages/Submissions-1";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import NotFound from "./pages/404";
import SetLanguages from "./pages/SetLanguages";
import Streak from "./components/Streak";
import Projects from "./pages/components/projects";
import FAQs from "./pages/components/FAQs";
import "./App.css";

// Define routes using createBrowserRouter for better navigation and deployment on Vercel
const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* General Routes */}
      {/* <Switch> */}
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
      <Route path="/submissions1" element={<SubmissionsOne />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/languages" element={<SetLanguages />} />
      <Route path="/streak" element={<Streak />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/faqs" element={<FAQs />} />

      {/* Catch-All Route for 404 */}
      <Route path="*" element={<NotFound />} />
      {/* </Switch> */}
    </>
  )
);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
