import { useEffect, useState } from "react";
import styles from "./title-box.module.css";

export default function TitleBox({ title, compensation, boxStyle }) {
  const [cursorPosition, setCursorPosition] = useState({ x: 1500, y: 300 });

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateCursorPosition);

    return () => window.removeEventListener("mousemove", updateCursorPosition);
  }, []);

  return (
    <div
      className={`${styles.box} ${boxStyle?.margin}`}
      style={{
        transform: `rotateX(${50 - cursorPosition.y / 10}deg) rotateY(${
          -40 + cursorPosition.x / 20
        }deg)`,
      }}
    >
      <div
        className={`${styles.front} ${styles.face} ${boxStyle.faceColor} ${boxStyle.borderColor}`}
      >
        <h1>{title}</h1>
        {compensation && (
          <div className={styles.remarks}>
            <p>COMPENSATION</p>
            <h2>{compensation}</h2>
          </div>
        )}
      </div>
      <div
        className={`${styles.back} ${styles.face} ${boxStyle.borderColor}`}
      ></div>
      <div
        className={`${styles.left} ${styles.face} ${boxStyle.borderColor}`}
      ></div>
      <div
        className={`${styles.right} ${styles.face} ${boxStyle.borderColor}`}
      ></div>
      <div
        className={`${styles.top} ${styles.face} ${boxStyle.borderColor}`}
      ></div>
      <div
        className={`${styles.bottom} ${styles.face} ${boxStyle.borderColor}`}
      ></div>
    </div>
  );
}
