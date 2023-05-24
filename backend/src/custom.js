/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  console.log('See question: ', question);
  let hiddenAnswers = [];
  for (let i = 0; i < question.answers.length; i ++) {
    let hAnswer = {
      id: question.answers[i].id,
      value: question.answers[i].value
    }
    hiddenAnswers.push(hAnswer)
  }
  return {
          id: question.id,
          questionString: question.questionString,
          answers: hiddenAnswers,
          time: question.time,
          embed: question.embed,
          point: question.point,
        };
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  return question.answers.filter(answer => answer.correct === true).map(a => a.id);
  // [
  //   123,
  // ]; // For a single answer
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  return question.answers.map(a => a.id);
  // [
  //   123,
  //   456,
  //   678,
  // ]; // For a single answer
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = question => {
  return question.time;
};
