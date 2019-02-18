'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');
require('dotenv').config();

// NOTE: Please place here only dev-specific env vars.
// The envs that are shared between prod and dev envs should go to prod.env
// instead, since it's used as base here as well.
// --- 2018-12-19 - Ivan Kolmychek
module.exports = merge(prodEnv, {
});
