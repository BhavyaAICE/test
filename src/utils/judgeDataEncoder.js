/**
 * Utility functions to encode and decode judge data for cross-device access
 * Data is encoded in the URL so it works across different browsers and devices
 */

export const encodeJudgeData = (judgeData) => {
  try {
    const jsonString = JSON.stringify(judgeData);
    return btoa(encodeURIComponent(jsonString));
  } catch (error) {
    console.error('Error encoding judge data:', error);
    return null;
  }
};

export const decodeJudgeData = (encodedData) => {
  try {
    const jsonString = decodeURIComponent(atob(encodedData));
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error decoding judge data:', error);
    return null;
  }
};

export const createJudgeLink = (judge, eventId, eventName, teams) => {
  const assignedTeams = teams.filter(team =>
    (judge.assignedTeams || []).includes(team.id)
  );

  const judgePayload = {
    id: judge.id,
    name: judge.name,
    email: judge.email,
    category: judge.category,
    token: judge.token,
    eventId: eventId,
    eventName: eventName,
    assignedTeams: assignedTeams.map(t => ({
      id: t.id,
      name: t.name,
      projectTitle: t.projectTitle || '',
      categoryId: t.categoryId || ''
    }))
  };

  const encoded = encodeJudgeData(judgePayload);
  const baseUrl = window.location.origin;
  return `${baseUrl}/judge-dashboard?data=${encoded}`;
};
