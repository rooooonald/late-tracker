import styles from "./nav-description.module.css";

export default function NavDescription({ description }) {
  return <div className={styles["description-box"]}>{description}</div>;
}
