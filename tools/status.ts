import { useEffect, useState } from "react";

export async function fetchStatus(url: string) {
  const response = await fetch(url);
  const data = await response.json();

  if (data.status.indicator === "none") {
    return "operational";
  } else if (data.status.indicator === "minor") {
    return "warning";
  } else if (data.status.indicator === "major" || data.status.indicator === "critical") {
    return "error";
  } else {
    return "error";
  }
}
  
export async function fetchHttpStatus(url: string) {
  const response = await fetch(url);

  return response.status === 200 ? "operational" : "error";
}

export default function useStatuses() {
  const [statuses, setStatuses] = useState<{
    frontend: string,
    cloudflare: string,
    github: string,
    vercel: string,
  }>({
    frontend: "",
    cloudflare: "",
    github: "",
    vercel: "",
  });

  useEffect(() => {
    async function fetchAllStatuses() {
      const frontend = await fetchHttpStatus("https://blog.d3h1.com");
      const cloudflare = await fetchStatus("https://www.cloudflarestatus.com/api/v2/status.json");
      const github = await fetchStatus("https://www.githubstatus.com/api/v2/status.json");
      const vercel = await fetchStatus("https://www.vercel-status.com/api/v2/status.json");

      setStatuses({
        frontend,
        cloudflare,
        github,
        vercel,
      });
    }
    fetchAllStatuses();
  }, []);

  return statuses;
}