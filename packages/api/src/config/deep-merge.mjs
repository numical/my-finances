// thanks to: https://gist.github.com/danieldietrich/0bd56068825a78321d532ce021d38edc
function merge(dst, source) {
  for (const [key, value2] of Object.entries(source)) {
    const value1 = dst[key];
    dst[key] =
      Array.isArray(value1) && Array.isArray(value2)
        ? [...value1, ...value2]
        : value1 instanceof Object && value2 instanceof Object
        ? merge(value1, value2)
        : value1 === undefined || value2 !== undefined
        ? value2
        : value1;
  }
  return dst;
}
export default (target, ...sources) => sources.reduce(merge, target);
