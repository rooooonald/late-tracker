import styles from "./title-card.module.css";

export default function TitleCard({
  children,
  className,
  inLineStyles,
  headerClassName,
  title,
}) {
  const classes = `${styles["title-card"]} ${className}`;
  const headerClasses = `${styles["title-card-header"]} ${headerClassName}`;
  return (
    <div className={classes} style={inLineStyles}>
      <div className={headerClasses}>
        <p>{title}</p>
        <div className={styles.box}></div>
      </div>
      {children}
    </div>
  );
}
