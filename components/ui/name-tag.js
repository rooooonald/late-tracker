import styles from "./name-tag.module.css";
import { IconParticipant } from "@/styles/icons";

export default function NameTag({ name }) {
  return (
    <div className={styles.wrapper}>
      <IconParticipant width="20px" /> <p className={styles.name}>{name}</p>
    </div>
  );
}
