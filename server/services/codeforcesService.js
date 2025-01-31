const axios = require("axios");

const fetchCodeforcesProblems = async () => {
  const url = "https://codeforces.com/api/problemset.problems";

  try {
    const response = await axios.get(url);
    return response.data.result.problems; // Returns an array of problems
  } catch (error) {
    console.error("Error fetching Codeforces problems:", error.message);
    return [];
  }
};

module.exports = { fetchCodeforcesProblems };
