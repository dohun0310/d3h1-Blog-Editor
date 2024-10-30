async function fetchStatus(url: string) {
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

async function fetchHttpStatus(url: string) {
  const response = await fetch(url);

  return response.status === 200 ? "operational" : "error";
}

export async function fetchVercelDeployStatus(name: string) {
  const response = await fetch(`https://api.vercel.com/v3/deployments/?app=${name}`, {
    "headers": {
      "Authorization": `Bearer ${process.env.VERCEL_TOKEN}`
    },
    "method": "get"
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

export default async function useStatuses() {
  const statuses = {
    frontend: await fetchHttpStatus("https://blog.d3h1.com"),
    frontendDeploy: await fetchVercelDeployStatus("d3h1-blog"),
    editorDeploy: await fetchVercelDeployStatus("d3h1-editor"),
    jenkins: await fetchHttpStatus(process.env.JENKINS_URL || "/"),
    cloudflare: await fetchStatus("https://www.cloudflarestatus.com/api/v2/status.json"),
    github: await fetchStatus("https://www.githubstatus.com/api/v2/status.json"),
    vercel: await fetchStatus("https://www.vercel-status.com/api/v2/status.json"),
  };

  return statuses;
}
