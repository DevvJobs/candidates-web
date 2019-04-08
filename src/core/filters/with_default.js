import Vue from 'vue';

Vue.filter('with_default', (value, defaultValue) => {
  return value || defaultValue;
});
