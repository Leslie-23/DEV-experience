import { SignInButton } from '@clerk/clerk-react'
import React, {useEffect, useState}from 'react'
import './Home.css'
import Typewriter from "typewriter-effect";
import landingbg from '../assets/landingbg.mp4'
import Footer from '../Components/Footer';
import HomePlus from './HomePlus';
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
      <p className='main-message'><Typewriter
          options={{
            strings: ["Welcome to the Dev Experience"],
            autoStart: true,
            loop: false,
            delay: 50,
            deleteSpeed:Infinity,
            cursor: "",
          }}
        />
        </p>
        {/* <p className='about-message'>DevEx is a productivity platform for developers that helps track tasks, monitor progress, and stay consistent, all while streamlining collaboration and enhancing accountability.
        </p> */}
      <SignInButton mode='modal' forceRedirectUrl={'/dashboard'} className='sign-in-button'/>
      
      
      </div>
    </div>

    <div className='footer'>
      <Footer/>
      </div>
      {/* <div className='about'>
        <div className='about-content'>
        <h1>What is Dev Experience?</h1>
        <p className='about-message'>The Dev Experience (DevEx) is a productivity platform designed to help developers stay accountable, maintain high levels of productivity, and build consistency in their work. The platform provides developers with a seamless experience in managing tasks, tracking progress, and collaborating efficiently.</p>
       
        </div>
        
      </div> */}
   </>
  )
}

export default Home