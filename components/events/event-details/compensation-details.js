import { useState, useEffect } from "react";

import TitleCard from "@/components/ui/title-card";
import Button from "@/components/ui/button";
import NameTag from "@/components/ui/name-tag";

import styles from "./compensation-details.module.css";

export default function CompensationDetails({
  event,
  onCloseEvent,
  isOrganizer,
}) {
  const [compensationDetails, setCompensationDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/compensation/${event.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCompensationDetails(data.result.compensationDetails);
        setIsLoading(false);
      });
  }, [event.id]);

  return (
    <div className={styles.wrapper}>
      <TitleCard
        className={styles["title-card"]}
        headerClassName={styles["title-card-header"]}
        title="LATE"
      >
        <div className={styles["participant-list"]}>
          {isLoading && <p>Loading ...</p>}
          {!isLoading && compensationDetails.late?.length === 0
            ? "Hooray! There were no latecomers!"
            : compensationDetails.late?.map((lateParticipant) => (
                <NameTag key={lateParticipant} name={lateParticipant} />
              ))}
        </div>
      </TitleCard>
      <TitleCard
        className={styles["title-card"]}
        headerClassName={styles["title-card-header"]}
        title="ON TIME"
      >
        <div className={styles["participant-list"]}>
          {isLoading && <p>Loading ...</p>}
          {!isLoading && compensationDetails.onTime?.length === 0
            ? "WTF! How come no one is on time?"
            : compensationDetails.onTime?.map((onTime) => (
                <div
                  key={onTime.participant}
                  className={styles["participant-tag"]}
                >
                  <NameTag key={onTime.participant} name={onTime.participant} />
                  {event.status === "compensation" &&
                    (onTime.isCompensated ? (
                      <p className={styles.compensated}>COMPENSATED</p>
                    ) : (
                      <p className={styles.uncompensated}>
                        NOT YET COMPENSATED
                      </p>
                    ))}
                </div>
              ))}
        </div>
      </TitleCard>
      {isOrganizer && event.status !== "done" && (
        <Button
          type="button"
          onClick={onCloseEvent}
          className={styles["submit-btn"]}
        >
          All COMPENSATED
        </Button>
      )}
    </div>
  );
}
