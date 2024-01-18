import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Button from "@/components/ui/button";
import Loading from "@/components/ui/loader";

import styles from "./index.module.css";
import { IconGoogle } from "@/styles/icons";
import TextBackground from "@/components/ui/text-background";

function HomeTitleBox() {
  const [cursorPosition, setCursorPosition] = useState({ x: 1500, y: 300 });

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateCursorPosition);

    return () => window.removeEventListener("mousemove", updateCursorPosition);
  }, []);

  const clock = (
    <div className={styles.clock}>
      <div className={styles["hour-hand"]}></div>
      <div className={styles["minute-hand"]}></div>
    </div>
  );

  return (
    <div
      className={styles.box}
      style={{
        transform: `rotateX(${50 - cursorPosition.y / 10}deg) rotateY(${
          -40 + cursorPosition.x / 20
        }deg)`,
      }}
    >
      <div className={`${styles.front} ${styles.face} `}>
        <h1>FK U,</h1> <h1>LATER!</h1>
      </div>
      <div className={`${styles.back} ${styles.face}`}></div>
      <div className={`${styles.left} ${styles.face}`}>{clock}</div>
      <div className={`${styles.right} ${styles.face}`}>{clock}</div>
      <div className={`${styles.top} ${styles.face}`}>{clock}</div>
      <div className={`${styles.bottom} ${styles.face}`}>{clock}</div>
    </div>
  );
}

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <Loading
        loaderColor={styles["loader-color"]}
        clockColor={styles["clock-color"]}
      />
    );
  }

  if (status === "authenticated") {
    router.replace("/dashboard");
  }

  if (!session) {
    return (
      <div className={styles.wrapper}>
        <HomeTitleBox title="FK U, LATER!" />
        <h2 className={styles.heading}>
          DEMAND COMPENSATION FROM LATE-COMERS.
        </h2>
        <Button
          className={styles["signin-btn"]}
          onClick={() => {
            signIn("google", { callbackUrl: "/dashboard" });
          }}
        >
          <IconGoogle width="18px" /> Sign In with Google
        </Button>

        <TextBackground
          numOfText={1500}
          className={styles["text-background"]}
        />
      </div>
    );
  }
}
