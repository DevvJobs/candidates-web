<template>
  <div>
    <Loader v-if="loading" :text="true"></Loader>
    <router-view></router-view>
    <popupBlockContact v-if="showBlockContactPopup"></popupBlockContact>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PopupBlockContact from '@/candidates/profile/chat/PopupBlockContact';
import Loader from '@/core/components/Loader.vue';

export default {
  components: {
    PopupBlockContact,
    Loader
  },
  computed: {
    ...mapGetters({
      loading: 'loading',
      showBlockContactPopup: 'chat/showBlockContactPopup'
    })
  }
};
</script>
