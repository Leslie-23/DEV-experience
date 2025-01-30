import { SignInButton } from '@clerk/clerk-react'
import React, {useEffect, useState}from 'react'
import './Home.css'
import Typewriter from "typewriter-effect";
import landingbg from '../assets/landingbg.mp4'
import Footer from '../Components/Footer';

const CURSOR_SIZE = 20;


const Home = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
          setCursorPosition({ x: e.clientX, y: e.clientY });
        };
    
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
        };
      }, []);
  return (
    <>
    <div className='home-container'>
       <div
      style={{
        width: `${CURSOR_SIZE}px`,
        height: `${CURSOR_SIZE}px`,
        backgroundColor: "indigo",
        borderRadius: "50%",
        position: "fixed", 
        top: `${cursorPosition.y - CURSOR_SIZE / 2}px`, 
        left: `${cursorPosition.x - CURSOR_SIZE / 2}px`, 
        pointerEvents: "none", 
        zIndex: 9999,
        transition: "transform 10s ease",
        delay: "20s",
      }}
    ></div>
        <video autoPlay muted loop playsInline className="background-video">
        <source src={landingbg} type="video/mp4" />
      </video>
      <div className='main-content'>
      {/* <p className='main-message'><Typewriter
          options={{
            strings: ["Welcome to the Dev Experience"],
            autoStart: true,
            loop: false,
            delay: 50,
            deleteSpeed:Infinity,
            cursor: "",
          }}
        />
        </p> */}
        <svg viewBox="0 0 800 200" width="100%" height="50">
      <text x="50%" y="50%" textAnchor="middle" className="animated-text">
        The Developer Experience
      </text>
    </svg>
      <SignInButton mode='modal' forceRedirectUrl={'/dashboard'} className='sign-in-button'/>
      </div>
    </div>

    <div className='footer'>
      <Footer/>
      </div>
   </>
  )
}

export default Home