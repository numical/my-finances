const defaultOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default async (path, options = {}) => {
  const allOptions = { ...defaultOptions, ...options };
  const response = await fetch(path, allOptions);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Fetch error: ${response.status}: ${response.statusText}`);
  }
};
