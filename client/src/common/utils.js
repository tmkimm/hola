const getFormatedToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  const min = ("0" + date.getMinutes()).slice(-2);
  const sec = ("0" + date.getSeconds()).slice(-2);

  return year + "-" + month + "-" + day + "_" + hour + "-" + min + "-" + sec;
};

const isBase64 = (str) => {
  try {
      return str.substring(0, 5) == 'data:' ? true : false;
  } catch (err) {
    return false;
  }
};

export { getFormatedToday, isBase64 };
