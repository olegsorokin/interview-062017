const truncate = (str, size = 50, postf = '...') => {
  if (str.length > size) {
    return str.substring(0, size - postf.length) + postf;
  }
  return str;
};
