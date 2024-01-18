import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

import styles from "./modal.module.css";
import { gugi } from "@/styles/fonts";

function Backdrop({ onClick }) {
  return <div className={styles.backdrop} onClick={onClick}></div>;
}

function ModalOverlay({ children }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.modal} ${gugi.className}`}>
      {showContent && children}
    </div>
  );
}

export default function Modal({ children, onClick }) {
  return ReactDOM.createPortal(
    <>
      <Backdrop onClick={onClick} />
      <ModalOverlay>{children}</ModalOverlay>
    </>,
    document.getElementById("modal")
  );
}
