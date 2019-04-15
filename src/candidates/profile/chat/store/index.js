import {
  SET_CONTACTS,
  SET_ACCEPTED_CONTACTS,
  SET_PENDING_CONTACTS,
  SET_ARCHIVED_CONTACTS,
  SET_SHOWED_CONTACTS,
  SET_MESSAGES,
  SET_SELECTED_CONTACT,
  SET_SELECTED_CONTACT_STATUS,
  ADD_MESSAGE, SET_CHAT_LOADER,
  UNSET_CHAT_LOADER, SET_SHOW_THREADS,
  SET_ACTIVE_TAB,
  SET_SHOW_ARCHIVE_POPUP,
  SET_SHOW_ARCHIVE_POPUP_SUCCESS,
  SET_SHOW_MASS_ARCHIVE_POPUP,
  MOVE_SELECTED_TO_ARCHIVED,
  MOVE_CONTACTS_TO_ARCHIVED,
  CLEAR_SELECTED_THREADS,
  SET_ERROR_FOR_ARCHIVE_ID,
  SET_ERROR_FOR_ARCHIVE_BASE
} from '@/candidates/profile/chat/store/types';
import chatGraphqlApiService from '@/candidates/profile/chat/shared/chatGraphqlApiService';
import Message from '@/core/modules/chat/Message';
import { REQUEST_SENT, ACCEPTED, BLOCKED } from '@/core/modules/chat/contactStatuses';
import router from '@/candidates/router';
import ErrorReporting from '@/candidates/core/services/error-reporting.service';

const getDefaultState = () => {
  return {
    isCandidateChat: true,
    contacts: null,
    acceptedContacts: null,
    pendingContacts: null,
    archivedContacts: null,
    showedContacts: null,
    messages: [],
    chatLoader: false,
    selectedContact: null,
    showThreads: true,
    showCompanyInfo: false,
    activeTab: 'all',
    selectedThreads: [],
    showArchivePopup: false,
    showArchivePopupSuccess: false,
    showMassArchivePopup: false,
    errorForArchiveId: null,
    errorForArchiveBase: null,
    showBlockContactPopup: false
  };
};
const state = getDefaultState();

const mutations = {
  setDefaultState (state) {
    Object.assign(state, getDefaultState());
  },
  [SET_CHAT_LOADER] (state) {
    state.chatLoader = true;
  },
  [UNSET_CHAT_LOADER] (state) {
    state.chatLoader = false;
  },
  [SET_CONTACTS] (state, contacts) {
    state.contacts = contacts;
  },
  [SET_ACCEPTED_CONTACTS] (state, contacts) {
    let acceptedContacts = contacts.filter((contact) => {
      return contact.status === ACCEPTED;
    });
    state.acceptedContacts = acceptedContacts;
  },
  [SET_PENDING_CONTACTS] (state, contacts) {
    let pendingContacts = contacts.filter((contact) => {
      return contact.status === REQUEST_SENT;
    });
    state.pendingContacts = pendingContacts;
  },
  [SET_ARCHIVED_CONTACTS] (state, contacts) {
    state.archivedContacts = contacts;
  },
  [SET_SHOWED_CONTACTS] (state) {
    switch (state.activeTab) {
      case 'all':
        state.showedContacts = state.contacts;
        break;
      case 'accepted':
        state.showedContacts = state.acceptedContacts;
        break;
      case 'pending':
        state.showedContacts = state.pendingContacts;
        break;
      case 'archived':
        state.showedContacts = state.archivedContacts;
        break;
      default:
        state.showedContacts = state.contacts;
    }
  },
  [SET_SELECTED_CONTACT] (state, selectedContact) {
    state.selectedContact = selectedContact;
  },
  [SET_MESSAGES] (state, messages) {
    state.messages = messages;
  },
  [ADD_MESSAGE] (state, message) {
    state.messages = state.messages.concat([message]);
  },
  [SET_SELECTED_CONTACT_STATUS] (state, status) {
    state.selectedContact = { ...state.selectedContact, status: status };
  },
  [SET_SHOW_THREADS] (state, showThreads) {
    state.showThreads = showThreads;
  },
  setCompanyInfoVisibility (state, isShow) {
    state.showCompanyInfo = isShow;
  },
  [MOVE_SELECTED_TO_ARCHIVED] (state) {
    if (state.contacts && state.selectedContact) {
      const newContacts =
        state.contacts.filter(v => v.id !== state.selectedContact.id);
      state.contacts = newContacts;
    };
    if (state.archivedContacts && state.selectedContact) {
      state.archivedContacts.unshift(state.selectedContact);
    };
  },
  [MOVE_CONTACTS_TO_ARCHIVED] (state, ids) {
    if (state.contacts && state.selectedContact) {
      const newContacts =
        state.contacts.filter(v => !ids.includes(v.id));
      state.contacts = newContacts;
    };
  },
  [SET_ACTIVE_TAB] (state, tab) {
    state.activeTab = tab;
  },
  [SET_SHOW_ARCHIVE_POPUP] (state, show) {
    state.showArchivePopup = show;
  },
  [SET_SHOW_ARCHIVE_POPUP_SUCCESS] (state, show) {
    state.showArchivePopupSuccess = show;
  },
  [SET_SHOW_MASS_ARCHIVE_POPUP] (state, show) {
    state.showMassArchivePopup = show;
  },
  [SET_ERROR_FOR_ARCHIVE_ID] (state, error) {
    state.errorForArchiveId = error;
  },
  [SET_ERROR_FOR_ARCHIVE_BASE] (state, error) {
    state.errorForArchiveBase = error;
  },
  addSelectedThread (state, { contactId }) {
    if (!state.selectedThreads.includes(contactId)) {
      const newSelectedThreads = [...state.selectedThreads, contactId];
      state.selectedThreads = newSelectedThreads;
    }
  },
  deleteSelectedThread (state, { contactId }) {
    const newSelectedThreads =
      state.selectedThreads.filter(v => v !== contactId);
    state.selectedThreads = newSelectedThreads;
  },
  setBlockPopupVisibility (state, isOpen) {
    state.showBlockContactPopup = isOpen;
  },
  [CLEAR_SELECTED_THREADS] (state) {
    state.selectedThreads = [];
  }
};

const actions = {
  async fetchContacts ({ commit, state }) {
    try {
      const contacts = await chatGraphqlApiService.getContacts();
      commit(SET_CONTACTS, contacts);
      commit(SET_ACCEPTED_CONTACTS, contacts);
      commit(SET_PENDING_CONTACTS, contacts);
      commit(SET_SHOWED_CONTACTS);

      if (state.selectedContact && contacts) {
        let selectedContact = contacts.find(contact => contact.id === state.selectedContact.id);

        if (selectedContact) commit(SET_SELECTED_CONTACT_STATUS, selectedContact.status);
      }
    } catch (error) {
      ErrorReporting(error);

      throw error;
    }
  },
  async fetchArchivedContacts ({ commit }) {
    try {
      commit(SET_CHAT_LOADER);
      const contacts = await chatGraphqlApiService.getArchivedContacts();
      commit(SET_ARCHIVED_CONTACTS, contacts);
      commit(SET_SHOWED_CONTACTS);

      if (state.selectedContact && contacts) {
        let selectedContact = contacts.find(contact => contact.id === state.selectedContact.id);

        if (selectedContact) commit(SET_SELECTED_CONTACT_STATUS, selectedContact.status);
      }
      commit(UNSET_CHAT_LOADER);
    } catch (error) {
      ErrorReporting(error);

      throw error;
    }
  },
  async selectContact ({ commit }, contact) {
    try {
      commit(SET_CHAT_LOADER);
      commit(SET_SELECTED_CONTACT, contact);
      const messages = await chatGraphqlApiService.getContactMessages(contact.id);
      commit(SET_MESSAGES, messages);
      commit(UNSET_CHAT_LOADER);
    } catch (error) {
      ErrorReporting(error);

      throw error;
    }
  },
  async refreshSelectedContactMessages ({ commit, state }) {
    try {
      const messages = await chatGraphqlApiService.getContactMessages(state.selectedContact.id);
      return commit(SET_MESSAGES, messages);
    } catch (error) {
      ErrorReporting(error);

      throw error;
    }
  },
  async updateContactRequestStatus ({ commit, dispatch }, data) {
    try {
      const succeeded = await chatGraphqlApiService.updateContactRequestStatus(data.id, data.status);
      if (succeeded) {
        commit(SET_SELECTED_CONTACT_STATUS, data.status);
        dispatch('refreshSelectedContactMessages');
      }
      return null;
    } catch (error) {
      ErrorReporting(error);

      throw error;
    }
  },
  async sendMessage ({ state, commit }, msg) {
    try {
      const message = Message.buildCandidateMessageFromText({ text: msg.text, senderName: msg.senderName });
      commit(ADD_MESSAGE, message);
      await chatGraphqlApiService.addMessage(state.selectedContact.id, msg.text);
      // TODO: Add here actual error handling on add message mutation and remove message from state on error
    } catch (error) {
      ErrorReporting(error);

      throw error;
    }
  },
  async blockContact ({ commit, dispatch }, id) {
    try {
      commit(SET_CHAT_LOADER);
      const response = await chatGraphqlApiService.blockContact(id);
      if (response.success) {
        commit(SET_SELECTED_CONTACT_STATUS, BLOCKED);
      } else {
        // TODO add error handling
      };
    } catch (error) {
      ErrorReporting(error);

      throw error;
    } finally {
      commit(UNSET_CHAT_LOADER);
    }
  },
  async archiveContact ({ commit, dispatch }, id) {
    try {
      const result = await chatGraphqlApiService.archiveContact(id);
      if (!result.success) {
        commit(MOVE_SELECTED_TO_ARCHIVED);
        commit(SET_ACCEPTED_CONTACTS, state.contacts);
        commit(SET_PENDING_CONTACTS, state.contacts);
        commit(SET_SHOWED_CONTACTS);
        commit(SET_SHOW_ARCHIVE_POPUP, false);
        commit(SET_SHOW_ARCHIVE_POPUP_SUCCESS, true);
        commit(SET_ERROR_FOR_ARCHIVE_ID, null);
        commit(SET_ERROR_FOR_ARCHIVE_BASE, null);
        if (state.showedContacts && state.showedContacts.length > 0) {
          await dispatch('selectContact', state.showedContacts[0]);
          router.push({
            name: 'ProfileChatMessages',
            params: { id: state.showedContacts[0].id }
          });
        } else {
          commit(SET_SHOW_THREADS, true);
          router.push({ name: 'ProfileChat' });
        };
      } else {
        let idError =
          result.errors.id ? result.errors.id[0].message : null;
        let baseError =
          result.errors.base ? result.errors.base[0].message : null;
        commit(SET_ERROR_FOR_ARCHIVE_ID, idError);
        commit(SET_ERROR_FOR_ARCHIVE_BASE, baseError);
      }
    } catch (error) {
      ErrorReporting(error);

      throw error;
    }
  },
  async massArchiveContact ({ commit, dispatch }, ids) {
    try {
      const result = await chatGraphqlApiService.massArchiveContact(ids);
      if (result.success) {
        commit(MOVE_CONTACTS_TO_ARCHIVED, ids);
        commit(SET_ACCEPTED_CONTACTS, state.contacts);
        commit(SET_PENDING_CONTACTS, state.contacts);
        commit(SET_SHOWED_CONTACTS);
        commit(SET_SHOW_MASS_ARCHIVE_POPUP, false);
        commit(SET_SHOW_ARCHIVE_POPUP_SUCCESS, true);
        commit(CLEAR_SELECTED_THREADS);
        commit(SET_ERROR_FOR_ARCHIVE_ID, null);
        commit(SET_ERROR_FOR_ARCHIVE_BASE, null);
        if (state.showedContacts && state.showedContacts.length > 0) {
          dispatch('selectContact', state.showedContacts[0]);
          router.push({ name: 'ProfileChatMessages', params: { id: state.showedContacts[0].id } });
        } else {
          commit(SET_SHOW_THREADS, true);
          router.push({ name: 'ProfileChat' });
        };
      } else {
        let idError = result.errors.ids ? result.errors.ids[0].message : null;
        let baseError = result.errors.base ? result.errors.base[0].message : null;
        commit(SET_ERROR_FOR_ARCHIVE_ID, idError);
        commit(SET_ERROR_FOR_ARCHIVE_BASE, baseError);
      }
    } catch (error) {
      ErrorReporting(error);

      throw error;
    }
  },
  async setActiveTab ({ state, commit, dispatch }, tab) {
    commit(SET_ACTIVE_TAB, tab);
    commit(SET_SHOWED_CONTACTS);
    if (state.showedContacts && state.showedContacts.length > 0) {
      dispatch('selectContact', state.showedContacts[0]);
      router.push({ name: 'ProfileChatMessages', params: { id: state.showedContacts[0].id } });
    } else {
      commit(SET_SHOW_THREADS, true);
      router.push({ name: 'ProfileChat' });
    };
  }
};

const getters = {
  contacts: state => state.contacts,
  acceptedContacts: state => state.acceptedContacts,
  pendingContacts: state => state.pendingContacts,
  archivedContacts: state => state.archivedContacts,
  showedContacts: state => state.showedContacts,
  chatLoader: state => state.chatLoader,
  showThreads: state => state.showThreads,
  selectedContact: state => state.selectedContact,
  messages: (state) => {
    return state.messages.map((message) => {
      if (message instanceof Message) {
        return message;
      } else {
        return new Message(message);
      }
    });
  },
  unreadMessagesCount: (state) => {
    if (!state.contacts) { return 0; }
    return state.contacts.reduce((acc, contact) => {
      return acc + contact.unreadMessagesCount;
    }, 0);
  },
  isShowCompanyInfo (state) {
    return state.showCompanyInfo;
  },
  activeTab: state => state.activeTab,
  selectedThreads: state => state.selectedThreads,
  showArchivePopup: state => state.showArchivePopup,
  showArchivePopupSuccess: state => state.showArchivePopupSuccess,
  showMassArchivePopup: state => state.showMassArchivePopup,
  errorForArchiveId: state => state.errorForArchiveId,
  errorForArchiveBase: state => state.errorForArchiveBase,
  showBlockContactPopup: state => state.showBlockContactPopup
};

const chatStore = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};

export default chatStore;
