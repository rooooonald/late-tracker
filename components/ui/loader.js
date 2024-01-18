import styles from "./loader.module.css";

export default function Loader({ clockColor }) {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.clock} ${clockColor}`}>
        <div className={`${styles["hour-hand"]} ${clockColor}`}></div>
        <div className={`${styles["minute-hand"]} ${clockColor}`}></div>
      </div>
    </div>
  );
}
