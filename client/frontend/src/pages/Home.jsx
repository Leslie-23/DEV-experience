import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-500 to-green-800 text-white px-6">
      <div className="max-w-5xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Elevate Your Coding Skills with Daily Challenges
        </h1>
        <p className="text-lg md:text-xl mb-6 leading-relaxed">
          Welcome to your personal coding hub! Our platform brings you a daily
          set of coding challenges in a variety of categories—from Algorithms
          and Data Structures to System Design. Whether you’re just starting or
          looking to deepen your skills, our platform tailors problems to your
          experience level, helping you grow one challenge at a time.
        </p>
        <p className="text-md md:text-lg mb-8 opacity-80">
          Track your progress, compare your solutions with others, and receive
          detailed feedback on code quality and correctness. Our AI-driven
          platform offers a comprehensive learning path designed to improve your
          problem-solving abilities.
        </p>
        <p className="text-md md:text-lg mb-6 opacity-75">
          Get started by logging in or creating an account. Join our community
          and make learning to code fun and engaging, with daily streaks,
          performance badges, and global leaderboards to keep you motivated.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/login"
            className="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
