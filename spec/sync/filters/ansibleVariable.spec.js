var _ = require('underscore'),
    path = require('path'),
    ansibleVariable = require('../../../lib/sync/filters/ansibleVariable.js');

describe("Filters - Sync - Ansible Variable", function() {
  it("The filter should generate a ready to use variable for a Jinja template", function() {
    var result = ansibleVariable('thisIsAVariableName');

    expect(result).toEqual('{{ thisIsAVariableName }}');
  });

  it("The filter should generate a ready to use variable for Jinja template with a suffix appened to the variable name", function() {
    var result = ansibleVariable('thisIsAVariableName', '_withASuffix');

    expect(result).toEqual('{{ thisIsAVariableName_withASuffix }}');
  });
});
