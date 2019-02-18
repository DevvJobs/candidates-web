export const parseMonthYears = {
  methods: {
    parseYears (months) {
      return Math.round((months - (months % 12)) / 12);
    },
    parseMonth (months) {
      return months % 12;
    }
  }
};
