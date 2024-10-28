import Link from "next/link";
import styles from "./page.module.css";
import useStatuses from "@/tools/status";

export default async function Home() {
  const statuses = await useStatuses();

  return (
    <div className={styles.list}>
      <Link className={styles.status} href="https://blog.d3h1.com">
        <p>Frontend 상태</p>
        <div className={styles[statuses.frontend]} />
      </Link>
      <Link className={styles.status} href="/">
        <p>Backend 상태</p>
        <div className={styles.none} />
      </Link>
      <Link className={styles.status} href="/">
        <p>배포 상태</p>
        <div className={styles.none} />
      </Link>
      <Link className={styles.status} href="https://www.githubstatus.com">
        <p>GitHub 상태</p>
        <div className={styles[statuses.github]} />
      </Link>
      <Link className={styles.status} href="https://www.vercel-status.com">
        <p>Vercel 상태</p>
        <div className={styles[statuses.vercel]} />
      </Link>
      <Link className={styles.status} href="https://www.cloudflarestatus.com">
        <p>Cloudflare 상태</p>
        <div className={styles[statuses.cloudflare]} />
      </Link>
    </div>
  );
}
