import { useState } from "react";
import Link from "next/link";

import Card from "@/components/ui/card";
import timeFormatter from "@/lib/time-formatter";
import Countdown from "react-countdown";
import { renderer } from "@/lib/countdown";

import styles from "./hero-event.module.css";

export default function HeroEvent({ event, className }) {
  const [timesUp, setTimesUp] = useState(false);

  const timesUpHandler = () => {
    setTimesUp(true);
  };

  if (!event) {
    return (
      <Card className={`${styles.card} ${styles.fade} ${className}`}>
        <div className={styles["quote-card"]}>
          <h1>
            "Lateness steals the irreplaceable moments from your friend's life."
          </h1>
          <p>- ChatGPT</p>
        </div>
      </Card>
    );
  }

  return (
    <Link href={`/events/${event.id}`} className={className}>
      <Card className={`${styles.card} ${styles.fade}`}>
        <div className={styles["event-heading"]}>
          <h1>{event.name}</h1>
          <div className={styles.countdown}>
            {!timesUp && <p>YOU HAVE</p>}
            <div className={styles["countdown-timer"]}>
              <Countdown
                date={event.datetime}
                renderer={renderer}
                zeroPadTime={2}
                onComplete={timesUpHandler}
              />
            </div>
            {!timesUp && <p>TO ATTEND THE EVENT</p>}
          </div>
        </div>
        <div className={styles["event-info"]}>
          <div>
            <div>
              <h2>DATE</h2> <p>{timeFormatter.date(event.datetime)}</p>
            </div>
            <div>
              <h2>TIME</h2> <p>{timeFormatter.time(event.datetime)}</p>
            </div>
          </div>
          <div>
            <div>
              <h2>VENUE</h2> <p>{event.venue}</p>
            </div>
            <div>
              <h2>COMPENSATION</h2> <p>{event.compensation}</p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
