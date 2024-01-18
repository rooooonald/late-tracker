import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import TitleCard from "../ui/title-card";
import BarChart from "../ui/stats/bar-chart";

import styles from "./stats.module.css";
import { IconData } from "@/styles/icons";

export default function Stats({ className, finishedEventList }) {
  const { data: session } = useSession();
  const [statIndex, setStatIndex] = useState(0);

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 3);
    setStatIndex(randomNum);
  }, []);

  const lateEvent = finishedEventList.filter((event) =>
    event.compensationDetails?.late.includes(session.user.email)
  );

  const noCompensationEvent = finishedEventList.filter(
    (event) =>
      event.status === "done" && event.compensationDetails.late.length === 0
  );

  const totalEventsNum = finishedEventList.length;
  const lateNum = lateEvent.length;
  const onTimeNum = totalEventsNum - lateNum;
  const latePercentage = (lateNum / totalEventsNum) * 100;
  const onTimePercentage = (onTimeNum / totalEventsNum) * 100;
  const noCompensationNum = noCompensationEvent.length;
  const noCompensationPercentage =
    (noCompensationEvent.length / totalEventsNum) * 100;

  let statsContent;
  if (finishedEventList.length === 0) {
    statsContent = (
      <div className={styles["no-stats"]}>
        <IconData width="32px" className={styles["no-stats-icon"]} />
        <p className={styles["no-stats-text"]}>No stats available.</p>
      </div>
    );
  } else {
    switch (statIndex) {
      case 0:
        statsContent = (
          <div className={styles["stats-container"]}>
            <div className={styles["stat-text"]}>
              # of times you're LATE{" "}
              <span className={styles.number}>{lateNum}</span>
            </div>
            <BarChart
              className={styles["bar-chart"]}
              percentage={latePercentage}
            />
          </div>
        );
        break;
      case 1:
        statsContent = (
          <div className={styles["stats-container"]}>
            <div className={styles["stat-text"]}>
              # of times you're PUNCTUAL{" "}
              <span className={styles.number}>{onTimeNum}</span>
            </div>

            <BarChart
              className={styles["bar-chart"]}
              percentage={onTimePercentage}
            />
          </div>
        );
        break;

      case 2:
        statsContent = (
          <div className={styles["stats-container"]}>
            <div className={styles["stat-text"]}>
              # of times everyone is PUNCTUAL{" "}
              <span className={styles.number}>{noCompensationNum}</span>
            </div>

            <BarChart
              className={styles["bar-chart"]}
              percentage={noCompensationPercentage}
            />
          </div>
        );
        break;
      default:
        statsContent = (
          <div className={styles["no-stats"]}>
            <IconData width="32px" className={styles["no-stats-icon"]} />
            <p className={styles["no-stats-text"]}>No stats available.</p>
          </div>
        );
    }
  }

  return (
    <TitleCard
      className={`${styles["title-card"]} ${className}`}
      headerClassName={styles["title-card-header"]}
      title="STATS"
    >
      {statsContent}
    </TitleCard>
  );
}
