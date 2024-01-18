import Head from "next/head";
import { SessionProvider } from "next-auth/react";

import "@/styles/globals.css";
import { gugi } from "@/styles/fonts";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/ui/loader";

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const start = () => {
      setIsLoading(true);
    };
    const end = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <main className={gugi.variable}>
      <SessionProvider>
        <Head>
          <title>FK U, LATER!</title>
          <link rel="shortcut icon" href="/logo.svg" />
        </Head>
        {isLoading ? <Loader /> : <Component {...pageProps} />}
      </SessionProvider>
    </main>
  );
}
