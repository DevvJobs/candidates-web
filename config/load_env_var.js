'use strict'

/**
 * Arguments:
 *  - name : string - name of variable to load.
 *  - options : object - see below.
 *
 * Options:
 *  - required - Raise if value is undefined and no default given?
 *               Defaults to "true".
 *
 *  - default - value to use if env var is not defined.
 *              Defaults to "undefined".
 *
 *  - func - Function to post-process value.
 *           Defaults to identity function ((v) => v)
 */

const provideDefault = (value, defaultValue) => {
  if (value === undefined) { return defaultValue; };
  return value;
};

const loadValue = (name, opts = {}) => {
  const required = provideDefault(opts.required, true);
  const defaultValue = provideDefault(opts.default, undefined);

  const value = provideDefault(process.env[name], defaultValue);

  if (value !== undefined) {
    return value;
  }

  if (required === true) {
    const msg =
      `Environment variable ${name} is required, yet it is undefined.`;
    throw msg;
  }

  return undefined;
}

module.exports = (name, opts = {}) => {
  const resultValue = loadValue(name, opts);
  const func = provideDefault(opts.func, ((v) => v));
  return func(resultValue);
};
