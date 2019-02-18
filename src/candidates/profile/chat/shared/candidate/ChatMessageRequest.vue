<template>
  <div class="chat-message-request">
    <Button text="Decline" class="chat-message-request__btn btn--grey btn--h50" @clicked="updateContactRequest(DECLINED)"></Button>
    <Button text="Accept" class="chat-message-request__btn btn--transparent btn--h50" @clicked="updateContactRequest(ACCEPTED)"></Button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Button from '@/core/components/form/Button';
import { DECLINED, ACCEPTED } from '@/core/modules/chat/contactStatuses';

export default {
  components: {
    Button
  },
  data () {
    return {
      DECLINED: DECLINED,
      ACCEPTED: ACCEPTED
    };
  },
  methods: {
    ...mapActions({
      updateContactRequestStatus: 'chat/updateContactRequestStatus'
    }),
    updateContactRequest (status) {
      this.updateContactRequestStatus({
        id: this.$route.params.id,
        status: status
      })
        .then(() => { /* success */ })
        .catch(() => { /* error */ });
    }
  }
};
</script>

<style lang="postcss" scoped>
  .chat-message-request {
    display: flex;
    justify-content: center;
    width: 100%;
    }
    .chat-message-request__btn {
      flex: 1;
      max-width: 180px;
      margin: 0 20px;
      @media (--phone-viewport) {
        margin: 0 15px;
    }
  }
</style>
