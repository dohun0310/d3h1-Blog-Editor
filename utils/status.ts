import { useEffect, useState } from "react";

async function fetchAPIStatus(url: string): Promise<string> {
  const response = await fetch(url);
  const data = await response.json();

  if (data.status.indicator === "none") {
    return "operational";
  } else if (data.status.indicator === "minor") {
    return "warning";
  } else if (data.status.indicator === "major" || data.status.indicator === "critical") {
    return "error";
  } else {
    return "none";
  }
}

async function fetchHttpStatus(url: string): Promise<string> {
  const response = await fetch(url);

  return response.status === 200 ? "operational" : "error";
}

async function fetchVercelDeployStatus(name: string): Promise<string> {
  const response = await fetch(`https://api.vercel.com/v3/deployments/?app=${name}`, {
    headers: { "Authorization": `Bearer ${process.env.NEXT_PUBLIC_VERCEL_TOKEN}` },
    method: "get"
  });
  const data = await response.json();

  if (data.deployments[0].state === "READY") {
    return "operational";
  } else if (data.deployments[0].state === "ERROR") {
    return "error";
  } else if (data.deployments[0].state === "CANCELED") {
    return "warning";
  } else if (data.deployments[0].state === "BUILDING") {
    return "running";
  } else {
    return "none";
  }
}

export default function useStatuses() {
  const [statuses, setStatuses] = useState({
    frontend: "none",
    frontendDeploy: "none",
    editorDeploy: "none",
    cloudflare: "none",
    github: "none",
    vercel: "none",
  });

  useEffect(() => {
    async function fetchAllStatuses() {
      const [frontend, frontendDeploy, editorDeploy, cloudflare, github, vercel] = await Promise.all([
        fetchHttpStatus("https://blog.d3h1.com"),
        fetchVercelDeployStatus("d3h1-blog"),
        fetchVercelDeployStatus("d3h1-blog-editor"),
        fetchAPIStatus("https://www.cloudflarestatus.com/api/v2/status.json"),
        fetchAPIStatus("https://www.githubstatus.com/api/v2/status.json"),
        fetchAPIStatus("https://www.vercel-status.com/api/v2/status.json")
      ]);

      setStatuses({ frontend, frontendDeploy, editorDeploy, cloudflare, github, vercel });
    }

    fetchAllStatuses();
  }, []);

  return statuses;
}
