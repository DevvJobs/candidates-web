<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import apiPollingService from '@/candidates/profile/api-polling.service';

export default {
  destroyed () {
    apiPollingService.clearFetchCandidateTimer();
    apiPollingService.clearFetchContactsTimer();
  }
};
</script>
