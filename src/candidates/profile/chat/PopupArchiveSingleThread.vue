<template>
  <Popup>
    <div class="popup-archive-thread" v-click-outside="hidePopup">
      <div class="popup-archive-thread__content">
        <div class="popup-archive-thread__close " @click="hidePopup">
          <svg class="popup-archive-thread__close-icon">
            <use xlink:href="#cross"></use>
          </svg>
        </div>
        <div class="popup-archive-thread__header-wrapper">
          <svg class="popup-archive-thread__icon">
            <use xlink:href="#archive"></use>
          </svg>
          <div class="popup-archive-thread__header">Archive thread</div>
        </div>
        <div class="popup-archive-thread__title">Are you sure you want to archive this thread?</div>
        <div class="popup-archive-thread__actions">
          <div class="popup-archive-thread__error-message-wrapper">
            <span class="popup-archive-thread__error-message" v-if="errorForArchiveId">{{errorForArchiveId}}</span>
            <span class="popup-archive-thread__error-message" v-if="errorForArchiveBase">{{errorForArchiveBase}}</span>
          </div>
          <Button
            text="No, I changed my mind"
            class="popup-archive-thread__btn btn--h40 btn--text"
            type="button"
            @clicked="hidePopup"
          ></Button>
          <Button
            text="Yes, archive thread!"
            class="popup-archive-thread__btn popup-archive-thread__btn--send btn--h40"
            type="button"
            @clicked="archive"
          ></Button>

        </div>
      </div>
    </div>
  </Popup>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Button from '@/core/components/form/Button.vue';
import Popup from '@/core/components/popup/Popup';
export default {
  components: {
    Button,
    Popup
  },
  props: {
    id: String
  },
  computed: {
    ...mapGetters({
      errorForArchiveId: 'chat/errorForArchiveId',
      errorForArchiveBase: 'chat/errorForArchiveBase'
    })
  },
  methods: {
    ...mapMutations({
      'setShowArchivePopup': 'chat/setShowArchivePopup',
      'setErrorForArchiveId': 'chat/setErrorForArchiveId',
      'setErrorForArchiveBase': 'chat/setErrorForArchiveBase'
    }),
    ...mapActions({
      'archiveContact': 'chat/archiveContact'
    }),
    hidePopup () {
      this.setShowArchivePopup(false);
    },
    archive () {
      this.archiveContact(this.id).then(() => {
        // Success.
      }).catch(() => {
        // Unexpected error.
      });
    }
  },
  destroyed () {
    this.setErrorForArchiveId(null);
    this.setErrorForArchiveBase(null);
  }
};
</script>

<style lang="postcss" scoped>
  .popup-archive-thread {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 480px;
    padding: 20px 20px 16px;
    border-radius: 30px;
    background-color: #fff;
    box-shadow: 0 0 30px 7px rgba(207, 216, 220, .6);
    box-sizing: border-box;
  }
  .popup-archive-thread__close {
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
  .popup-archive-thread__content {}
  .popup-archive-thread__header-wrapper {
    display: flex;
    align-items: center;
    flex-direction: row;
    padding-bottom: 20px;
    @media (--tablet-viewport) {
      flex-direction: column;
      text-align: center;
    }
  }
  .popup-archive-thread__header {
    display: inline-block;
    font-size: 28px;
    line-height: 38px;
    color: #90A4AE;
    font-weight: 300;
    @media (--tablet-viewport) {
      display: block;
      font-size: 30px;
      line-height: 36px;
    }
  }
  .popup-archive-thread__icon {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-right: 15px;
    fill: #CFD8DC;
    @media (--tablet-viewport) {
      display: block;
      width: 48px;
      height: 48px;
      margin: 0 auto 15px;
    }
  }
  .popup-archive-thread__title {
    display: block;
    margin-bottom: 10px;
    font-size: 20px;
    line-height: 28px;
    color: #455A64;
  }
  .popup-archive-thread__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    flex-wrap: wrap;
    @media (--phoneLarge-viewport) {
      justify-content: center;
      flex-direction: column;
      align-items: center;
      :nth-child(1) {
        order: 1;
      }
      :nth-child(2) {
        order: 3;
      }
      :nth-child(3) {
        order: 2;
      }
    }
  }
  .popup-archive-thread__btn {
    display: block;
  }
  .popup-archive-thread__btn--send {
    width: 150px;
    @media (--phoneLarge-viewport) {
      width: 180px;
      margin-bottom: 10px;
    }
  }
  .popup-archive-thread__error-message-wrapper {
    height: 25px;
    width: 100%;
    flex: 0 0 auto;
    text-align: right;
    @media (--phoneLarge-viewport) {
      text-align: center;
    }
  }
  .popup-archive-thread__error-message {
    content: '';
    left: 0;
    font-size: 11px;
    line-height: 1;
    color: #4DD0E1;
    display: inline-block;
    @media (--phoneLarge-viewport) {
      padding-bottom: 10px;
    }
  }
</style>
