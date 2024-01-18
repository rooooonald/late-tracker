import styles from "./countdown.module.css";

const Completed = () => {
  return (
    <>
      <p>TIME'S UP! </p>
      <p>ARE YOU LATE?</p>
    </>
  );
};

export const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <Completed />;
  } else {
    return (
      <p className={days === 0 && hours < 1 ? styles.warning : null}>
        {days === 0 ? "" : `${days}d`} {hours >= 10 ? hours : `0${hours}`}h{" "}
        {minutes >= 10 ? minutes : `0${minutes}`}m{" "}
        {seconds >= 10 ? seconds : `0${seconds}`}s
      </p>
    );
  }
};
