// thanks to https://www.semicolonworld.com/javascript/tutorial/convert-file-size-bytes-to-kb-mb-gb-javascript
module.exports = (bytes, decimalPoint = 2) => {
  if (bytes == 0) return '0 Bytes';
  let k = 1000,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    index = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    Number.parseFloat((bytes / Math.pow(k, index)).toFixed(decimalPoint)) +
    ' ' +
    sizes[index]
  );
};
