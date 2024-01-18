import MainNav from "./navigation/main-nav";

import styles from "./layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <MainNav />
      {children}
    </>
  );
}
