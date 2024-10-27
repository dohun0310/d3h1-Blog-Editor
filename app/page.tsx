"use client"

import Link from "next/link";
import styles from "./page.module.css";
import useStatuses from "@/tools/status";

export default function Home() {
  const { frontend, cloudflare, github, vercel } = useStatuses();

  return (
    <div className={styles.list}>
      <Link className={styles.status} href="https://blog.d3h1.com">
        <p>Frontend 상태</p>
        <div className={styles[frontend]} />
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
        <div className={styles[github]} />
      </Link>
      <Link className={styles.status} href="/">
        <p>Vercel 상태</p>
        <div className={styles[vercel]} />
      </Link>
      <Link className={styles.status} href="/">
        <p>Cloudflare 상태</p>
        <div className={styles[cloudflare]} />
      </Link>
    </div>
  );
}
