import useModal from "@/hooks/use-modal";

import AddEvent from "../events/add-event";

import styles from "./no-event.module.css";
import { IconHourGlass } from "@/styles/icons";

export default function NoEvent({ mode }) {
  const { showModal, modalContent, showModalHandler, closeModalHandler } =
    useModal();

  let displayMsg, colorClass, btnClass;
  switch (mode) {
    case "owed":
      displayMsg = "There are currently no owed compensations.";
      colorClass = styles["color-owed"];
      btnClass = styles["button-owed"];
      break;
    case "due":
      displayMsg = "There are currently no due compensations.";
      colorClass = styles["color-due"];
      btnClass = styles["button-due"];
      break;
    case "history":
      displayMsg = "There are not any past compensations.";
      colorClass = styles["color-history"];
      btnClass = styles["button-history"];
      break;
    default:
      displayMsg = "There are currently no events.";
      colorClass = styles["color-events"];
      btnClass = styles["button-events"];
  }

  return (
    <>
      <div className={`${styles.wrapper} ${colorClass}`}>
        <IconHourGlass width="32px" />
        {displayMsg}
        <button
          className={btnClass}
          onClick={() =>
            showModalHandler(<AddEvent onCloseModal={closeModalHandler} />)
          }
        >
          ADD EVENT
        </button>
      </div>
      {showModal && modalContent}
    </>
  );
}
