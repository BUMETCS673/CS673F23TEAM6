export const setToken = (text: string) => {
  localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN || "token", text);
};

export const clearToken = () => {
  localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN || "token");
};

export const getToken = () => {
  return localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN || "token");
};
