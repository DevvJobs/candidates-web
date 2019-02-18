import Vue from 'vue';

Vue.filter('pluralize', (word, amount) => {
  if (amount === 0) {
    return '';
  }
  const ending = amount > 1 ? 's' : '';
  return `${word}${ending}`;
});
