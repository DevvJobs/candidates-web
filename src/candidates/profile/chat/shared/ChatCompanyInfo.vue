<template>
  <div class="chat__company">
    <button class="chat__company-close-btn" @click="setCompanyInfoVisibility(!isShowCompanyInfo)">
      <svg class="chat__company-close-btn-icon">
        <use xlink:href="#cross"></use>
      </svg>
    </button>
    <div class="chat__company-avatar">
      <Avatar :type="'large'" :name="selectedContact.company.name"></Avatar>
    </div>
    <h3 class="chat__company-name">{{selectedContact.company.name}}</h3>
    <h4 class="chat__company-subtitle">REPRESENTATIVE</h4>
    <ul class="chat__company-list">
      <li class="chat__company-list-item">
        <Avatar :name="selectedContact.latestRepresentative"></Avatar>
        <p class="chat__company-text">{{selectedContact.latestRepresentative}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import Avatar from '@/core/components/Avatar';

export default {
  name: 'ChatCompanyInfo',
  props: [
    'selectedContact'
  ],
  computed: {
    ...mapGetters({
      isShowCompanyInfo: 'chat/isShowCompanyInfo'
    })
  },
  components: {
    Avatar
  },
  methods: {
    ...mapMutations({
      setCompanyInfoVisibility: 'chat/setCompanyInfoVisibility'
    })
  }
};
</script>

<style lang="postcss" scoped>
  .chat__company {
    display: block;
  }
  .chat__company-close-btn {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
  }
  .chat__company-close-btn-icon {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 12px;
    height: 12px;
    fill: #CFD8DC;
  }
  .chat__company-avatar {
    display: block;
    margin: 40px auto 20px;
    width: 128px;
    height: 128px;
    background-color: #ECEFF1;
    border-radius: 50%;
  }
  .chat__company-avatar-img {
    display: block;
    width: 128px;
    height: 128px;
    border-radius: 50%;
    object-fit: cover;
  }
  .chat__company-name {
    text-align: center;
    margin-bottom: 50px;
    padding: 0 15px;
    font-size: 20px;
    color: #455A64;
  }
  .chat__company-subtitle {
    margin-bottom: 15px;
    padding: 0 15px;
    font-size: 14px;
    color: #CFD8DC;
  }
  .chat__company-list {
    padding: 0 15px;
    margin-bottom: 30px;
  }
  .chat__company-list-item {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    &:last-child {
      padding-bottom: 0;
    }
  }
  .chat__company-text {
    margin-left: 20px;
    color: #455A64;
    word-break: break-word;
  }
</style>
