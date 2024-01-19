export const getOptions = (difficulty) => {
  let minLength;
  let maxLength;
  switch (difficulty) {
    case "beginner":
      minLength = 3;
      maxLength = 6;
      break;
    case "easy":
      minLength = 7;
      maxLength = 10;
      break;
    case "medium":
      minLength = 11;
      maxLength = 14;
      break;
    case "hard":
      minLength = 15;
      maxLength = 19;
      break;
    case "veryHard":
      minLength = 20;
      maxLength = 50;
      break;
    default:
      break;
  }

  const options = {
    method: "GET",
    url: "https://wordsapiv1.p.rapidapi.com/words/",
    params: {
      lettersMin: minLength,
      lettersMax: maxLength,
      letterPattern: `^[a-zA-Z]{${minLength},${maxLength}}$`,
      random: true,
      hasDetails: "definitions",
    },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
      "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
    },
  };

  return options;
};
