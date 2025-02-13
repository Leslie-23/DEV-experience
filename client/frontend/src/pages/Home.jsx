import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, LogIn, UserPlus } from "lucide-react";

const Home = () => {
  const words = ["Programming"]; // "Coding", "Programming", "Problem Solving", "Development"
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

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
      <section id="features" className="py-16 px-6 bg-gray-50 text-center">
        <h3 className="text-2xl font-medium text-green-600 mb-6">
          Why Use <span className="text-3xl font-extrabold">DX</span>?
        </h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* 🚀 AI-Powered Learning */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h4 className="text-xl font-semibold">🚀 AI-Powered Learning</h4>
            <p className="mt-2 text-gray-700">
              Receive instant feedback on code quality, efficiency, and best
              practices.
            </p>
          </div>

          {/* 🔥 Track Your Progress */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h4 className="text-xl font-semibold">🔥 Track Your Progress</h4>
            <p className="mt-2 text-gray-700">
              Maintain coding streaks, earn badges, and climb the leaderboards.
            </p>
          </div>

          {/* 🤝 Join a Community */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h4 className="text-xl font-semibold">🤝 Join a Community</h4>
            <p className="mt-2 text-gray-700">
              Collaborate with developers worldwide and improve together.
            </p>
          </div>

          {/* 🏆 Competitive Challenges */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h4 className="text-xl font-semibold">🏆 Competitive Challenges</h4>
            <p className="mt-2 text-gray-700">
              Participate in weekly and monthly coding contests and see where
              you rank.
            </p>
          </div>

          {/* 🧠 Problem-Solving Mastery */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h4 className="text-xl font-semibold">
              🧠 Problem-Solving Mastery
            </h4>
            <p className="mt-2 text-gray-700">
              Solve algorithmic and system design problems tailored to your
              level.
            </p>
          </div>

          {/* 📚 Extensive Learning Resources */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h4 className="text-xl font-semibold">
              📚 Extensive Learning Resources
            </h4>
            <p className="mt-2 text-gray-700">
              Access guides, tutorials, and explanations to strengthen your
              coding skills.
            </p>
          </div>

          {/* 🏅 Earn Certifications */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h4 className="text-xl font-semibold">🏅 Earn Certifications</h4>
            <p className="mt-2 text-gray-700">
              Get certified upon completing coding challenges and showcase your
              skills.
            </p>
          </div>

          {/* ⏳ Daily Coding Reminders */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h4 className="text-xl font-semibold">⏳ Daily Coding Reminders</h4>
            <p className="mt-2 text-gray-700">
              Stay consistent with daily reminders to solve problems and
              improve.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ FAQs Section */}
      <section id="faqs" className="py-16 px-6 text-center bg-white">
        <h3 className="text-3xl font-bold text-green-600 mb-6">FAQs</h3>
        <div className="max-w-4xl mx-auto text-left">
          <div className="bg-gray-100 p-5 rounded-lg shadow-md mb-4">
            <h4 className="text-lg font-semibold">❓ How do I sign up?</h4>
            <p className="mt-1 text-gray-700">
              Click the <span className="font-bold">Sign Up</span> button and
              fill in your details. You'll receive a confirmation email to
              activate your account.
            </p>
          </div>
          <div className="bg-gray-100 p-5 rounded-lg shadow-md mb-4">
            <h4 className="text-lg font-semibold">
              ❓ How do I start solving challenges?
            </h4>
            <p className="mt-1 text-gray-700">
              Once logged in, you'll get daily challenges based on your skill
              level. Solve them directly on the platform!
            </p>
          </div>
          <div className="bg-gray-100 p-5 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold">
              ❓ Can I track my progress?
            </h4>
            <p className="mt-1 text-gray-700">
              Yes! Your streaks, badges, and scores are stored on your
              dashboard, helping you stay motivated.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer
        id="contact"
        className="bg-gray-900 text-white text-center py-6 mt-12"
      >
        <p className="text-gray-400">
          © 2024 <span className="text-green-500 font-semibold">DX</span>. All
          Rights Reserved.
        </p>
        <p className="mt-2">
          Need help?{" "}
          <a
            href="mailto:support@DevEx.com"
            className="text-green-400 hover:underline"
          >
            Contact Us
          </a>
        </p>
      </footer>
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
