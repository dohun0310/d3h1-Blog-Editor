import { useEffect, useState } from "react";
import { StatusType, Statuses } from "@/types/status";

async function fetchAPIStatus(url: string): Promise<StatusType> {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status.indicator === "none") return "operational";
    if (data.status.indicator === "minor") return "warning";
    if (data.status.indicator === "major" || data.status.indicator === "critical") return "error";

    return "none";
  } catch {
    return "error";
  }
}

async function fetchHttpStatus(url: string): Promise<StatusType> {
  try {
    const response = await fetch(url);
    return response.status === 200 ? "operational" : "error";
  } catch {
    return "error";
  }
}

async function fetchVercelDeployStatus(name: string): Promise<StatusType> {
  try {
    const response = await fetch(`https://api.vercel.com/v3/deployments/?app=${name}`, {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_TOKEN}` },
      method: "get",
    });
    const data = await response.json();

    if (data.deployments[0].state === "READY") return "operational";
    if (data.deployments[0].state === "ERROR") return "error";
    if (data.deployments[0].state === "CANCELED") return "warning";
    if (data.deployments[0].state === "BUILDING") return "running";

    return "none";
  } catch {
    return "error";
  }
}

export default function useStatuses() {
  const [statuses, setStatuses] = useState<Statuses>({
    frontend: "none",
    frontendDeploy: "none",
    editorDeploy: "none",
    cloudflare: "none",
    github: "none",
    vercel: "none",
  });

  useEffect(() => {
    const intervalIds: NodeJS.Timeout[] = [];

    const updateFrontendStatus = async () => {
      const frontend = await fetchHttpStatus("https://blog.d3h1.com");
      setStatuses((prev) => ({ ...prev, frontend }));
    };

    const updateFrontendDeployStatus = async () => {
      const frontendDeploy = await fetchVercelDeployStatus("d3h1-blog");
      setStatuses((prev) => ({ ...prev, frontendDeploy }));
    };

    const updateEditorDeployStatus = async () => {
      const editorDeploy = await fetchVercelDeployStatus("d3h1-blog-editor");
      setStatuses((prev) => ({ ...prev, editorDeploy }));
    };

    const updateCloudflareStatus = async () => {
      const cloudflare = await fetchAPIStatus("https://www.cloudflarestatus.com/api/v2/status.json");
      setStatuses((prev) => ({ ...prev, cloudflare }));
    };

    const updateGithubStatus = async () => {
      const github = await fetchAPIStatus("https://www.githubstatus.com/api/v2/status.json");
      setStatuses((prev) => ({ ...prev, github }));
    };

    const updateVercelStatus = async () => {
      const vercel = await fetchAPIStatus("https://www.vercel-status.com/api/v2/status.json");
      setStatuses((prev) => ({ ...prev, vercel }));
    };

    intervalIds.push(setInterval(updateFrontendStatus, 30000));
    intervalIds.push(setInterval(updateFrontendDeployStatus, 30000));
    intervalIds.push(setInterval(updateEditorDeployStatus, 30000));
    intervalIds.push(setInterval(updateCloudflareStatus, 30000));
    intervalIds.push(setInterval(updateGithubStatus, 30000));
    intervalIds.push(setInterval(updateVercelStatus, 30000));

    updateFrontendStatus();
    updateFrontendDeployStatus();
    updateEditorDeployStatus();
    updateCloudflareStatus();
    updateGithubStatus();
    updateVercelStatus();

    return () => intervalIds.forEach((id) => clearInterval(id));
  }, []);

  return statuses;
}