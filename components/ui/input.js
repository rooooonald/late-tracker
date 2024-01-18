import { forwardRef } from "react";

import styles from "./input.module.css";

const Input = forwardRef(function Input(props, ref) {
  return (
    <div
      className={`${styles["input-control"]} ${props.error && styles.error}`}
    >
      <label htmlFor={props.id} className={props.className.label}>
        {props.label}
      </label>
      <input
        {...props.input}
        ref={ref}
        id={props.id}
        className={props.className.input}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
      <p>{props.error}</p>
    </div>
  );
});

export default Input;
