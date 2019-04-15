const isEnabled = process.env.INTERCOM_ENABLED;
const appId = 'ujgdcc2t';

class Intercom {
  constructor (newAppId, {
    name,
    email,
    companyName,
    country,
    tests,
    skills
  } = {}) {
    this.settings = {
      app_id: newAppId,
      name: name,
      email: email,
      companyName: companyName,
      country: country,
      Tests: tests,
      Skill: skills
    };
  }
  boot ({
    name = null,
    email = null,
    companyName = null,
    country = null,
    tests = null,
    skills = null
  } = {}) {
    if (isEnabled) {
      let intercomSettings = new Intercom(appId);
      intercomSettings = new Intercom(appId, {
        name, email, companyName, country, tests, skills
      });
      window.intercomSettings = intercomSettings.settings;
      setTimeout(() => window.Intercom('boot'), 0);
    }
  }

  shutdown () {
    if (isEnabled) {
      setTimeout(() => window.Intercom('shutdown'), 0);
    }
  }

  hideLauncher (value) {
    if (isEnabled) {
      setTimeout(
        _ => window.Intercom('update', { hide_default_launcher: value }),
        0
      );
    }
  }
}

export default new Intercom();
