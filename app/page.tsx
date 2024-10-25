import styles from "./page.module.css";

import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <main className={styles.main}>
      <Sidebar />
    </main>
  );
}
