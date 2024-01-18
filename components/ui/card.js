import styles from "./card.module.css";

export default function Card({ children, className, inLineStyles, onClick }) {
  const classes = `${styles.card} ${className}`;
  return (
    <div className={classes} style={inLineStyles} onClick={onClick}>
      {children}
    </div>
  );
}
