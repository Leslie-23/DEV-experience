import { useState } from "react";

const Submissions = () => {
  const [answer, setAnswer] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulating AI response delay
    setTimeout(() => {
      setAiSuggestions([
        "Consider expanding on your key points.",
        "Try adding real-world examples to strengthen your argument.",
        "Keep your response concise but impactful.",
      ]);
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <div className=" bg-white">
        <h1 className="text-2xl font-bold text-gray-800">Submissions</h1>
        <div className="flex flex-col lg:flex-row items-start">
          <p className="lg:w-2/3"> Questions</p>
          <button
            onClick={() => window.history.back()}
            className="lg:w-1/6 p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition"
          >
            ←
          </button>
        </div>
      </div>
      <div className="min-h-screen flex flex-col lg:flex-row items-start bg-gray-50 p-6 gap-6">
        {/* Form Section */}
        <div className="lg:w-2/3 w-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Submit Your Answer
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Write your response..."
              className="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition transform hover:scale-105"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>

        {/* AI Suggestions Section */}
        <div className="lg:w-1/3 w-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            AI Suggestions
          </h2>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="w-8 h-8 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
            </div>
          ) : aiSuggestions ? (
            <ul className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <li key={index} className="bg-gray-100 p-3 rounded-md">
                  {suggestion}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              Submit your response to get AI suggestions.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Submissions;
