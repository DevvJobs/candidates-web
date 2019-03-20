import authService from '@/candidates/core/services/auth.service';
import ErrorReporting from '@/candidates/core/services/error-reporting.service';

const SET_CANDIDATE_EMAIL = 'SET_CANDIDATE_AUTH_EMAIL';
const SET_SUCCESS_REGISTRATION = 'SET_SUCCESS_REGISTRATION';

const getDefaultState = () => {
  return {
    email: null,
    login_attempt_token: null,
    session_id: null,
    successRegistration: false
  };
};

const state = getDefaultState();

const mutations = {
  setDefaultState (state) {
    Object.assign(state, getDefaultState());
  },
  [SET_CANDIDATE_EMAIL] (state, email) {
    state.email = email;
  },
  [SET_SUCCESS_REGISTRATION] () {
    state.successRegistration = true;
  }
};

const actions = {
  async signUp ({commit, dispatch}, {name, email}) {
    try {
      commit('setLoading', null, { root: true });
      const response = await authService.signUp(email, name);
      commit(SET_CANDIDATE_EMAIL, email);
      commit(SET_SUCCESS_REGISTRATION);
      return response;
    } catch (error) {
      ErrorReporting(error);

      throw error;
    } finally {
      commit('unsetLoading', null, { root: true });
    }
  },
  async requestLoginCode ({commit, dispatch}, email) {
    try {
      commit('setLoading', null, { root: true });
      const response = await authService.getAuthData(email);
      return response;
    } catch (error) {
      ErrorReporting(error);

      throw error;
    } finally {
      commit('unsetLoading', null, { root: true });
    }
  },
  async submitLoginCode ({commit, dispatch}, code) {
    try {
      commit('setLoading', null, { root: true });
      const response = await authService.signIn(code);
      return response;
    } catch (error) {
      ErrorReporting(error);

      throw error;
    } finally {
      commit('unsetLoading', null, { root: true });
    }
  },
  async logout ({commit, dispatch}) {
    try {
      commit('setLoading', null, { root: true });
      const response = await authService.logout('/tokens');
      return response;
    } catch (error) {
      ErrorReporting(error);

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
