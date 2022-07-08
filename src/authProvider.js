const authProvider = {
  isAuthenticated: false,
  signin(callback) {
    authProvider.isAuthenticated = true;
  },
  signout(callback) {
    authProvider.isAuthenticated = false;
  },
};

export { authProvider };