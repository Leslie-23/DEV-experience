import React from 'react'
import './App.css'
import {Routes} from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route index element={<Home />} />
        <Route path="/dashboard" element={
          <>
          <SignedIn>
            <Dashboard />
          </SignedIn>

          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
          </>
        } />
        <Route path="/login" element={<Login />} />

    </>
  )
);
const App = () => {
  return (
    <div>
     <RouterProvider router={router}/>
   

    </div>
  )
}

export default App