import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const link = "https://www.leslie23-dev-experience.netlify.app";
  const faqs = [
    {
      question: "How do I sign up?",
      answer: `Click the Sign Up button and fill in your details here -> ${link}. You'll receive a confirmation email to activate your account.`,
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
    {
      question: "Is this platform free to use?",
      answer:
        "Yes! Our platform is completely free to use, and you can start solving challenges right away!",
    },
    {
      question: "Can I reset my password?",
      answer:
        "Yes, click on 'Forgot Password' at the login page, and follow the instructions to reset it.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can reach out to our support team via the Contact Us page or email us directly at support@yourwebsite.com.",
    },
    {
      question: "Are there different difficulty levels?",
      answer:
        "Yes, we provide challenges ranging from beginner to advanced levels so everyone can participate.",
    },
    {
      question: "Can I compete with friends?",
      answer:
        "Absolutely! You can invite friends to solve challenges together and track each other's progress.",
    },
    {
      question: "Do I earn rewards for completing challenges?",
      answer:
        "Yes! Completing challenges earns you badges, points, and a place on our leaderboard.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faqs"
      className="py-16 px-6 text-center  bg-gradient-to-b from-green-500 to-green-700"
    >
      <h3 className="text-3xl font-bold text-gray-700 mb-6">FAQs</h3>
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
    </section>
  );
};

export default FAQs;
