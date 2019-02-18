import {
  SET_TEMPLATES,
  SET_CURRENT_CONDUCT_TEST,
  SET_PROFICIENCY_LEVELS,
  CLEAR_CURRENT_CONDUCT_TEST,
  SET_TESTS,
  UPDATE_TEMPLATE,
  ADD_TEST,
  SET_SEARCH_PARAMS,
  ADD_SEARCH_PARAM,
  REMOVE_SEARCH_PARAM
} from '@/candidates/profile/tests/store/types';

import {
  FINISHED,
  IN_PROGRESS,
  NOT_STARTED
} from '@/candidates/profile/tests/store/tests-status-types';

import candidateTestsGraphqlApi from '@/candidates/profile/tests/candidate/candidateTestsGraphqlApi.service';
import allTestsGraphQlApi from '@/candidates/profile/tests/all/allTestsGraphQlApi.service';
import conductTestGraphQlApiService from '@/candidates/profile/tests/conduct/conductTestGraphQlApi.service';
import _ from 'lodash';
import ErrorReporting from '@/candidates/core/services/error-reporting.service';

const getDefaultState = () => {
  return {
    currentConductTest: null,
    isLoadingTests: false,
    tests: null,
    templates: null,
    proficiencyLevels: null,
    searchParams: [],
    currentTestsTab: NOT_STARTED
  };
};

const state = getDefaultState();

const mutations = {
  setDefaultState (state) {
    Object.assign(state, getDefaultState());
  },
  [SET_TESTS] (state, tests) {
    state.tests = tests;
  },
  [UPDATE_TEMPLATE] (state, template) {
    const templateIndex = state.templates.findIndex(t => t.id === template.id);
    state.templates = [...state.templates.slice(0, templateIndex), template, ...state.templates.slice(templateIndex + 1)];
  },
  [ADD_TEST] (state, test) {
    state.tests = state.tests.concat([test]);
  },
  [SET_TEMPLATES] (state, templates) {
    state.templates = templates;
  },
  [SET_PROFICIENCY_LEVELS] (state, proficiencyLevels) {
    state.proficiencyLevels = proficiencyLevels;
  },
  [SET_CURRENT_CONDUCT_TEST] (state, currentTest) {
    state.currentConductTest = currentTest;
  },
  [CLEAR_CURRENT_CONDUCT_TEST] (state) {
    state.currentConductTest = null;
  },
  setTestsLoader (state, isLoading) {
    state.isLoadingTests = isLoading;
  },
  setCurrentTestTab (state, currentTestsTabName) {
    state.currentTestsTab = currentTestsTabName;
  },
  [SET_SEARCH_PARAMS] (state, searchParams) {
    state.searchParams = searchParams;
  },
  [ADD_SEARCH_PARAM] (state, searchParam) {
    let searchParams = [...state.searchParams];
    searchParams.push(searchParam);
    state.searchParams = searchParams;
  },
  [REMOVE_SEARCH_PARAM] (state, index) {
    let searchParams = [...state.searchParams];
    searchParams.splice(index, 1);
    state.searchParams = searchParams;
  }
};

const actions = {
  async fetchTests ({commit}) {
    try {
      const tests = await candidateTestsGraphqlApi.fetchTests();
      commit(SET_TESTS, tests);
    } catch (error) {
      ErrorReporting(error);

      throw error;
    }
  },
  async fetchTemplates ({commit}) {
    try {
      const templates = await allTestsGraphQlApi.fetchTemplates();
      commit(SET_TEMPLATES, templates);
    } catch (error) {
      ErrorReporting(error);

      throw error;
    }
  },
  async fetchProficiencyLevels ({commit}) {
    try {
      const proficiencyLevels = await allTestsGraphQlApi.fetchProficiencyLevels();
      commit(SET_PROFICIENCY_LEVELS, proficiencyLevels);
    } catch (error) {
      ErrorReporting(error);

      throw error;
    }
  },
  async fetchConductTest ({commit}) {
    try {
      const currentTest = await conductTestGraphQlApiService.fetchTest();

      commit(SET_CURRENT_CONDUCT_TEST, currentTest);

      return currentTest;
    } catch (error) {
      ErrorReporting(error);

      throw error;
    }
  },
  async submitCurrentTest ({commit}, answer) {
    try {
      commit(CLEAR_CURRENT_CONDUCT_TEST);

      const currentTest = await conductTestGraphQlApiService.submitAnswer(answer);

      if (!currentTest.nextQuestion) {
        commit(CLEAR_CURRENT_CONDUCT_TEST);

        return null;
      }

      commit(SET_CURRENT_CONDUCT_TEST, currentTest);

      return currentTest;
    } catch (error) {
      ErrorReporting(error);

      throw error;
    }
  },
  async addTemplateToTests ({commit, state}, template) {
    try {
      await allTestsGraphQlApi.addTemplateToTests(template.id);
      const updatedTemplate = {...template, added: true};
      commit(UPDATE_TEMPLATE, updatedTemplate);
      const test = {...template, status: 'not_started'};
      commit(ADD_TEST, test);
    } catch (error) {
      ErrorReporting(error);

      throw error;
    }
  }
};

const getters = {
  currentConductTest: state => state.currentConductTest,
  isLoadingTests: state => state.isLoadingTests,
  tests: state => state.tests,
  templates: state => state.templates,
  notStartedTests: state => _.filter(state.tests, (o) => o.status === NOT_STARTED),
  inProgressTests: state => _.filter(state.tests, (o) => o.status === IN_PROGRESS),
  finishedTests: state => _.filter(state.tests, (o) => o.status === FINISHED),
  currentTestsTab: state => state.currentTestsTab,
  proficiencyLevels: state => state.proficiencyLevels,
  searchParams: state => state.searchParams
};

const testsStore = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};

export default testsStore;
