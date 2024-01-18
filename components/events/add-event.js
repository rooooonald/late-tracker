import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useInput from "@/hooks/use-input";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Card from "../ui/card";
import TitleCard from "../ui/title-card";
import {
  checkEmptyInput,
  validateDate,
  validateParticipant,
} from "@/lib/add-event-validation";

import { P_SUGGESTION } from "@/data/compensation-suggestions-data";

import styles from "./add-event.module.css";

export default function AddEvent({ onCloseModal }) {
  const { data: session, status } = useSession();

  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [compensationSuggestion] = useState(P_SUGGESTION(7));
  const [noParticipants, setNoParticipants] = useState(false);

  const router = useRouter();

  const {
    value: enteredOrganizer,
    isValid: organizerIsValid,
    setValueHandler: setOrganizerHandler,
  } = useInput(checkEmptyInput);

  const {
    value: enteredEventName,
    isValid: eventNameIsValid,
    errorMsg: eventNameErrorMsg,
    changeValueHandler: changeEventNameHandler,
    onBlurHandler: onBlurEventNameHandler,
  } = useInput(checkEmptyInput);

  const {
    value: enteredDate,
    isValid: dateIsValid,
    errorMsg: dateErrorMsg,
    changeValueHandler: changeDateHandler,
    onBlurHandler: onBlurDateHandler,
  } = useInput(validateDate);

  const {
    value: enteredVenue,
    isValid: venueIsValid,
    errorMsg: venueErrorMsg,
    changeValueHandler: changeVenueHandler,
    onBlurHandler: onBlurVenueHandler,
  } = useInput(checkEmptyInput);

  const {
    value: enteredParticipant,
    isValid: participantIsValid,
    errorMsg: participantErrorMsg,
    changeValueHandler: changeParticipantHandler,
    onBlurHandler: onBlurParticipantHandler,
    resetHandler: resetParticipantHandler,
  } = useInput(validateParticipant, session.user.email);

  const {
    value: enteredCompensation,
    isValid: compensationIsValid,
    errorMsg: compensationErrorMsg,
    changeValueHandler: changeCompensationHandler,
    setValueHandler: setCompensationHandler,
    onBlurHandler: onBlurCompensationHandler,
  } = useInput(checkEmptyInput);

  useEffect(() => {
    if (status === "authenticated") {
      setOrganizerHandler(session.user.email);
    }
  }, [status]);

  const addParticipantsHandler = (participant) => {
    if (!participantIsValid) {
      return;
    }

    if (!participants.includes(participant)) {
      setParticipants((prev) => [...prev, participant]);
      resetParticipantHandler();
      setNoParticipants(false);
    } else {
      return;
    }
  };

  const removeParticipantHandler = (participant) => {
    setParticipants((prev) => prev.filter((p) => p !== participant));
  };

  const addEventHandler = async (dataBody) => {
    setIsLoading(true);
    const res = await fetch("/api/events/add-event", {
      method: "POST",
      body: JSON.stringify(dataBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed adding event");
    }

    setIsLoading(false);
    onCloseModal();

    router.push(`/events/${data.eventId}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (participants.length === 0) {
      setNoParticipants(true);
      return;
    }

    if (
      organizerIsValid &&
      eventNameIsValid &&
      dateIsValid &&
      venueIsValid &&
      compensationIsValid &&
      participants.length !== 0
    ) {
      const userInput = {
        name: enteredEventName,
        organizer: enteredOrganizer,
        datetime: enteredDate,
        participants: [...participants, enteredOrganizer],
        venue: enteredVenue,
        compensation: enteredCompensation,
      };

      addEventHandler(userInput);
    }
  };

  return (
    <TitleCard
      className={styles["title-card"]}
      headerClassName={styles["title-card-header"]}
      title="NEW EVENT"
    >
      <form className={styles.form} onSubmit={submitHandler}>
        <Card className={`${styles.card} ${styles["panel-1"]}`}>
          <Input
            label="ORGANIZER"
            id="event-organizer"
            input={{
              type: "text",
              disabled: true,
            }}
            className={{ input: styles.input, label: styles.label }}
            value={enteredOrganizer}
          />

          <Input
            label="EVENT NAME"
            id="event-name"
            input={{ type: "text" }}
            className={{ input: styles.input, label: styles.label }}
            onChange={changeEventNameHandler}
            onBlur={onBlurEventNameHandler}
            value={enteredEventName}
            error={eventNameErrorMsg}
          />

          <Input
            label="DATE"
            id="event-date"
            input={{ type: "datetime-local" }}
            className={{ input: styles.input, label: styles.label }}
            onChange={changeDateHandler}
            onBlur={onBlurDateHandler}
            value={enteredDate}
            error={dateErrorMsg}
          />

          <Input
            label="VENUE"
            id="venue"
            input={{ type: "text" }}
            className={{ input: styles.input, label: styles.label }}
            onChange={changeVenueHandler}
            onBlur={onBlurVenueHandler}
            value={enteredVenue}
            error={venueErrorMsg}
          />
        </Card>

        <Card className={`${styles.card} ${styles["panel-2"]}`}>
          <div className={styles["participant-input-group"]}>
            <div className={styles["participant-name-input"]}>
              <Input
                label="PARTICIPANTS"
                id="participants"
                input={{ type: "text" }}
                className={{ input: styles.input, label: styles.label }}
                onChange={changeParticipantHandler}
                onBlur={onBlurParticipantHandler}
                value={enteredParticipant}
                error={participantErrorMsg || noParticipants}
              />
            </div>
            <Button
              type="button"
              className={`${styles["participant-input-btn"]} ${
                (participantErrorMsg || noParticipants) && styles["error-btn"]
              }`}
              onClick={() => addParticipantsHandler(enteredParticipant)}
            >
              +
            </Button>
          </div>
          {noParticipants && (
            <p className={styles["error-text"]}>
              Please invite at least one participant.
            </p>
          )}

          {participants.map((participant, i) => (
            <div key={i} className={styles["participant-tag"]}>
              <div className={styles["participant-name"]}>
                <p>{participant}</p>
              </div>
              <div>
                <Button
                  type="button"
                  className={styles["remove-btn"]}
                  onClick={() => removeParticipantHandler(participant)}
                >
                  -
                </Button>
              </div>
            </div>
          ))}
        </Card>

        <div className={styles["panel-3"]}>
          <Card className={styles.compensation}>
            <Input
              label="COMPENSATION"
              id="compensation"
              input={{ type: "text" }}
              className={{ input: styles.input, label: styles.label }}
              onChange={changeCompensationHandler}
              onBlur={onBlurCompensationHandler}
              value={enteredCompensation}
              error={compensationErrorMsg}
            />

            <div className={styles["suggestion-list"]}>
              {compensationSuggestion.map((suggestion, i) => (
                <Button
                  key={i}
                  type="button"
                  className={styles["suggestion-btn"]}
                  onClick={() => setCompensationHandler(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </Card>
          <Button className={styles["submit-btn"]}>
            {isLoading ? "ADDING ..." : "ADD EVENT"}
          </Button>
        </div>
      </form>
    </TitleCard>
  );
}
