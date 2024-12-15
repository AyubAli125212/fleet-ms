if (!import.meta.env.VITE_API_URL) {
  throw new Error("Environment variable VITE_API_URL is required.");
}

export const config = {
  API_URL: import.meta.env.VITE_API_URL,
};
