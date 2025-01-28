class Utility {
  // Mock: Generate a daily problem set
  static generateProblemSet() {
    return [
      { id: "1", question: "Reverse a string", difficulty: "Easy" },
      {
        id: "2",
        question: "Find the longest palindrome",
        difficulty: "Medium",
      },
      { id: "3", question: "Implement LRU Cache", difficulty: "Hard" },
    ];
  }
}

module.exports = Utility;
