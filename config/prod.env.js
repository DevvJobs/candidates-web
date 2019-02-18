require('dotenv').config();
const loadVar = require('./load_env_var');

'use strict';

const isTruthy = (value) => {
  return [true, "true", "yes", 1, "1"].includes(value);
};

const asString = (v) => { return `'${v}'`; };
const asIs = (v) => { return `${v}`; };

const nodeEnv = loadVar("NODE_ENV", {required: false});

const intercomEnabled = loadVar("INTERCOM_ENABLED", {
  required: false,
  func: isTruthy
});

const sentryEnabled = loadVar("SENTRY_ENABLED", {
  required: false,
  func: isTruthy
});

const sentryDsn = loadVar("SENTRY_DSN", {
  required: sentryEnabled
});

const developmentMode = loadVar("DEVELOPMENT_MODE", {
  required: false,
  func: isTruthy
})

const appName = loadVar("APP_NAME");

module.exports = {
  NODE_ENV: asString(nodeEnv),
  APP_NAME: asString(appName),
  COMPANIES_LINK: asString(process.env.COMPANIES_LINK),
  CANDIDATES_LINK: asString(process.env.CANDIDATES_LINK),
  API_CANDIDATES_BASE_URL: asString(process.env.API_CANDIDATES_BASE_URL),
  API_TESTS_BASE_URL: asString(process.env.API_TESTS_BASE_URL),
  INTERCOM_ENABLED: asIs(intercomEnabled),
  APP_ENTRY_POINT_FILE: asString(process.env.APP_ENTRY_POINT_FILE),
  SENTRY_ENABLED: asIs(sentryEnabled),
  SENTRY_DSN: asString(sentryDsn),
  DEVELOPMENT_MODE: asIs(developmentMode)
};
