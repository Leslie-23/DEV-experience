import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, LogIn, UserPlus } from "lucide-react";
import Footer from "./components/Footer";
import Features from "./components/Features";
import ContactAndNewsletter from "./components/ContactAndNewsletter";
const Home = () => {
  const words = ["Programming"]; // "Coding", "Programming", "Problem Solving", "Development"
  const [index, setIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const faqs = [
    {
      question: "How do I sign up?",
      answer:
        "Click the Sign Up button and fill in your details. You'll receive a confirmation email to activate your account.",
    },
    {
      question: "How do I start solving challenges?",
      answer:
        "Once logged in, you'll get daily challenges based on your skill level. Solve them directly on the platform!",
    },
    {
      question: "Can I track my progress?",
      answer:
        "Yes! Your streaks, badges, and scores are stored on your dashboard, helping you stay motivated.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* ✅ Header */}
      <header className="w-full bg-green-500 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-3xl font-extrabold ">DX</h1>
        <nav className="hidden md:flex space-x-6">
          <a href="#features" className="hover:text-gray-200">
            Why Use Us
          </a>
          <a href="#faqs" className="hover:text-gray-200">
            FAQs
          </a>
          <a href="#contact" className="hover:text-gray-200">
            Contact
          </a>
        </nav>
        <div className="md:hidden">
          <ChevronDown size={24} />
        </div>
      </header>

      {/* ✅ Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b from-green-500 to-green-700 text-white">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Master{" "}
          <span className="text-gray-900 transition-opacity duration-500">
            {words[index]}
          </span>{" "}
          with Daily Challenges
        </h2>
        <p className="text-lg md:text-xl max-w-3xl opacity-90">
          Improve your problem-solving skills with curated coding challenges
          designed for <span className="font-semibold">all skill levels</span>{" "}
          Track your progress, compete on leaderboards, and receive AI-powered
          feedback.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Link
            to="/login"
            className="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition"
          >
            <LogIn size={20} /> Login
          </Link>
          <Link
            to="/signup"
            className="bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition"
          >
            <UserPlus size={20} /> Sign Up
          </Link>
        </div>
        <div className="absolute bottom-6 animate-fade-out opacity-100">
          <ChevronDown size={32} className="text-white animate-bounce" />
        </div>
      </section>

      {/* ✅ Features Section */}
      <Features />

      {/* ✅ FAQs Section */}
      <section id="faqs" className="py-16 px-6 text-center bg-white">
        <h3 className="text-3xl font-bold text-green-600 mb-6">FAQs</h3>
        <div className="max-w-4xl mx-auto text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-100 p-5 rounded-lg shadow-md mb-4"
            >
              <button
                className="w-full text-lg font-semibold flex justify-between text-left"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className="text-green-500">
                  {openIndex === index ? <ChevronUp /> : <ChevronDown />}
                </span>
              </button>
              {openIndex === index && (
                <p className="mt-2 text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
        {/* link to faqs */}
        <Link
          to="/faqs"
          className="text-green-500 font-semibold hover:underline"
        >
          View All FAQs
        </Link>
      </section>
      <ContactAndNewsletter />
      {/* ✅ Footer */}
      <Footer />
    </div>
  );
};

export default Home;

//  needed a more clean page

// import React from "react";
// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-500 to-green-800 text-white px-6">
//       <div className="max-w-5xl text-center">
//         <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
//           Elevate Your Coding Skills with Daily Challenges
//         </h1>
//         <p className="text-lg md:text-xl mb-6 leading-relaxed">
//           Welcome to your personal coding hub! Our platform brings you a daily
//           set of coding challenges in a variety of categories—from Algorithms
//           and Data Structures to System Design. Whether you’re just starting or
//           looking to deepen your skills, our platform tailors problems to your
//           experience level, helping you grow one challenge at a time.
//         </p>
//         <p className="text-md md:text-lg mb-8 opacity-80">
//           Track your progress, compare your solutions with others, and receive
//           detailed feedback on code quality and correctness. Our AI-driven
//           platform offers a comprehensive learning path designed to improve your
//           problem-solving abilities.
//         </p>
//         <p className="text-md md:text-lg mb-6 opacity-75">
//           Get started by logging in or creating an account. Join our community
//           and make learning to code fun and engaging, with daily streaks,
//           performance badges, and global leaderboards to keep you motivated.
//         </p>
//         <div className="flex flex-col md:flex-row gap-4">
//           <Link
//             to="/login"
//             className="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
//           >
//             Login
//           </Link>
//           <Link
//             to="/signup"
//             className="bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
//           >
//             Sign Up
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Home;
