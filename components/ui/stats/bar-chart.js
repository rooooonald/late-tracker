import { useEffect, useRef, useState } from "react";

import styles from "./bar-chart.module.css";

export default function BarChart({ percentage, className }) {
  const [barHeight, setBarHeight] = useState(0);

  const barRef = useRef();

  useEffect(() => {
    setBarHeight(barRef.current.clientHeight);
  }, []);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {percentage <= 50 && (
        <p className={styles.percentage}>{percentage.toFixed(1)}%</p>
      )}
      <div
        ref={barRef}
        className={styles.bar}
        style={{ height: `${percentage}%` }}
      >
        {percentage > 50 && (
          <p className={styles.percentage}>{percentage.toFixed(1)}%</p>
        )}
      </div>
    </div>
  );
}
