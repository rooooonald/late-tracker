export default function TextBackground({ numOfText, className }) {
  return (
    <div className={className}>
      <p>{"FK U LATER ".repeat(numOfText)}</p>
    </div>
  );
}
