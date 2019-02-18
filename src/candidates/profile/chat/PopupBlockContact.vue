<template>
  <Popup>
    <div class="popup-block-contact" v-click-outside="closePopup">
      <div class="popup-block-contact__content" v-if="allowToSendMessages">
        <svg class="popup-block-contact__icon">
          <use xlink:href="#block"></use>
        </svg>
        <div class="popup-block-contact__title">Are you sure you want to block {{selectedContact.company.name}}?</div>
        <div class="popup-block-contact__text">This company will no longer be able to contact you.</div>
        <div class="popup-block-contact__actions">
          <Button text="Cancel" class="popup-block-contact__btn btn--h40 btn--text" @clicked="closePopup"
                  type="button"></Button>
          <Button @clicked="onBlockContact()" text="Yes, block this company"
                  class="popup-block-contact__btn popup-block-contact__btn--send btn--h40" type="button"></Button>
        </div>
      </div>
      <!--<div class="popup-block-contact__content" v-if="!allowToSendMessages">-->
        <!--<div class="popup-block-contact__title">Block contact not available</div>-->
        <!--<div class="popup-block-contact__text">Available only if contact accept request</div>-->
        <!--<div class="popup-block-contact__actions">-->
          <!--<Button text="Close" class="popup-block-contact__btn btn&#45;&#45;h40 btn&#45;&#45;text" @clicked="closePopup"-->
                  <!--type="button"></Button>-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </Popup>
</template>

<script>
import Button from '@/core/components/form/Button.vue';
import Popup from '@/core/components/popup/Popup';
import { clickOutside } from '@/core/directives/clickOutside';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { ACCEPTED } from '@/core/modules/chat/contactStatuses';

export default {
  components: {
    Button,
    Popup
  },
  directives: {
    clickOutside
  },
  computed: {
    ...mapGetters({
      selectedContact: 'chat/selectedContact'
    }),
    allowToSendMessages: function () {
      return this.selectedContact.status === ACCEPTED;
    }
  },
  methods: {
    ...mapMutations({
      setBlockPopupVisibility: 'chat/setBlockPopupVisibility'
    }),
    ...mapActions({
      blockContact: 'chat/blockContact'
    }),
    closePopup () {
      this.setBlockPopupVisibility(false);
    },
    onBlockContact () {
      this.blockContact(this.$route.params.id)
        .then(() => { /* success */ })
        .catch(() => { /* error */ });
      this.closePopup();
    }
  }
};
</script>

<style lang="postcss" scoped>
  .popup-block-contact {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 570px;
    padding: 20px 20px 16px;
    border-radius: 30px;
    background-color: #fff;
    box-shadow: 0 0 30px 7px rgba(207, 216, 220, .6);
    box-sizing: border-box;
  }
  .popup-block-contact__close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    &:hover {
      svg {
        fill: #90A4AE;
      }
    }
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      fill: #cfd8dc;
      transition: fill .3s ease;
    }
  }
  .popup-block-contact__content {}
  .popup-block-contact__icon {
    display: block;
    width: 48px;
    height: 48px;
    margin: 0 auto 15px;
    fill: #CFD8DC;
  }
  .popup-block-contact__title {
    display: block;
    margin-bottom: 10px;
    font-size: 24px;
    line-height: 26px;
    color: #455A64;
  }
  .popup-block-contact__text {
    display: block;
    font-size: 18px;
    line-height: 20px;
    color: #90A4AE
  }
  .popup-block-contact__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 45px;
  }
  .popup-block-contact__btn {
    display: block;
  }
  .popup-block-contact__btn--send {
    width: 180px;
  }
</style>
