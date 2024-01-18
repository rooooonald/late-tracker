import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";

import Layout from "@/components/ui/layout";
import TitleBox from "@/components/ui/title-box";
import AllEventsList from "@/components/events/all-events-list";
import Loader from "@/components/ui/loader";

import styles from "./index.module.css";
import NoEvent from "@/components/ui/no-event";

export default function EventPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [allEventsList, setAllEventsList] = useState([]);

  const { data: session, status } = useSession();

  useEffect(() => {
    const getEventList = async (user) => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/events/event-list/${user}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }

        setAllEventsList(data.result);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    if (status === "authenticated") {
      getEventList(session.user.email);
    }
  }, [session, status]);

  const sortedList = useMemo(() => {
    const activeEvents = allEventsList.filter(
      (event) => event.status === "active"
    );
    const compensationEvents = allEventsList.filter(
      (event) => event.status === "compensation"
    );
    const doneEvents = allEventsList.filter((event) => event.status === "done");
    return [...activeEvents, ...compensationEvents, ...doneEvents];
  }, [allEventsList]);

  return (
    <Layout>
      <Head>
        <title>EVENTS - FK U, LATER!</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <TitleBox
            title="EVENTS"
            boxStyle={{
              borderColor: styles["box-border-color"],
              faceColor: styles["box-face-color"],
              margin: styles["box-margin"],
            }}
          />
        </div>

        <div className={styles.list}>
          {isLoading && <Loader clockColor={styles["clock-color"]} />}
          {!isLoading && <AllEventsList list={sortedList} />}
          {!isLoading && sortedList.length === 0 && <NoEvent />}
        </div>
      </div>
    </Layout>
  );
}
