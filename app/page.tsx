import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.list}>
      <Link className={styles.status} href="/">
        <p>Frontend 상태</p>
        <div className={styles.one} />
      </Link>
      <Link className={styles.status} href="/">
        <p>Backend 상태</p>
        <div className={styles.one} />
      </Link>
      <Link className={styles.status} href="/">
        <p>배포 상태</p>
        <div className={styles.one} />
      </Link>
      <Link className={styles.status} href="/">
        <p>GitHub 상태</p>
        <div className={styles.one} />
      </Link>
      <Link className={styles.status} href="/">
        <p>Vercel 상태</p>
        <div className={styles.one} />
      </Link>
      <Link className={styles.status} href="/">
        <p>Cloudflare 상태</p>
        <div className={styles.one} />
      </Link>
    </div>
  );
}
