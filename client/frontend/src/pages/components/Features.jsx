import { useState } from "react";

const Features = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const features = [
    {
      title: "AI-Powered Learning",
      description:
        "Receive instant feedback on code quality, efficiency, and best practices.",
    },
    {
      title: "Track Your Progress",
      description:
        "Maintain coding streaks, earn badges, and climb the leaderboards.",
    },
    {
      title: "Join a Community",
      description:
        "Collaborate with developers worldwide and improve together.",
    },
    {
      title: "Competitive Challenges",
      description:
        "Participate in weekly and monthly coding contests and see where you rank.",
    },
    {
      title: "Problem-Solving Mastery",
      description:
        "Solve algorithmic and system design problems tailored to your level.",
    },
    {
      title: "Extensive Learning Resources",
      description:
        "Access guides, tutorials, and explanations to strengthen your coding skills.",
    },
    {
      title: "Earn Certifications",
      description:
        "Get certified upon completing coding challenges and showcase your skills.",
    },
    {
      title: "Daily Coding Reminders",
      description:
        "Stay consistent with daily reminders to solve problems and improve.",
    },
  ];

  const toggleFeature = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="features" className="py-16 px-6 bg-gray-50 text-center">
      <h3 className="text-2xl font-medium text-green-600 mb-6">
        Why Use <span className="text-3xl font-extrabold">DX</span>?
      </h3>
      <div className="grid grid-cols-2 gap-4 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-4 shadow-md rounded-lg transition transform hover:scale-105 cursor-pointer flex flex-col"
            onClick={() => toggleFeature(index)}
          >
            <h4 className="text-md text-left font-semibold text-green-600">
              {feature.title}
            </h4>
            <p
              className={`mt-2 text-gray-700 text-sm ${
                activeIndex === index ? "block" : "hidden"
              } md:block overflow-hidden`}
              style={{ maxHeight: "80px", minHeight: "60px" }}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
