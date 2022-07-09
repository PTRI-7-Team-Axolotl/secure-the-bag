const authProvider = {
  isAuthenticated: false,
  signin() {
    authProvider.isAuthenticated = true;
  },
  signout() {
    authProvider.isAuthenticated = false;
  },
};

export { authProvider };