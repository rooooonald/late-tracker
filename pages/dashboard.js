import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import HeroEvent from "@/components/dashboard/hero-event";
import LateExcuses from "@/components/dashboard/late-excuses";
import CompensationReminder from "@/components/dashboard/compensation-reminder";
import CompensationInspirations from "@/components/dashboard/compensation-inspirations";
import Stats from "@/components/dashboard/stats";
import EventList from "@/components/dashboard/event-list";
import Layout from "@/components/ui/layout";
import Loader from "@/components/ui/loader";

import styles from "./dashboard.module.css";

export default function Dashboard() {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (user) => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/events/event-list/${user}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }

        setEventData(data.result);
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    };

    if (status === "authenticated") {
      fetchData(session.user.email);
    }
  }, [status]);

  const activeEventList = useMemo(() => {
    return eventData?.filter((event) => event.status === "active");
  }, [eventData]);

  const finishedEventList = useMemo(() => {
    return eventData?.filter((event) => event.status !== "active");
  }, [eventData]);

  if (status === "unauthenticated") {
    router.replace("/");
  }

  if (status === "loading" || isLoading) {
    return <Loader clockColor={styles["clock-color"]} />;
  }

  const heroEvent = activeEventList ? activeEventList[0] : null;
  const otherEvents = activeEventList ? activeEventList.slice(1) : [];

  return (
    <Layout>
      <div className={styles.wrapper}>
        <HeroEvent event={heroEvent} className={styles["hero-event"]} />
        <EventList list={otherEvents} className={styles["event-list"]} />
        <CompensationReminder
          className={styles["compensation-reminder"]}
          finishedEventList={finishedEventList}
        />
        <LateExcuses className={styles["late-excuses"]} />
        <CompensationInspirations
          className={styles["compensation-inspirations"]}
        />
        <Stats
          className={styles["stats"]}
          finishedEventList={finishedEventList}
        />
      </div>
    </Layout>
  );
}
