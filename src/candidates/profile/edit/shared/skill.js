const uuidv4 = require('uuid/v4');

export class CandidateSkill {
  constructor (
    monthsOfExperience,
    skill
  ) {
    this.__typename = 'CandidateSkill';
    this.id = uuidv4();
    this.monthsOfExperience = monthsOfExperience;
    this.skill = {
      __typename: 'skill',
      id: skill.id,
      name: skill.name
    };
  }
}
