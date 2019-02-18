<template>
  <div :class="showPagination">
    <div class="pagination-content">
      <div :class="leftArrowClass" v-on:click="decreaseCurrentPage()">
        <svg class="back-icon">
          <use xlink:href="#chevron-left"></use>
        </svg>
      </div>
    </div>
    <PaginationItem
      v-for="(item, index) of pagesCount"
      :pageNumber="index+1"
      :currentPage="currentPage"
      v-bind:key="index">
    </PaginationItem>
    <div class="pagination-content">
      <div :class="rightArrowClass" v-on:click="increaseCurrentPage()">
        <svg class="next-icon">
          <use xlink:href="#chevron-left"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import PaginationItem from '@/core/components/PaginationItem';
import { mapGetters, mapMutations } from 'vuex';

export default {
  components: {
    PaginationItem
  },
  props: {
    elementsCount: Number,
    perPage: Number
  },
  computed: {
    ...mapGetters({
      currentPage: 'templates/messageTemplatesCurrentPage'
    }),
    pagesCount () {
      return Math.ceil(this.elementsCount / this.perPage);
    },
    showPagination () {
      return this.pagesCount > 1 ? 'pagination-wrapper' : 'pagination-wrapper-hidden';
    },
    leftArrowClass () {
      return this.currentPage === 1 ? 'pagination disabled' : 'pagination';
    },
    rightArrowClass () {
      return this.currentPage === this.pagesCount ? 'pagination disabled' : 'pagination';
    }
  },
  methods: {
    ...mapMutations({
      'setCurrentPage': 'templates/setMessageTemplatesCurrentPage'
    }),
    increaseCurrentPage () {
      if (this.currentPage < this.pagesCount) {
        this.setCurrentPage(this.currentPage + 1);
      };
    },
    decreaseCurrentPage () {
      if (this.currentPage > 1) {
        this.setCurrentPage(this.currentPage - 1);
      };
    }
  }
};
</script>
<style lang="postcss" scoped>
  .pagination-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
  .pagination-wrapper-hidden {
    display: none;
  }
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
  .back-icon {
    height: 12px;
    fill: #90A4AE;
    position: absolute;
    width: 12px;
  }
  .next-icon {
    height: 12px;
    fill: #90A4AE;
    position: absolute;
    transform: rotate(180deg);
    width: 12px;
  }
  .disabled {
    cursor: default;
    svg {
      fill: #ECEFF1;
    }
    &:hover {
      svg {
        fill: #ECEFF1;
      }
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
