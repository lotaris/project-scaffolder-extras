var path = require('path');

/**
 * Transform a syntax a.b.c to a path syntax like a/b/c
 *
 * @param {String} pkg The package name to transform
 * @return {String} The path generated from the package
 */
module.exports = function(pkg) {
  return pkg.replace(/\./g, path.sep);
};
