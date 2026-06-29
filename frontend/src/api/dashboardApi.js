const API_URL = "https://analytics-dashboard-uugo.onrender.com/api/dashboard/";

export async function fetchDashboardData({
  page,
  limit,
  search,
  sortBy,
  sortOrder,
  filters,
}) {
  const params = new URLSearchParams({
    page,
    limit,
    search,
    category: filters.category,
    status: filters.status,
    device: filters.device,
    rankRange: filters.rankRange,
    sortKey: sortBy,
    sortOrder,
  });

  const response = await fetch(`${API_URL}/dashboard/?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return response.json();
}

export async function fetchAnnotations() {
  const response = await fetch(`${API_URL}/annotations/`);
  return response.json();
}

export async function createAnnotation(annotation) {
  const response = await fetch(`${API_URL}/annotations/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(annotation),
  });

  return response.json();
}

export async function updateAnnotation(id, annotation) {
  const response = await fetch(`${API_URL}/annotations/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(annotation),
  });

  return response.json();
}