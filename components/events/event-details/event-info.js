import TitleCard from "@/components/ui/title-card";
import timeFormatter from "@/lib/time-formatter";

import styles from "./event-info.module.css";

export default function EventInfo({ event }) {
  return (
    <TitleCard
      className={styles["title-card"]}
      headerClassName={styles["title-card-header"]}
      title="INFO"
    >
      <div className={styles.info}>
        <div>
          <h2>ORGANIZER</h2> <p>{event.organizer}</p>
        </div>
        <div>
          <h2>DATE</h2> <p>{timeFormatter.date(event.datetime)}</p>
        </div>
        <div>
          <h2>TIME</h2> <p>{timeFormatter.time(event.datetime)}</p>
        </div>
        <div>
          <h2>VENUE</h2> <p>{event.venue}</p>
        </div>
      </div>
    </TitleCard>
  );
}
