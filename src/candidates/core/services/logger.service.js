import {UAParser} from 'ua-parser-js';
import {
  candidateSentryClient
} from '@/candidates/core/services/candidate.sentry.client';

const parser = new UAParser();

export class Logger {
  constructor (responseText) {
    this.info = {
      date: new Date().toString(),
      browser: `${parser.getBrowser().name}, ${parser.getBrowser().version} `,
      OSName: parser.getOS().name,
      responseText: responseText
    };
  }

  error () {
    candidateSentryClient.withScope(scope => {
      scope.setLevel('error');

      scope.setTag('os_name', this.info.OSName);
      scope.setTag('browser', this.info.browser);

      candidateSentryClient.captureMessage(this.info.responseText);
    });
  }
}
