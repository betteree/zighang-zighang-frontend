export function toApiJob(displayName: string): string {
  return displayName.replace(/·/g, "_");
}

export function toDisplayJob(apiName: string): string {
  return apiName.replace(/_/g, "·");
}
