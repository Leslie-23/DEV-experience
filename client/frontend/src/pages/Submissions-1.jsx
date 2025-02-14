import React, { useState, useEffect } from "react";

const SubmissionsOne = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.error("User ID is missing. Cannot fetch questions.");
      return;
    }

    fetch(`http://localhost:5000/api/submission/user-questions?user=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setQuestions(data);
          //   console.log(data);
        } else {
          console.error("Unexpected API response:", data);
          setQuestions([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setQuestions([]);
      });
  }, [userId]);

  const handleAnswerChange = (questionId, selectedOption) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:5000/api/submission/submit",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, answers: userAnswers }),
      }
    );

    const result = await response.json();
    if (response.ok) {
      setFeedback(result.feedback);
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Your Daily Coding Challenge
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q) => {
            const feedbackItem = feedback?.find((f) => f.questionId === q._id);
            const isCorrect = feedbackItem?.isCorrect;
            const userSelected = userAnswers[q._id];

            return (
              <div
                key={q._id}
                className={`p-4 rounded-lg border-2 ${
                  feedback
                    ? isCorrect
                      ? "bg-green-100 border-green-500"
                      : "bg-red-100 border-red-500"
                    : "bg-gray-50"
                }`}
              >
                <p className="font-semibold">{q.question}</p>
                <div className="mt-2">
                  {q.options.map((opt) => {
                    const selected = userSelected === opt;
                    const isCorrectOption = feedbackItem?.correctAnswer === opt;

                    return (
                      <label
                        key={opt}
                        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition border ${
                          feedback
                            ? isCorrectOption
                              ? "bg-green-300 text-white border-green-500"
                              : selected
                              ? "bg-red-300 text-white border-red-500"
                              : "border-gray-300"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name={q._id}
                          value={opt}
                          checked={selected}
                          onChange={() => handleAnswerChange(q._id, opt)}
                          disabled={feedback !== null}
                          className="hidden"
                        />
                        <span
                          className={`w-5 h-5 flex items-center justify-center border-2 rounded-full ${
                            selected
                              ? "bg-blue-500 border-blue-700 text-white"
                              : "border-gray-300"
                          }`}
                        >
                          {selected && "✔"}
                        </span>
                        {opt}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {!feedback ? (
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold transition"
            >
              Submit Answers
            </button>
          ) : (
            <p className="text-center text-lg font-semibold">
              🎉 You scored: {feedback.filter((f) => f.isCorrect).length} /{" "}
              {questions.length}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubmissionsOne;
