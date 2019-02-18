const SET_LOADING = 'setLoading';
const UNSET_LOADING = 'unsetLoading';
const UPDATE_SHOW_HEADER = 'updateShowHeader';
const UPDATE_SHOW_MENU = 'updateShowMenu';

const state = {
  loading: false,
  showHeader: true,
  showMenu: false
};

const mutations = {
  [SET_LOADING] (state) {
    state.loading = true;
  },
  [UNSET_LOADING] (state) {
    state.loading = false;
  },
  [UPDATE_SHOW_HEADER] (state, showHeader) {
    state.showHeader = showHeader;
  },
  [UPDATE_SHOW_MENU] (state, showMenu) {
    state.showMenu = showMenu;
  }
};

const actions = {

};

const getters = {
  loading: state => state.loading,
  showHeader: state => state.showHeader,
  showMenu: state => state.showMenu
};

const globalStore = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};

export default globalStore;
