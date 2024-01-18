import { useEffect, useState } from "react";
import Link from "next/link";

import timeFormatter from "@/lib/time-formatter";
import Card from "../ui/card";

import styles from "./event-item.module.css";
import useModal from "@/hooks/use-modal";
import AddEvent from "../events/add-event";
import {
  IconCalendar,
  IconMapPin,
  IconScissors,
  IconTime,
} from "@/styles/icons";

export default function EventItem({ event, index }) {
  const [startFadeIn, setStartFadeIn] = useState(false);
  const { showModalHandler, closeModalHandler, showModal, modalContent } =
    useModal();

  // Staggered Animation
  useEffect(() => {
    const delayedMilliseconds = 100 * (index + 1);

    const timer = setTimeout(() => {
      setStartFadeIn(true);
    }, delayedMilliseconds);

    return () => clearTimeout(timer);
  }, []);

  if (!startFadeIn) {
    return;
  }

  // Empty objects passed in will be rendered as "NEW EVENT" boxes
  // If the list doesn't have enough events, it will be populated with those boxes.
  if (!event.id) {
    return (
      <>
        <Card
          className={`${styles["card-new-event"]} ${styles.fade}`}
          inLineStyles={{
            backgroundColor: `rgba(252,15,192,${0.5 / (index + 1)})`,
          }}
          onClick={() =>
            showModalHandler(<AddEvent onCloseModal={closeModalHandler} />)
          }
        >
          <div className={styles["new-event"]}>
            <p>--- NEW EVENT ---</p>
          </div>
        </Card>
        {showModal && modalContent}
      </>
    );
  }

  return (
    <Link href={`/events/${event.id}`}>
      <Card
        className={`${styles.card} ${styles.fade}`}
        inLineStyles={{
          backgroundColor: `rgba(252,15,192,${0.5 / (index + 1)})`,
        }}
      >
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
      </Card>
    </Link>
  );
}
