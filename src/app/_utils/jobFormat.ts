export function toApiJob(displayName: string): string {
  return displayName.replace(/[· ]/g, "_");
}
export function toDisplayJobDot(apiName: string): string {
  return apiName.replace(/_/g, "·");
}

export function toDisplayJobSpace(apiName: string): string {
  return apiName.replace(/_/g, " ");
}
