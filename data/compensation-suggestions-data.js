const P_SUGGESTION_LIST = [
  "$600",
  "iPhone 15",
  "A trip to Congo",
  "Apple Gift Card",
  "Kiss an elephant",
  "Eat 100 burgers",
  "Pay my tuition",
];

export const P_SUGGESTION = (count) => {
  let chosenSuggestion = [];
  let indexList = [];
  for (let i = 0; i < count; i++) {
    let index;

    do {
      index = Math.floor(Math.random() * P_SUGGESTION_LIST.length);
    } while (indexList.includes(index));

    chosenSuggestion.push(P_SUGGESTION_LIST[index]);
    indexList.push(index);
  }

  return chosenSuggestion;
};
