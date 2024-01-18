import CompensationItem from "./compensation-item";

import styles from "./compensation-list.module.css";

export default function CompensationList({ list, mode, onRefresh }) {
  return (
    <div className={styles.list}>
      {list.map((item) => (
        <CompensationItem
          key={item.id}
          event={item}
          mode={mode}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
}
