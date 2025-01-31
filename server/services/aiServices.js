const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const checkAnswer = async (question, userAnswer) => {
  const prompt = `Evaluate this answer to the coding problem:
  Question: ${question.statement}
  User Answer: ${userAnswer}
   
  Give feedback and rate it from 0-100 based on correctness.`;

  try {
    const completion = await openai.chat.completions.create({
      // model: "gpt-4-turbo",
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const feedback = completion.choices[0].message.content;
    const ratingMatch = feedback.match(/\b\d{1,3}\b/);
    const rating = ratingMatch ? parseInt(ratingMatch[0]) : null;

    return { feedback, rating };
  } catch (error) {
    console.error("AI error:", error.message);
    return { feedback: "AI evaluation failed.", rating: null };
  }
};

module.exports = { checkAnswer };
