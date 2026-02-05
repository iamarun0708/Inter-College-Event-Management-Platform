export const logoutUser = (navigate) => {
  localStorage.removeItem("user");
  navigate("/login");
};
