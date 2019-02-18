export const devTestsAuth = {
  setToken (token) {
    localStorage.setItem('token-tests', 'Bearer ' + token);
  },

  removeToken () {
    localStorage.removeItem('token-tests');
  }
};
