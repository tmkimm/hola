export const getBadgeTitle = (type) => {
  if (type === 'conference') return '컨퍼런스';
  else if (type === 'hackathon') return '해커톤';
  else if (type === 'contest') return '공모전';
  else if (type === 'bootcamp') return '부트캠프';
  else return '기타';
};

export const getBadgeColor = (type) => {
  if (type === 'conference') return '#4A5E75';
  else if (type === 'hackathon') return '#3E86F5';
  else if (type === 'contest') return '#6E3EF5';
  else if (type === 'bootcamp') return '#00B488';
  else return '#4A5E75';
};
