import EventItem from "./event-item";

import styles from "./event-list.module.css";

export default function EventList({ list, className }) {
  // If the event list is long enough, populate it with empty objects
  // Those empty objects will then be rendered as "NEW EVENT" boxes
  const defaultList = [...list];
  if (list.length < 7) {
    for (let i = 0; i < 7 - list.length; i++) {
      defaultList.push({});
    }
  }

  const selectedList = list.length < 7 ? defaultList : list;

  return (
    <div className={`${className} ${styles.list}`}>
      {selectedList.map((event, i) => (
        <EventItem key={event.id || i} event={event} index={i} />
      ))}
    </div>
  );
}
