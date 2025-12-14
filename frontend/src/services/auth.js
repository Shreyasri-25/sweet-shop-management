export const isAuthenticated = () => {
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  return token !== null;
};

export const getUser = () => {
  try {
    const user =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    if (!user || user === "undefined") return null;

    return JSON.parse(user);
  } catch (error) {
    return null;
  }
};


export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};
