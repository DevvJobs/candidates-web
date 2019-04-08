<template>
  <button class="btn" :type="type" @click="onClickButton">{{text}}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'submit'
    }
  },
  methods: {
    onClickButton (event) {
      this.$emit('clicked', event.target.value);
    }
  }
};
</script>

<style lang="postcss" scoped src="@/core/components/form/Button.css">
</style>
