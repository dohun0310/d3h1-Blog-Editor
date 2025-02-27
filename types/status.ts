export type StatusType = "operational" | "warning" | "error" | "none" | "running";

export interface Statuses {
  frontend: StatusType;
  frontendDeploy: StatusType;
  editorDeploy: StatusType;
  server1: StatusType;
  server2: StatusType;
  server3: StatusType;
  cloudflare: StatusType;
  github: StatusType;
  vercel: StatusType;
}