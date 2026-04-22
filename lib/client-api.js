const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export function getClientApiBaseUrl() {
  if (apiBaseUrl) {
    return apiBaseUrl;
  }

  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:5000";
  }

  throw new Error("NEXT_PUBLIC_API_URL is required in production.");
}
