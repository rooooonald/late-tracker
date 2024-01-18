import { useState } from "react";

import Button from "../button";
import NavDescription from "./nav-description";

import styles from "./main-nav-button.module.css";

export default function MainNavButton({ onClick, description, children }) {
  const [showNavDescription, setShowNavDescription] = useState(false);

  const showDescription = () => {
    setShowNavDescription(true);
  };

  const hideDescription = () => {
    setShowNavDescription(false);
  };

  return (
    <Button
      type="button"
      onClick={onClick}
      onMouseOver={showDescription}
      onMouseOut={hideDescription}
      className={styles["nav-btn"]}
    >
      {showNavDescription && <NavDescription description={description} />}
      <div className={styles["nav-btn-animation"]}></div>
      {children}
    </Button>
  );
}
