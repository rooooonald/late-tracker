import { useEffect, useState } from "react";

import { P_SUGGESTION } from "@/data/compensation-suggestions-data";

import TitleCard from "../ui/title-card";

import styles from "./compensation-inspirations.module.css";

export default function CompensationInspirations({ className }) {
  const [compensationSuggestion, setCompensationSuggestion] = useState([]);

  useEffect(() => {
    const selectedSuggestion = P_SUGGESTION(7);
    setCompensationSuggestion(selectedSuggestion);
  }, []);

  return (
    <TitleCard
      className={`${styles["title-card"]} ${className}`}
      headerClassName={styles["title-card-header"]}
      title="NEED INSPIRATION FOR COMPENSATION?"
    >
      <div className={styles.container}>
        <div className={styles["suggestion-item-panel"]}>
          {`${compensationSuggestion.join(" - ")} - `.repeat(100)}
        </div>
      </div>
    </TitleCard>
  );
}
