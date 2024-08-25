import { parseQuery } from './parser';

const API_URL = 'http://localhost:8080';

export async function searchCourses(rawQuery) {
  const parsedQuery = parseQuery(rawQuery);
  
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(parsedQuery)) {
    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, v));
    } else if (value !== '') {
      params.append(key, value);
    }
  }

  const response = await fetch(`${API_URL}/search?${params.toString()}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Search failed');
  
  const data = await response.json();
  console.log('API response:', data);
  return {
    results: data.hits.map(hit => hit.fields),
    totalHits: data.total_hits,
    timeToQuery: data.took,
  };
}