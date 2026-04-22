export function getClientApiBaseUrl() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (apiBaseUrl) {
    return apiBaseUrl.replace(/\/$/, "");
  }

  // Default to same-origin Next.js API routes.
  return "/api";
}
