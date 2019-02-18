import Select from '@/core/components/form/Select.vue';

export const autocomplete = {
  components: {
    Select
  },
  data () {
    return {
      template: Select,
      chosenLocation: null,
      items: null,
      error: ''
    };
  },
  methods: {
    clearError () {
      this.error = null;
    },
    getLabel (item) {
      return item && item.name;
    }
  }
};
