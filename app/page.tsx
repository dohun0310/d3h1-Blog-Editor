"use client"

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

async function checkStatus(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  if (data.status.indicator === "none") {
    return styles.operational;
  }
  if (data.status.indicator === "minor") {
    return styles.warning;
  }
  if (data.status.indicator === "major" || data.status.indicator === "critical") {
    return styles.error;
  }
}

async function checkFrontendStatus() {
  const response = await fetch("https://blog.d3h1.com");
  if (response.status === 200) {
    return styles.operational;
  }
  if (response.status === 500) {
    return styles.error;
  }
}

export default function Home() {
  const [frontendStatus, setFrontendStatus] = useState<string | undefined>(undefined);
  const [cloudflareStatus, setCloudflareStatus] = useState<string | undefined>(undefined);
  const [githubStatus, setGithubStatus] = useState<string | undefined>(undefined);
  const [vercelStatus, setVercelStatus] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchStatuses() {
      const frontend = await checkFrontendStatus();
      const cloudflare = await checkStatus("https://www.cloudflarestatus.com/api/v2/status.json");
      const github = await checkStatus("https://www.githubstatus.com/api/v2/status.json");
      const vercel = await checkStatus("https://www.vercel-status.com/api/v2/status.json");

      setFrontendStatus(frontend);
      setCloudflareStatus(cloudflare);
      setGithubStatus(github);
      setVercelStatus(vercel);
    }
    fetchStatuses();
  }, []);

  return (
    <div className={styles.list}>
      <Link className={styles.status} href="https://blog.d3h1.com">
        <p>Frontend 상태</p>
        <div className={frontendStatus} />
      </Link>
      <Link className={styles.status} href="/">
        <p>Backend 상태</p>
        <div className={styles.one} />
      </Link>
      <Link className={styles.status} href="/">
        <p>배포 상태</p>
        <div className={styles.one} />
      </Link>
      <Link className={styles.status} href="https://www.githubstatus.com">
        <p>GitHub 상태</p>
        <div className={githubStatus} />
      </Link>
      <Link className={styles.status} href="https://www.vercel-status.com">
        <p>Vercel 상태</p>
        <div className={vercelStatus} />
      </Link>
      <Link className={styles.status} href="https://www.cloudflarestatus.com">
        <p>Cloudflare 상태</p>
        <div className={cloudflareStatus} />
      </Link>
    </div>
  );
}
