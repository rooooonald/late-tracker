import { useEffect, useState } from "react";

import { LATE_EXCUSES } from "@/data/late-excuses-data";

import TitleCard from "../ui/title-card";

import styles from "./late-excuses.module.css";
import {
  IconArrowLeft,
  IconArrowRight,
  IconQuotationMark,
} from "@/styles/icons";

export default function LateExcuses({ className }) {
  // Typing Effect
  const [typedExcuse, setTypedExcuse] = useState("");
  const [typingTextIndex, setTypingTextIndex] = useState(0);

  const [excuseIndex, setExcuseIndex] = useState(
    Math.floor(Math.random() * LATE_EXCUSES.length)
  );
  const [excuseToDisplay, setExcuseToDisplay] = useState("");

  useEffect(() => {
    setExcuseToDisplay(LATE_EXCUSES[excuseIndex]);
    setTypedExcuse("");
    setTypingTextIndex(0);
  }, [excuseIndex]);

  useEffect(() => {
    const typeText = () => {
      if (typingTextIndex < excuseToDisplay.length) {
        setTypedExcuse((prev) => prev + excuseToDisplay[typingTextIndex]);
        setTypingTextIndex((prev) => prev + 1);
      }
    };

    const timer = setTimeout(typeText, 50);

    return () => clearTimeout(timer);
  }, [typingTextIndex, typedExcuse, excuseToDisplay]);

  const clickHandler = (direction) => {
    setExcuseIndex((prev) => {
      if (direction === 1 && prev === LATE_EXCUSES.length - 1) {
        return 0;
      }

      if (direction === -1 && prev === 0) {
        return LATE_EXCUSES.length - 1;
      }

      return prev + direction;
    });
  };

  return (
    <TitleCard
      className={`${styles["title-card"]} ${className}`}
      headerClassName={styles["title-card-header"]}
      title="EXCUSE"
    >
      <div className={styles.body}>
        <div className={styles["excuse-wrapper"]}>
          <div className={styles["quotation-mark-container"]}>
            <IconQuotationMark
              width="64px"
              height="64px"
              className={styles["quotation-mark"]}
            />
          </div>
          <div className={styles.excuse}>{typedExcuse}</div>
        </div>
        <div className={styles["arrows-container"]}>
          <IconArrowLeft
            width="32px"
            className={styles["arrow-left"]}
            onClick={() => clickHandler(-1)}
          />
          <IconArrowRight
            width="32px"
            className={styles["arrow-right"]}
            onClick={() => clickHandler(1)}
          />
        </div>
      </div>
    </TitleCard>
  );
}
