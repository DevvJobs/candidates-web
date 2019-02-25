<template>
  <section class="NotFound">
    <h1>404</h1>
    <h4>Sorry, the page you were looking for could not be found</h4>
    <button type="button" v-on:click="goHome()">Go Back</button>
  </section>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goHome: function () {
      this.$router.push({ path: '/' });
    }
  }
};
</script>
<style lang="postcss" scoped>
* {
  margin: 0;
  padding: 0;
}
.NotFound {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: var(--ff-font);
}
.NotFound h4 {
  margin: 2rem;
}
.NotFound button {
  background: linear-gradient(to right, #009eb7 0%, #80deea 100%);
  -moz-border-radius: 28px;
  -webkit-border-radius: 28px;
  border-radius: 28px;
  border: 0;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-size: 17px;
  padding: 16px 31px;
  text-decoration: none;
}
h1 {
  font-size: 150px;
  line-height: 150px;
  font-weight: 700;
  color: #252932;
  text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px,
    rgba(61, 61, 61, 0.3) 3px 3px;
}
</style>
