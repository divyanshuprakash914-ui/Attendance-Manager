const API_URL = import.meta.env.VITE_API_URL;

export async function getDashboardOverview() {
  const response = await fetch(`${API_URL}/dashboard/overview`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    let message = "Failed to fetch dashboard overview";

    try {
      const errorData = await response.json();
      message = errorData.detail || errorData.message || message;
    } catch {
      // Keep the default message when the backend does not return JSON.
    }

    throw new Error(message);
  }

  return response.json();
}
