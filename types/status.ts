export type StatusType = "operational" | "warning" | "error" | "none" | "running";

export interface Statuses {
  frontend: StatusType;
  frontendDeploy: StatusType;
  editorDeploy: StatusType;
  cloudflare: StatusType;
  github: StatusType;
  vercel: StatusType;
}