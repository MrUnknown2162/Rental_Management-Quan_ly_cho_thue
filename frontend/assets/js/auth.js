const auth = (() => {
  return {
    login: async ({ email, password }) => {
      const res = await api.login({ email, password });
      return res;
    },
    saveToken: (token) => {
      localStorage.setItem('token', token);
    },
    logout: () => {
      localStorage.removeItem('token');
      window.location = 'login.html';
    },
    getToken: () => localStorage.getItem('token')
  };
})();
