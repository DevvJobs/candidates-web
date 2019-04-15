import _ from 'lodash';
import apolloClient from '@/candidates/core/apollo/client';
import { queries } from '@/candidates/core/gql/queries';
import {
  SET_CANDIDATE,
  SET_CANDIDATE_NAME,
  SET_CANDIDATE_SKILLS,
  REMOVE_CANDIDATE_SKILL,
  ADD_CANDIDATE_SKILL,
  UPDATE_CANDIDATE_SKILL,
  SET_CANDIDATE_COUNTRY,
  SET_CANDIDATE_CHAT_REQUEST_COUNT,
  SET_CANDIDATE_CHAT_MESSAGES_COUNT,
  SET_CANDIDATE_OPEN_TO_REMOTE,
  SET_CANDIDATE_OPEN_TO_RELOCATION
} from '@/candidates/profile/store/types';
import intercomService from '@/core/services/intercom.service';
import candidateService from '@/candidates/core/services/candidate.service';
import locationService from '@/candidates/core/services/location.service';
import skillService from '@/candidates/core/services/skill.service';
import ErrorReporting from '@/candidates/core/services/error-reporting.service';

const getDefaultState = () => {
  return {
    candidate: null
  };
};

const state = getDefaultState();

const mutations = {
  setDefaultState (state) {
    Object.assign(state, getDefaultState());
  },
  [SET_CANDIDATE] (state, candidate) {
    state.candidate = candidate;
  },
  [SET_CANDIDATE_CHAT_REQUEST_COUNT] (state, totalContactRequestsCount) {
    state.candidate = { ...state.candidate, totalContactRequestsCount: totalContactRequestsCount };
  },
  [SET_CANDIDATE_CHAT_MESSAGES_COUNT] (state, totalUnreadMessagesCount) {
    state.candidate = { ...state.candidate, totalUnreadMessagesCount: totalUnreadMessagesCount };
  },
  [SET_CANDIDATE_NAME] (state, candidateName) {
    state.candidate = { ...state.candidate, name: candidateName };
  },
  [SET_CANDIDATE_COUNTRY] (state, candidateCountry) {
    state.candidate = { ...state.candidate, country: candidateCountry };
  },
  [SET_CANDIDATE_OPEN_TO_RELOCATION] (state, openToRelocation) {
    state.candidate = { ...state.candidate, openToRelocation: openToRelocation };
  },
  [SET_CANDIDATE_OPEN_TO_REMOTE] (state, openToRemote) {
    state.candidate = { ...state.candidate, openToRemote: openToRemote };
  },
  [SET_CANDIDATE_SKILLS] (state, candidateSkills) {
    state.candidate = { ...state.candidate, skills: candidateSkills };
  },
  [ADD_CANDIDATE_SKILL] (state, skill) {
    let candidateSkills = state.candidate.skills;
    candidateSkills.push(skill);
    state.candidate = { ...state.candidate, skills: candidateSkills };
  },
  [UPDATE_CANDIDATE_SKILL] (state, skill) {
    let candidateSkills = state.candidate.skills;
    const skillIndex = _.findIndex(candidateSkills, (obj) => obj.id === skill.id);
    candidateSkills[skillIndex] = skill;
    state.candidate = { ...state.candidate, skills: candidateSkills };
  },
  [REMOVE_CANDIDATE_SKILL] (state, id) {
    let candidateSkills = state.candidate.skills;
    const skillIndex = _.findIndex(candidateSkills, (obj) => obj.id === id);
    candidateSkills.splice(skillIndex, 1);
    state.candidate = { ...state.candidate, skills: candidateSkills };
  }
};

const actions = {
  async fetchCandidate ({ commit }) {
    try {
      const response = await apolloClient.query({
        query: queries.candidate
      });
      const candidate = response.data.candidate;
      commit(SET_CANDIDATE, candidate);
      return candidate;
    } catch (error) {
      ErrorReporting(error);

      throw error;
    }
  },
  async fetchLocations ({ commit }, searchText) {
    try {
      const response = await locationService.list(searchText);
      return response;
    } catch (error) {
      ErrorReporting(error);

      throw error;
    }
  },
  async fetchSkills ({ commit }, searchText) {
    try {
      const response = await skillService.list(searchText);
      return response;
    } catch (error) {
      ErrorReporting(error);

      throw error;
    }
  },
  async updateCandidateCounter ({ commit }) {
    try {
      const response = await apolloClient.query({
        query: queries.candidate
      });
      const candidate = response.data.candidate;
      commit(SET_CANDIDATE_CHAT_REQUEST_COUNT, candidate.totalContactRequestsCount);
      commit(SET_CANDIDATE_CHAT_MESSAGES_COUNT, candidate.totalUnreadMessagesCount);
      return candidate;
    } catch (error) {
      ErrorReporting(error);

      throw error;
    }
  },
  async updateCandidate ({ commit, dispatch }, data) {
    try {
      const response = await candidateService.updateCandidate(data);
      if (response.success) {
        let candidate = response.candidate;
        commit(SET_CANDIDATE_NAME, candidate.name);
        commit(SET_CANDIDATE_OPEN_TO_REMOTE, candidate.openToRemote);
        commit(SET_CANDIDATE_OPEN_TO_RELOCATION, candidate.openToRelocation);
        commit(SET_CANDIDATE_COUNTRY, candidate.country);
        const candidateCountry = candidate.country ? candidate.country.name : null;
        intercomService.boot({
          name: candidate.name,
          email: candidate.email,
          country: candidateCountry
        });
        return;
      } else {
        const errors = response.errors;
        errors._expected = true;
        throw errors;
      }
    } catch (error) {
      ErrorReporting(error);

      throw error;
    }
  },
  async putSkills ({ commit, dispatch }, data) {
    try {
      await candidateService.updateCandidateProfileSkills(data);
      return;
    } catch (error) {
      ErrorReporting(error);

      throw error;
    }
  },
  async deleteSkill ({ commit, dispatch }, data) {
    try {
      await candidateService.removeCandidateSkill(data);
      return;
    } catch (error) {
      ErrorReporting(error);

      throw error;
    }
  }
};

const getters = {
  candidate: state => state.candidate,
  showMenu: state => state.showMenu
};

const PROFILE_STORE = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};

export default PROFILE_STORE;
