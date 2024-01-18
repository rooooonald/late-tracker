import Link from "next/link";

import TitleCard from "../ui/title-card";

import styles from "./all-events-item.module.css";
import {
  IconCalendar,
  IconMapPin,
  IconScissors,
  IconTime,
} from "@/styles/icons";
import timeFormatter from "@/lib/time-formatter";

export default function AllEventsItem({ event }) {
  let bodyClass, headerClass, eventStatus;
  switch (event.status) {
    case "active":
      bodyClass = styles["event-active"];
      headerClass = styles["event-active-header"];
      eventStatus = "ACTIVE";
      break;
    case "compensation":
      bodyClass = styles["event-compensation"];
      headerClass = styles["event-compensation-header"];
      eventStatus = "COMPENSATION";
      break;
    case "done":
      bodyClass = styles["event-done"];
      headerClass = styles["event-done-header"];
      eventStatus = "DONE";
      break;
    default:
      bodyClass = styles["event-active"];
      headerClass = styles["event-active-header"];
      eventStatus = "EVENT";
  }

  return (
    <Link href={`/events/${event.id}`} className={`${styles.wrapper}`}>
      <TitleCard
        className={`${styles["title-card"]} ${bodyClass}`}
        headerClassName={headerClass}
        title={eventStatus}
      >
        <div className={styles.body}>
          <h1>{event.name}</h1>

          <ul className={styles.info}>
            <li>
              <IconCalendar width="16px" /> {timeFormatter.date(event.datetime)}
            </li>
            <li>
              <IconTime width="16px" /> {timeFormatter.time(event.datetime)}
            </li>
            <li>
              <IconMapPin width="16px" /> {event.venue}
            </li>
            <li>
              <IconScissors width="16px" /> {event.compensation}
            </li>
          </ul>
        </div>
      </TitleCard>
    </Link>
  );
}
