const getFormatedToday = (standardDate) => {
  const date = standardDate ? new Date(standardDate) : new Date();
  const year = date.getFullYear();
  const month = ('0' + (1 + date.getMonth())).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hour = ('0' + date.getHours()).slice(-2);
  const min = ('0' + date.getMinutes()).slice(-2);
  const sec = ('0' + date.getSeconds()).slice(-2);

  if (standardDate) {
    return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
  } else {
    return year + '-' + month + '-' + day + '_' + hour + '-' + min + '-' + sec;
  }
};

const formatDate = (date) => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('.');
};

const isBase64 = (str) => {
  try {
    return str.substring(0, 5) === 'data:' ? true : false;
  } catch (err) {
    return false;
  }
};

export { getFormatedToday, isBase64, formatDate };
