export const formError = {
  data: () => {
    return {
      error: null,
      errors: null
    };
  },
  methods: {
    formErrorAdd (keys) {
      if (this.errors) {
        let element;
        keys.forEach((key) => {
          if (this.errors.hasOwnProperty(key)) {
            element = this.errors[key];
            return false;
          }
        });
        return element ? element[0].message : null;
      } else {
        return null;
      }
    },
    formErrorClear (key) {
      if (this.errors && this.errors[key]) {
        this.errors[key][0].message = '';
      }
    }
  }
};
