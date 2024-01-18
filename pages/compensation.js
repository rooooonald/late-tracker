import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useSession } from "next-auth/react";

import CompensationList from "@/components/compensation/compensation-list";
import Layout from "@/components/ui/layout";
import TitleBox from "@/components/ui/title-box";
import Loader from "@/components/ui/loader";
import Button from "@/components/ui/button";
import TitleCard from "@/components/ui/title-card";
import NoEvent from "@/components/ui/no-event";

import styles from "./compensation.module.css";

export default function CompensationPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [mode, setMode] = useState("owed");
  const [compensationList, setCompensationList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCompensationList = async (participant) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/compensation/compensation-list/${participant}`
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }

      setCompensationList(data.result);
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchCompensationList(session.user.email);
    }
  }, [status]);

  if (status === "unauthenticated") {
    router.replace("/");
  }

  const refreshListHandler = () => {
    fetchCompensationList(session.user.email);
  };

  let selectedList, instructionHeading, instructionContent;
  switch (mode) {
    case "due":
      // Events that are in "compensation" stage and that you are due to compensate are listed.
      selectedList = compensationList.filter(
        (event) =>
          event.compensationDetails.late.includes(session.user.email) &&
          event.status === "compensation"
      );
      instructionHeading = `DUE TO COMPENSATE FOR ${selectedList.length} EVENT${
        selectedList.length === 1 ? "" : "S"
      }`;
      instructionContent =
        "Keep in mind, being late comes with its consequences. Don't drag your feet on compensating – you're already late for the event, so let's not make others wait for your compensation!";
      break;
    case "owed":
      // Events that are in "compensation" stage and that you are NOT YET compensated are listed.
      selectedList = compensationList.filter(
        (event) =>
          event.compensationDetails.onTime.some(
            (onTime) =>
              onTime.participant === session.user.email && !onTime.isCompensated
          ) && event.status === "compensation"
      );
      instructionHeading = `OWED ${selectedList.length} COMPENSATION${
        selectedList.length === 1 ? "" : "S"
      }`;
      instructionContent =
        "That's your reward for being punctual! If you reckon you're sufficiently compensated by the latecomers, hit that \"COMPENSATED\" button!";
      break;
    case "history":
      // Events that are "done" or that you are already compensated are listed.
      selectedList = compensationList.filter(
        (event) =>
          event.status === "done" ||
          event.compensationDetails.onTime.some(
            (onTime) =>
              onTime.participant === session.user.email && onTime.isCompensated
          )
      );
      instructionHeading = `COMPENSATIONS FOR PAST EVENTS`;
      instructionContent =
        "Moving forward, there's only one way to go - Reward punctuality and penalize tardiness.";
      break;
  }

  const modeIsDue = mode === "due";

  return (
    <Layout>
      <Head>
        <title>COMPENSATION - FK U, LATER!</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <TitleBox
            title="COMPENSATION"
            boxStyle={{
              borderColor: modeIsDue
                ? styles["box-border-color-due"]
                : styles["box-border-color"],
              faceColor: modeIsDue
                ? styles["box-face-color-due"]
                : styles["box-face-color"],
              margin: styles["box-margin"],
            }}
          />
        </div>

        <nav
          className={styles.nav}
          style={{
            backgroundColor:
              mode === "due" ? "var(--fourth-color)" : "var(--third-color)",
          }}
        >
          <Button
            className={`${mode === "owed" ? styles["nav-active"] : ""} ${
              styles["nav-btn"]
            }`}
            onClick={() => setMode("owed")}
          >
            <p>OWED</p>
          </Button>
          <Button
            className={`${mode === "due" ? styles["nav-active"] : ""} ${
              styles["nav-btn"]
            }`}
            onClick={() => setMode("due")}
          >
            <p>DUE</p>
          </Button>
          <Button
            className={`${mode === "history" ? styles["nav-active"] : ""} ${
              styles["nav-btn"]
            }`}
            onClick={() => setMode("history")}
          >
            <p>HISTORY</p>
          </Button>
        </nav>

        <TitleCard
          className={
            modeIsDue ? styles["title-card-due"] : styles["title-card"]
          }
          headerClassName={
            modeIsDue
              ? styles["title-card-header-due"]
              : styles["title-card-header"]
          }
          title={instructionHeading}
        >
          <p>{instructionContent}</p>
        </TitleCard>

        <div className={styles.list}>
          {isLoading && (
            <Loader
              clockColor={
                modeIsDue ? styles["clock-color-due"] : styles["clock-color"]
              }
            />
          )}
          {!isLoading && (
            <CompensationList
              list={selectedList}
              mode={mode}
              onRefresh={refreshListHandler}
            />
          )}

          {!isLoading && selectedList.length === 0 && <NoEvent mode={mode} />}
        </div>
      </div>
    </Layout>
  );
}
