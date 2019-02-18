import * as Sentry from '@sentry/browser';

const enabled = process.env.SENTRY_ENABLED;
const dsn = process.env.SENTRY_DSN;

if (enabled) {
  Sentry.init({
    dsn: dsn
  });
}

// NOTE: Doesn't look like Sentry provides "instantiatable" client.
// So let's try to return the global one.
// --- 2018-12-18 - Ivan Kolmychek
export const candidateSentryClient = Sentry;
