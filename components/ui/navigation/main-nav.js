import useModal from "@/hooks/use-modal";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

import AddEvent from "../../events/add-event";
import MainNavButton from "./main-nav-button";
import TextBackground from "../text-background";

import styles from "./main-nav.module.css";
import {
  IconAngry,
  IconCalendarDays,
  IconCalendarPlus,
  IconDashBoard,
  IconSignIn,
  IconSignOut,
} from "@/styles/icons";

export default function MainNav() {
  const { data: session } = useSession();
  const router = useRouter();

  const { showModal, modalContent, showModalHandler, closeModalHandler } =
    useModal();

  return (
    <nav className={styles.nav}>
      {session ? (
        <MainNavButton
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
          description="Sign Out"
        >
          <IconSignOut width="32" className={styles["nav-btn-icon"]} />
        </MainNavButton>
      ) : (
        <MainNavButton
          onClick={() => {
            signIn("google");
          }}
          description="Sign In"
        >
          <IconSignIn width="32" className={styles["nav-btn-icon"]} />
        </MainNavButton>
      )}

      <MainNavButton
        onClick={() => router.push("/dashboard")}
        description="Dashboard"
      >
        <IconDashBoard width="32" className={styles["nav-btn-icon"]} />
      </MainNavButton>

      <MainNavButton
        onClick={() => router.push("/events")}
        description="All Events"
      >
        <IconCalendarDays width="32" className={styles["nav-btn-icon"]} />
      </MainNavButton>

      <MainNavButton
        onClick={() => router.push("/compensation")}
        description="Compensation"
      >
        <IconAngry width="32" className={styles["nav-btn-icon"]} />
      </MainNavButton>

      <MainNavButton
        onClick={() =>
          showModalHandler(<AddEvent onCloseModal={closeModalHandler} />)
        }
        description="Add Event"
      >
        <IconCalendarPlus width="32" className={styles["nav-btn-icon"]} />
      </MainNavButton>
      {showModal && modalContent}

      <TextBackground numOfText={20} className={styles["nav-background"]} />
    </nav>
  );
}
