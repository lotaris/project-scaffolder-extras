var _ = require('underscore'),
    path = require('path'),
    folderize = require('../../../lib/sync/filters/folderize.js');

describe("Filters - Sync - Folderize", function() {
  it("Package name should be transformed to folder name", function() {
    var result = folderize('a.b.c.d.e.f');

    expect(result).toEqual(path.join('a', 'b', 'c', 'd', 'e', 'f'));
  });
});
