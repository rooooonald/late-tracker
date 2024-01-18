import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

import connectToDB from "@/lib/db";

import EventDetails from "@/components/events/event-details/event-details";
import Layout from "@/components/ui/layout";
import TitleBox from "@/components/ui/title-box";
import Loader from "@/components/ui/loader";

import styles from "./event.module.css";

export default function EventPage({ event }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Loader clockColor={styles["clock-color"]} />;
  }

  if (status === "unauthenticated") {
    router.replace("/");
  }

  if (!event.participants.includes(session?.user.email)) {
    router.replace("/dashboard");
  }

  return (
    <Layout>
      <Head>
        <title>{event.name} - FK U, LATER!</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <TitleBox
            title={event.name}
            compensation={event.compensation}
            boxStyle={{
              borderColor: styles["box-border-color"],
              faceColor: styles["box-face-color"],
              margin: styles["box-margin"],
            }}
          />
        </div>

        <EventDetails event={event} className={styles.info} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const eventId = context.params.eventId;

  let client;
  try {
    client = await connectToDB();
  } catch (err) {
    console.log("Error connecting to database.");
  }

  let result;
  try {
    const db = client.db("late-tracker");
    result = await db.collection("events").findOne({ id: eventId });
  } catch (err) {
    console.log("Error finding events.");
  }
  client.close();

  return {
    props: {
      event: JSON.parse(JSON.stringify(result)),
    },
  };
}
