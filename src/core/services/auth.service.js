class Auth {
  constructor (axiosClient) {
    this.email = null;
    this.session_id = null;
    this.login_attempt_token = null;
    this.axios = axiosClient;
  }
  getAuthData (email) {
    return this.axios
      .post('/login_codes', { email: email })
      .then((response) => {
        this.email = email;
        this.session_id = response.data.session_id;
        this.login_attempt_token = response.data.login_attempt_token;
      });
  }
  setToken (token) {
    localStorage.setItem('token', 'Bearer ' + token);
  }
  signUp (email, name) {
    return this.axios.post('/signup', { email: email, name: name });
  }
  async signIn (code) {
    const token = await this.axios
      .post('/tokens', {
        email: this.email,
        code: code,
        login_attempt_token: this.login_attempt_token
      })
      .then((response) => {
        return response.data.token;
      });
    this.setToken(token);
  }
  logout (url) {
    return this.axios.delete(url)
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('token-tests');
        localStorage.setItem('lastStepComplete', '');
      });
  }
}

export default Auth;
