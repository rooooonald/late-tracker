import styles from "./button.module.css";

export default function Button({
  type,
  children,
  className,
  style,
  onClick,
  onMouseOver,
  onMouseOut,
}) {
  const classes = `${styles.button} ${className} `;
  return (
    <button
      type={type}
      className={classes}
      style={style}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {children}
    </button>
  );
}
