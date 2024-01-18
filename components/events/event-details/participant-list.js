import TitleCard from "@/components/ui/title-card";
import Button from "@/components/ui/button";
import NameTag from "@/components/ui/name-tag";

import styles from "./participant-list.module.css";

export default function ParticipantList({
  participants,
  isOrganizer,
  onTimeParticipants,
  onAddOnTimeParticipant,
  onEventFinished,
}) {
  return (
    <div className={styles.wrapper}>
      <TitleCard
        className={styles["title-card"]}
        headerClassName={styles["title-card-header"]}
        title={isOrganizer ? "WHO'S ON TIME?" : "PARTICIPANTS"}
      >
        <ul className={styles["participant-list"]}>
          {participants.map((participant, i) => (
            <li key={i}>
              {isOrganizer && (
                <Button
                  type="button"
                  className={
                    onTimeParticipants.includes(participant)
                      ? styles["onTime-btn"]
                      : styles["participants-btn"]
                  }
                  onClick={() => onAddOnTimeParticipant(participant)}
                >
                  <NameTag name={participant} />
                </Button>
              )}
              {!isOrganizer && <NameTag name={participant} />}
            </li>
          ))}
        </ul>
      </TitleCard>

      {isOrganizer && (
        <Button
          type="button"
          className={styles["submit-btn"]}
          onClick={onEventFinished}
        >
          EVENT FINISHED
        </Button>
      )}
    </div>
  );
}
