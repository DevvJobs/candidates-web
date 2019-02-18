<template>
  <div class="dashboard">
    <div class="dashboard__content">
      <div class="dashboard__list">
        <div class="dashboard__col">
          <div class="dashboard__item">
            <DashboardMessage></DashboardMessage>
          </div>
          <div class="dashboard__item">
            <div class="dashboard__title">
              <span class="dashboard__text">Skills</span>
              <router-link :to="{ path: '/profile/edit#skills' }" class="dashboard__btn-edit">
                <svg class="dashboard__btn-icon">
                  <use xlink:href="#pencil"></use>
                </svg>
              </router-link>
            </div>
            <DashboardSkills :skills="candidate.skills"></DashboardSkills>
          </div>
        </div>
        <div class="dashboard__col">
          <div class="dashboard__item">
            <div class="dashboard__title">
              <span class="dashboard__text">General info</span>
              <router-link :to="{ name: 'ProfileEdit' }" class="dashboard__btn-edit">
                <svg class="dashboard__btn-icon">
                  <use xlink:href="#pencil"></use>
                </svg>
              </router-link>
            </div>
            <DashboardInfo :candidate="candidate"></DashboardInfo>
          </div>
          <div class="dashboard__item">
            <div class="dashboard__title">
              <span class="dashboard__text">Finished tests</span>
              <router-link :to="{name: 'CandidateTests'}" class="dashboard__btn-edit">
                <svg class="dashboard__btn-icon">
                <use xlink:href="#pencil"></use>
                </svg>
              </router-link>
            </div>
            <DashboardTests></DashboardTests>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DashboardInfo from '@/candidates/profile/dashboard/shared/DashboardInfo.vue';
import DashboardSkills from '@/candidates/profile/dashboard/shared/DashboardSkills.vue';
import DashboardMessage from '@/candidates/profile/dashboard/shared/DashboardMessage.vue';
import DashboardTests from '@/candidates/profile/dashboard/shared/DashboardTests.vue';

export default {
  components: {
    DashboardInfo,
    DashboardSkills,
    DashboardMessage,
    DashboardTests
  },
  name: 'Dashboard',
  computed: {
    ...mapGetters({
      'candidate': 'profile/candidate'
    })
  }
};
</script>

<style lang="postcss">
  .dashboard {
    height: 100vh;
    min-height: calc(100vh - 50px); /* header height */
    height: auto !important;
    background-color: #F8F9FA;
  }
  .dashboard__content {
    max-width: 1400px;
    padding: 50px;
    box-sizing: border-box;
    @media (--tablet-viewport) {
      padding: 90px 50px 50px;
    }
    @media (--phoneLarge-viewport) {
      padding: 90px 20px 50px;
    }
  }
  .dashboard__list {
    display: flex;
    margin: 0 -20px;
    flex-wrap: wrap;
    @media (--desktopLarge-viewport) {
      flex-wrap: wrap;
    }
  }
  .dashboard__col {
    display: block;
    width: 33.3333%;
    width: 50%;
    padding: 0 20px;
    box-sizing: border-box;
    @media (--desktopLarge-viewport) {
      width: 50%;
    }
    @media (--desktop-viewport) {
      width: 100%;
    }
  }
  .dashboard__item {
    width: 100%;
    margin-bottom: 42px;
    padding: 20px 20px 20px 20px;
    background-color: #fff;
    border-radius: 24px;
    box-shadow: 0 0 15px 2px rgba(207, 216, 220, .6);
    box-sizing: border-box;
    min-height: 220px;
    @media (--phoneLarge-viewport) {
      margin-bottom: 30px;
      padding: 20px;
    }
  }

  .dashboard__item--disabled {
    opacity: .3;
  }

  .dashboard__title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .dashboard__text {
    display: block;
    font-size: 12px;
    line-height: 16px;
    color: #90A4AE;
    text-transform: uppercase;
    font-weight: 600;
  }

  .dashboard__btn-edit {
    display: block;
  }

  .dashboard__btn-icon {
    width: 16px;
    height: 16px;
    fill: #CFD8DC;
    transition: fill .3s ease;
    &:hover {
      fill: #4DD0E1;
    }
  }
</style>
