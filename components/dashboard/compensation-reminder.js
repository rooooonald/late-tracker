import Link from "next/link";
import { useSession } from "next-auth/react";

import TitleCard from "../ui/title-card";

import styles from "./compensation-reminder.module.css";
import { IconBroom } from "@/styles/icons";

export default function CompensationReminder({ className, finishedEventList }) {
  const { data: session } = useSession();

  // Events that are in "compensation" stage in which you are due to compensate or not yet compensated are listed.
  const compensationEvents = finishedEventList.filter(
    (event) =>
      event.status === "compensation" &&
      (event.compensationDetails.onTime.some(
        (onTime) =>
          onTime.participant === session.user.email && !onTime.isCompensated
      ) ||
        event.compensationDetails.late.includes(session.user.email))
  );

  const hasCompensationEvents = compensationEvents.length !== 0;

  return (
    <TitleCard
      className={`${styles["title-card"]} ${className}`}
      headerClassName={styles["title-card-header"]}
      title="REMINDER"
    >
      {!hasCompensationEvents && (
        <div className={styles["no-compensation"]}>
          <IconBroom width="32px" className={styles["no-compensation-icon"]} />
          <p className={styles["no-compensation-text"]}>
            No compensation owed or due.
          </p>
        </div>
      )}

      {hasCompensationEvents && (
        <div className={styles["compensation-list"]}>
          {compensationEvents.map((event) => (
            <Link
              href={`/events/${event.id}`}
              key={event.id}
              className={styles["compensation-tag"]}
            >
              <div className={styles["compensation-status"]}>
                {event.compensationDetails.late.includes(session.user.email)
                  ? "DUE"
                  : "OWED"}
              </div>
              <div className={styles["compensation-item"]}>
                {event.compensation}
              </div>
            </Link>
          ))}
        </div>
      )}
    </TitleCard>
  );
}
