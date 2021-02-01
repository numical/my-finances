const defaultOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default (path, options = {}) => async () => {
  try {
    const allOptions = { ...defaultOptions, ...options };
    const response = await fetch(path, allOptions);
    if (response.ok) {
      const json = await response.json();
      return `200: ${JSON.stringify(json)}`;
    } else {
      return `${response.status}: ${response.statusText}`;
    }
  } catch (err) {
    return `500: ${err.name}: ${err.message}`;
  }
};
