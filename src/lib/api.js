const API_URL = 'http://localhost:8080';

export async function searchCourses(query) {
  const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Search failed');
  const data = await response.json();
  return {
    results: data.hits.map(hit => hit.fields),
    totalHits: data.total_hits
  };
}