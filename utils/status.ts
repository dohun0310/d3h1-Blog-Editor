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

export default async function useStatuses() {
  const statuses = {
    frontend: await fetchHttpStatus("https://blog.d3h1.com"),
    cloudflare: await fetchStatus("https://www.cloudflarestatus.com/api/v2/status.json"),
    github: await fetchStatus("https://www.githubstatus.com/api/v2/status.json"),
    vercel: await fetchStatus("https://www.vercel-status.com/api/v2/status.json"),
  };

  return statuses;
}
