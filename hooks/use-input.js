import { useState } from "react";

export default function useInput(validate, user = null) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const validationResult = validate(enteredValue, user);
  const valueIsValid = validationResult.isValid;

  const hasError = !valueIsValid && isTouched;
  let errorMsg;
  if (hasError) {
    errorMsg = validationResult.error;
  }

  const changeValueHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const setValueHandler = (value) => {
    setEnteredValue(value);
    setIsTouched(true);
  };

  const onBlurHandler = () => {
    setIsTouched(true);
  };

  const resetHandler = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    errorMsg,
    changeValueHandler,
    onBlurHandler,
    resetHandler,
    setValueHandler,
  };
}
