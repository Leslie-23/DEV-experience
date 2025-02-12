const Question = require("../models/questions");

class Utility {
  static async generateProblemSet() {
    try {
      const questions = await Question.aggregate([{ $sample: { size: 5 } }]); // Get 5 random questions
      return questions;
    } catch (error) {
      console.error("Error generating problem set:", error);
      return [];
    }
  }
}

module.exports = Utility;

// scrapped due to scalability

// class Utility {
//   // ✅ Generate a daily problem set
//   static generateProblemSet() {
//     return [
//       { id: "1", question: "Reverse a string", difficulty: "Easy" },
//       {
//         id: "2",
//         question: "Find the longest palindrome",
//         difficulty: "Medium",
//       },
//       { id: "3", question: "Implement LRU Cache", difficulty: "Hard" },
//     ];
//   }

//   // ✅ Mock check for correct answer
//   static checkAnswer(problemId, submittedAnswer) {
//     const answers = {
//       1: "gnirts a esreveR",
//       2: "Longest Palindrome logic",
//       3: "LRU Cache logic",
//     };
//     return answers[problemId] === submittedAnswer;
//   }
// }

// module.exports = Utility;

// class Utility {
//   // Mock: Generate a daily problem set
//   static generateProblemSet() {
//     return [
//       { id: "1", question: "Reverse a string", difficulty: "Easy" },
//       {
//         id: "2",
//         question: "Find the longest palindrome",
//         difficulty: "Medium",
//       },
//       { id: "3", question: "Implement LRU Cache", difficulty: "Hard" },
//     ];
//   }
// }

// module.exports = Utility;
