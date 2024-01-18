import AllEventsItem from "./all-events-item";

import styles from "./all-events-list.module.css";

export default function AllEventsList({ list }) {
  return (
    <div className={styles.list}>
      {list.map((item) => (
        <AllEventsItem key={item.id} event={item} />
      ))}
    </div>
  );
}
