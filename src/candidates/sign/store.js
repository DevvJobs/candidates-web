import ErrorReporting from '@/candidates/core/services/error-reporting.service';
import AuthGraphqlService from '@/candidates/core/services/authGraphqlService';

const SET_CANDIDATE_EMAIL = 'SET_CANDIDATE_AUTH_EMAIL';
const SET_SUCCESS_REGISTRATION = 'SET_SUCCESS_REGISTRATION';
const SET_LOGIN_ATTEMPT = 'SET_LOGIN_ATTEMPT';
const SET_TOKEN = 'SET_TOKEN';

const getDefaultState = () => {
  return {
    email: null,
    login_attempt_token: null,
    session_id: null,
    token: null,
    successRegistration: false
  };
};

const state = getDefaultState();

const mutations = {
  setDefaultState (state) {
    Object.assign(state, getDefaultState());
  },
  [SET_LOGIN_ATTEMPT] (state, data) {
    state.login_attempt_token = data.loginAttemptToken;
    state.session_id = data.sessionId;
  },
  [SET_TOKEN] (state, token) {
    localStorage.setItem('token', token);
    state.token = localStorage.getItem('token');
  },
  [SET_CANDIDATE_EMAIL] (state, email) {
    state.email = email;
  },
  [SET_SUCCESS_REGISTRATION] () {
    state.successRegistration = true;
  }
};

const actions = {
  async signUp ({ commit, dispatch }, { name, email }) {
    try {
      commit('setLoading', null, { root: true });

      // NOTE: Remove this after 2018-04-21
      // --- 2019-03-21 - Tetiana Kolmychek
      // const response = await authService.signUp(email, name);

      const response = await AuthGraphqlService.signup({
        name: name, email: email
      });
      if (response.success) {
        commit(SET_CANDIDATE_EMAIL, email);
        commit(SET_SUCCESS_REGISTRATION);
        return response;
      } else {
        return response;
      }
    } catch (error) {
      ErrorReporting(error);

      throw error;
    } finally {
      commit('unsetLoading', null, { root: true });
    }
  },
  async requestLoginCode ({ commit, dispatch }, email) {
    try {
      commit('setLoading', null, { root: true });

      const response = await AuthGraphqlService.requestLoginCode({ email });

      if (response.success) {
        commit(SET_LOGIN_ATTEMPT, response);
        commit(SET_CANDIDATE_EMAIL, email);
        return response;
      } else {
        return response;
      }

      // NOTE: Remove this after 2018-04-21
      // --- 2019-03-21 - Tetiana Kolmychek
      // const response = await authService.getAuthData(email);
    } catch (error) {
      ErrorReporting(error);

      throw error;
    } finally {
      commit('unsetLoading', null, { root: true });
    }
  },
  async submitLoginCode ({ commit, dispatch }, code) {
    try {
      commit('setLoading', null, { root: true });

      const response = await AuthGraphqlService.submitLoginCode({
        code: code,
        email: state.email,
        loginAttemptToken: state.login_attempt_token
      });

      if (response.success) {
        commit(SET_TOKEN, response.token);
        return response;
      } else {
        return response;
      }

      // NOTE: Remove this after 2018-04-21
      // --- 2019-03-21 - Tetiana Kolmychek
      // const response = await authService.signIn(code);
    } catch (error) {
      ErrorReporting(error);

      throw error;
    } finally {
      commit('unsetLoading', null, { root: true });
    }
  },
  async logout ({ commit, dispatch }) {
    try {
      commit('setLoading', null, { root: true });

      const response = await AuthGraphqlService.logout({ token: state.token });

      localStorage.removeItem('token');
      localStorage.removeItem('token-tests');
      localStorage.setItem('lastStepComplete', '');

      // NOTE: Remove this after 2018-04-21
      // --- 2019-03-21 - Tetiana Kolmychek
      // const response = await authService.logout('/tokens');

      return response;
    } catch (error) {
      ErrorReporting(error);

      localStorage.removeItem('token');
      localStorage.removeItem('token-tests');
      localStorage.setItem('lastStepComplete', '');

      throw error;
    } finally {
      commit('unsetLoading', null, { root: true });
    }
  }
};

const getters = {
  email: state => state.email,
  login_attempt_token: state => state.login_attempt_token,
  session_id: state => state.session_id
};

const signStore = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};

export default signStore;
