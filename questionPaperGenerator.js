const _ = require("lodash");
const questionStore = require("./questionStore");

const generateQuestionPaper = (totalMarks, difficultyDistribution) => {
  const distribution = difficultyDistribution.map((percentage) => percentage / 100);
  const paper = [];

  _.forEach(distribution, (percentage, index) => {
    const difficulty = ["Easy", "Medium", "Hard"][index];
    const questionsByDifficulty = _.filter(questionStore.getQuestions(), { difficulty });

    if (questionsByDifficulty.length === 0) {
      console.error(`No questions available for difficulty level: ${difficulty}`);
      return;
    }

    const marksForDifficulty = Math.round(totalMarks * percentage);
    const questionMarks = questionsByDifficulty[0].marks;

    const selectedQuestions = _.sampleSize(
      questionsByDifficulty,
      marksForDifficulty / questionMarks
    );
    paper.push(...selectedQuestions);
  });

  return paper;
};

module.exports = generateQuestionPaper;
