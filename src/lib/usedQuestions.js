export function initializeQuestions() {
  if (!localStorage.getItem("usedQuizQuestions21")) {
    localStorage.setItem("usedQuizQuestions21", JSON.stringify({}));
  }
}

export function resetUsedQuestions() {
  localStorage.setItem("usedQuizQuestions21", JSON.stringify({}));
}

export function getUsedQuestions() {
  initializeQuestions();
  const usedQuestionsString = localStorage.getItem("usedQuizQuestions21");
  const usedQuestions = JSON.parse(usedQuestionsString);
  return usedQuestions;
}

export function addUsedQuestion(number) {
  initializeQuestions();
  let previouslyUsed = getUsedQuestions();
  console.log(previouslyUsed);
  previouslyUsed[number] = true;
  localStorage.setItem("usedQuizQuestions21", JSON.stringify(previouslyUsed));
}
