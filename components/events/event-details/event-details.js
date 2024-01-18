import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import CompensationDetails from "./compensation-details";
import EventInfo from "./event-info";
import ParticipantList from "./participant-list";
import TitleCard from "@/components/ui/title-card";

import styles from "./event-details.module.css";

export default function EventDetails({ event, className }) {
  const [onTimeParticipants, setOnTimeParticipants] = useState([]);
  const router = useRouter();

  const { data: session } = useSession();

  const updateEventStatusHandler = async () => {
    const res = await fetch(`/api/events/${event.id}`, {
      method: "PUT",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
  };

  const updateCompensationStatusHandler = async () => {
    const res = await fetch(`/api/compensation/${event.id}`, {
      method: "PUT",
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
  };

  const closeEventHandler = async () => {
    try {
      updateEventStatusHandler();
      updateCompensationStatusHandler();
      router.push("/events");
    } catch (err) {
      console.log(err.message);
    }
  };

  const addOnTimeParticipantHandler = (selectedParticipant) => {
    if (!onTimeParticipants.includes(selectedParticipant)) {
      setOnTimeParticipants((prev) => [...prev, selectedParticipant]);
    } else {
      setOnTimeParticipants((prev) =>
        prev.filter((participant) => participant !== selectedParticipant)
      );
    }
  };

  const addCompensationHandler = async (dataBody) => {
    const res = await fetch(`/api/compensation/${event.id}`, {
      method: "POST",
      body: JSON.stringify(dataBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong!");
    }

    router.push("/dashboard");
  };

  const eventFinishedHandler = (e) => {
    e.preventDefault();

    const lateParticipants = event.participants.filter(
      (participant) => !onTimeParticipants.includes(participant)
    );

    const onTime = onTimeParticipants.map((participant) => ({
      participant,
      isCompensated: false,
    }));

    const compensationDetails = {
      onTime,
      late: lateParticipants,
    };

    addCompensationHandler(compensationDetails);
  };

  const isOrganizer = event.organizer === session?.user.email;

  let statusTitle;
  switch (event.status) {
    case "active":
      statusTitle = "EVENT IS ACTIVE";
      break;
    case "compensation":
      statusTitle = "EVENT IS IN COMPENSATION STAGE";
      break;
    case "done":
      statusTitle = "EVENT IS CLOSED";
      break;
    default:
      statusTitle = `YOU ARE ${
        isOrganizer ? "THE ORGANIZER" : "A PARTICIPANT"
      } OF THE EVENT`;
  }

  let introContent;
  if (isOrganizer) {
    switch (event.status) {
      case "active":
        introContent = (
          <p>
            <span>YOU ARE THE ORGANIZER.</span> Once the event wraps up, select
            the punctual stars and hit the 'EVENT FINISHED' button! Latecomers
            will have to complete the compensation - {event.compensation}!
          </p>
        );
        break;
      case "compensation":
        introContent = (
          <p>
            <span>YOU ARE THE ORGANIZER.</span> Once every punctual participant
            has been compensated, hit that "ALL COMPENSATED" button to
            officially wrap up the event!
          </p>
        );
        break;

      case "done":
        introContent = (
          <p>
            Big shoutout for putting together this awesome event! Fingers
            crossed for a punctuality party next time – no latecomers allowed!
          </p>
        );
        break;
    }
  } else {
    switch (event.status) {
      case "active":
        introContent = (
          <p>
            Once the event wraps up, the organizer will determine the punctual
            stars! Latecomers, brace yourselves for the compensation -{" "}
            {event.compensation}!
          </p>
        );
        break;
      case "compensation":
        introContent = event.compensationDetails.late.includes(
          session?.user.email
        ) ? (
          <p>
            Attention, fking latecomer! Hold on tight because the reckoning is
            upon you – prepare to face the punishment - {event.compensation}!
          </p>
        ) : (
          <p>
            Well done, champ! Your punctuality doesn't go unnoticed. In the
            event that somebody is late, you'll be rewarded for your valuable
            time by none other than those fking latecomers!
          </p>
        );
        break;

      case "done":
        introContent = (
          <p>
            Big shoutout for participating this awesome event! Fingers crossed
            for a punctuality party next time – no latecomers allowed!
          </p>
        );
        break;
    }
  }

  return (
    <div className={`${className} ${styles.wrapper}`}>
      <TitleCard
        className={styles["title-card"]}
        headerClassName={styles["title-card-header"]}
        title={statusTitle}
      >
        {introContent}
      </TitleCard>
      <div className={styles["event-section"]}>
        <EventInfo event={event} />
        {event.status === "active" && (
          <ParticipantList
            participants={event.participants}
            isOrganizer={isOrganizer}
            onTimeParticipants={onTimeParticipants}
            onEventFinished={eventFinishedHandler}
            onAddOnTimeParticipant={addOnTimeParticipantHandler}
          />
        )}
        {event.status !== "active" && (
          <CompensationDetails
            event={event}
            onCloseEvent={closeEventHandler}
            isOrganizer={isOrganizer}
          />
        )}
      </div>
    </div>
  );
}
