import React, { useEffect } from "react";
import "./App.css";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useAuth,
} from "@clerk/clerk-react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <>
            <SignedIn>
              <Dashboard />
            </SignedIn>

            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
      <Route path="/login" element={<Login />} />
    </>
  )
);

const App = () => {
  const { isSignedIn } = useAuth();

  // Automatically redirect to dashboard if signed in
  useEffect(() => {
    if (isSignedIn) {
      window.location.href = "/dashboard";
    }
  }, []);
  // if isSignedIn is passed as a dependecy. the page will keep reloading endlessly...

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
