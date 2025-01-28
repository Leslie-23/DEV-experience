import React, { useState, useEffect } from "react";
import { useTransition, animated } from "@react-spring/web";
import { SignInButton } from "@clerk/clerk-react";

const Home = () => {
  const messages = [
    "What is Dev Experience?",
    "The Dev Experience (DevEx) is a productivity platform designed to help developers stay accountable, maintain high levels of productivity, and build consistency in their work. The platform provides developers with a seamless experience in managing tasks, tracking progress, and collaborating efficiently.",
    "Elevate your productivity",
  ];

  const [index, setIndex] = useState(0);

  // Cycle through messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [messages.length]);

  // React Spring Transition
  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0, transform: "translateY(20px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(-20px)" },
    config: { duration: 500 },
  });

  return (
    <div
     
    >
      <div style={{ height: "50px", marginBottom: "20px" }}>
        {transitions((style, i) => (
          <animated.h1 style={style}>{messages[i]}</animated.h1>
        ))}
      </div>
      
    </div>
  );
};

export default Home;
