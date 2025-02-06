// import React, { useEffect } from "react";
// import "./App.css";
// import {
//   SignedIn,
//   SignedOut,
//   RedirectToSignIn,
//   useAuth,
// } from "@clerk/clerk-react";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   RouterProvider,
//   Route,
//   Navigate,
//   useNavigate,
// } from "react-router-dom";
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route index element={<Home />} />
//       <Route
//         path="/dashboard"
//         element={
//           <>
//             <SignedIn>
//               <Dashboard />
//             </SignedIn>
//             <SignedOut>
//               <RedirectToSignIn />
//             </SignedOut>
//           </>
//         }
//       />
//       <Route path="/login" element={<Login />} />
//     </>
//   )
// );

// const App = () => {
//   const { isSignedIn } = useAuth();
//   const navigate = useNavigate(); // Use React Router navigation

//   // Automatically redirect to dashboard if signed in
//   useEffect(() => {
//     if (isSignedIn) {
//       navigate("/dashboard");
//     }
//   }, [isSignedIn]); // Add isSignedIn as a dependency

//   return <RouterProvider router={router} />;
// };

// export default App;

import React, { useEffect } from "react";
import "./App.css";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useAuth,
  useClerk,
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
  const { loaded } = useClerk(); // Ensures Clerk is ready

  // Redirect only when Clerk is fully loaded
  useEffect(() => {
    if (loaded && isSignedIn) {
      window.location.href = "/dashboard";
    }
  }, []); // Depend on `loaded` to prevent infinite re-renders

  return <RouterProvider router={router} />;
};

export default App;
