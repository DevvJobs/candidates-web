import store from '@/candidates/store/index';
const TIMER_STEPS = 10;
const TIMER_INTERVAL = TIMER_STEPS * 1000;
class ApiPollingService {
  constructor (
    fetchContactsTimer,
    fetchCandidateTimer
  ) {
    this.fetchContactsTimer = fetchContactsTimer;
    this.fetchCandidateTimer = fetchCandidateTimer;
  }
  startFetchContactsTimer () {
    this.fetchContactsTimer = setInterval(() => {
      store.dispatch('chat/fetchContacts')
        .then(() => { /* success */ })
        .catch(() => { /* error */ });
    }, TIMER_INTERVAL);
  }

  startFetchCandidateTimer () {
    this.fetchCandidateTimer = setInterval(() => {
      store.dispatch('profile/updateCandidateCounter')
        .then(() => { /* success */ })
        .catch(() => { /* error */ });
    }, TIMER_INTERVAL);
  }

  clearFetchContactsTimer () {
    clearInterval(this.fetchContactsTimer);
  }

  clearFetchCandidateTimer () {
    clearInterval(this.fetchCandidateTimer);
  }
}

export default new ApiPollingService();
