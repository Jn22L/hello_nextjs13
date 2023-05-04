async function fetchJson(url, option) {
  const response = await fetch(url, option);
  const json = await response.json();
  if (!response.ok) {
    throw new Error(JSON.stringify(json));
  }
  return json;
}

export { fetchJson };
