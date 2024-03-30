import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import Button from "../ui/button";
import TitleCard from "../ui/title-card";
import timeFormatter from "@/lib/time-formatter";

import styles from "./compensation-item.module.css";
import { IconCalendar, IconMapPin, IconTime } from "@/styles/icons";

export default function CompensationItem({ event, mode, onRefresh }) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [showEventInfo, setShowEventInfo] = useState(false);

  const { data: session } = useSession();

  const onTimeParticipantList = event.compensationDetails.onTime.map(
    (onTime) => onTime.participant
  );

  const compensatedHandler = async (participant) => {
    setIsRemoving(true);
    const res = await fetch(
      `/api/compensation/compensated/${event.id}/${participant}`,
      { method: "PUT" }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    onRefresh();
  };

  let displayMode;
  displayMode =
    mode === "owed" ||
    (mode === "history" &&
      !event.compensationDetails.late.includes(session.user.email))
      ? "on-time"
      : "late";

  return (
    <div className={`${styles.wrapper} ${isRemoving && styles.remove}`}>
      <Link href={`/events/${event.id}`}>
        <TitleCard
          className={`${styles["title-card"]} ${
            displayMode === "on-time" ? styles["on-time"] : styles.late
          }  ${isRemoving && styles.remove}`}
          headerClassName={
            displayMode === "on-time"
              ? styles["on-time-header"]
              : styles["late-header"]
          }
          title={event.name}
        >
          <div
            className={styles["compensation-wrapper"]}
            onMouseOver={() => setShowEventInfo(true)}
            onMouseOut={() => setShowEventInfo(false)}
          >
            {!showEventInfo && <h1>{event.compensation}</h1>}
            {showEventInfo && (
              <ul className={styles["event-info"]}>
                <li>
                  <IconCalendar width="16px" />{" "}
                  {timeFormatter.date(event.datetime)}
                </li>
                <li>
                  <IconTime width="16px" /> {timeFormatter.time(event.datetime)}
                </li>
                <li>
                  <IconMapPin width="16px" /> {event.venue}
                </li>
              </ul>
            )}
          </div>
        </TitleCard>
      </Link>
      {session &&
        onTimeParticipantList.includes(session.user.email) &&
        mode === "owed" && (
          <Button
            onClick={() => compensatedHandler(session.user.email)}
            className={styles.button}
          >
            <p>CLICK HERE IF COMPENSATED</p>
          </Button>
        )}
    </div>
  );
}
