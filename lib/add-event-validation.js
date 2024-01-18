export const checkEmptyInput = (value) => {
  if (value.trim() === "") {
    return { isValid: false, error: "Please fill in the blank." };
  }
  return { isValid: true };
};

export const validateParticipant = (value, user) => {
  if (value.trim() === "") {
    return { isValid: false, error: "Please fill in the blank." };
  }

  if (!value.includes("@gmail.com")) {
    return {
      isValid: false,
      error: "Only participants with a Gmail account is accepted.",
    };
  }

  if (value === user) {
    return {
      isValid: false,
      error: "You don't have to add yourself here.",
    };
  }
  return { isValid: true };
};

export const validateDate = (value) => {
  if (value.trim() === "") {
    return { isValid: false, error: "Please fill in the blank." };
  }

  const time = new Date(value).getTime();
  if (Date.now() > time) {
    return { isValid: false, error: "Please enter a later date." };
  }

  return { isValid: true, error: null };
};
