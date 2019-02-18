<template>
  <div class="pagination-content" @click="changeCurrentPage()">
    <div :class="itemClass">
      <div class="number">
        {{pageNumber}}
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    pageNumber: Number,
    currentPage: Number
  },
  computed: {
    itemClass () {
      return (this.pageNumber === this.currentPage) ? 'pagination active' : 'pagination';
    }
  },
  methods: {
    ...mapMutations({
      'setCurrentPage': 'templates/setMessageTemplatesCurrentPage'
    }),
    changeCurrentPage () {
      if (this.currentPage !== this.pageNumber) {
        this.setCurrentPage(this.pageNumber);
      };
    }
  }
};
</script>
<style lang="postcss" scoped>
  .pagination-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    @media (--tablet-viewport) {
      height: 60px;
      width: 60px;
    }
    @media (--phone-viewport) {
      width: 56px;
      height: 56px;
    }
  }
  .pagination {
    display: flex;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #FFFFFF;
    border: 1px solid #CFD8DC;
    overflow: hidden;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg {
      transition: fill .1s ease;
    }
    &:hover {
      svg {
        fill: #455A64;
      }
      .number {
        color: #455A64;
      }
    }
    @media (--tablet-viewport) {
      height: 44px;
      width: 44px;
    }
    @media (--phone-viewport) {
      width: 40px;
      height: 40px;
    }
  }
  .number {
    font-size: 12px;
    color: #90A4AE;
    @media (--tablet-viewport) {
      font-size: 14px;
    }
    @media (--phone-viewport) {
      font-size: 16px;
    }
  }
  .pagination.active {
    background-color: #4DD0E1;
    border: 1px solid #4DD0E1;
    transition: all .3s ease;
    &:hover {
      background-color: #009EB7;
      border: 1px solid #009EB7;
    }
    .number {
      color: #FFFFFF;
    }
    &:hover {
      .number {
        color: #FFFFFF;
      }
    }
  }
</style>
