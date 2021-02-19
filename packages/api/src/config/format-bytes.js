// thanks to https://www.semicolonworld.com/javascript/tutorial/convert-file-size-bytes-to-kb-mb-gb-javascript
module.exports = (bytes, decimalPoint = 2) => {
  if (bytes == 0) return '0 Bytes';
  let k = 1000,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(decimalPoint)) + ' ' + sizes[i]
  );
};
