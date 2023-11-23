const _ = require("lodash");
const readline = require("readline");
const generateQuestionPaper = require("./questionPaperGenerator");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the total marks: ", (totalMarksInput) => {
  const totalMarks = parseInt(totalMarksInput, 10);

  rl.question(
    "Enter difficulty distribution (Easy, Medium, Hard) in percentage (e.g. 20 50 30): ",
    (distributionInput) => {
      const difficultyDistribution = distributionInput.split(" ").map(Number);

      if (
        difficultyDistribution.length !== 3 ||
        difficultyDistribution.reduce((sum, val) => sum + val, 0) !== 100
      ) {
        console.error("Invalid difficulty distribution. Sum of percentages should be 100.");
        rl.close();
        process.exit(1);
      }

      const questionPaper = generateQuestionPaper(totalMarks, difficultyDistribution);

      console.log("\nGenerated Question Paper:\n");
      _.forEach(questionPaper, (value) =>
        console.log(`${value.question} (${value.difficulty} ${value.marks} marks)`)
      );

      rl.close();
    }
  );
});
