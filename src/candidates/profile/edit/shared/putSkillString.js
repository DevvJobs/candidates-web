export let putSkillString = (skills) => {
  return skills.map((skill, index) => {
    return `
      skill_${index}: putSkill(id: "${skill.id}", skillId: "${skill.skill.id}", monthsOfExperience: ${skill.monthsOfExperience}) {
        candidateSkill { id monthsOfExperience skill { id name } }
        errors { id { error message } monthsOfExperience { error message } skillId { error message }}
      }
    `;
  }).join();
};
