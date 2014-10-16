var _ = require('underscore'),
    path = require('path'),
    roxKeyFactory = require('../../../lib/async/filters/roxKey.js');

describe("Filters - Async - ROX Key", function() {
  var roxKey;
  var roxClient;
  var roxConfig;
  var roxApi;
  var loadFunction;

  beforeEach(function() {
    loadFunction = jasmine.createSpy();

    roxConfig = function() {
      return {
        servers: {
          projectServerName: {
            apiUrl: "url",
            apiKeyId: "keyId",
            apiKeySecret: "keySecret"
          }
        },
        load: loadFunction
      };
    };

    roxApi = {
      request: jasmine.createSpy()
    };

    roxClient = {
      Config: roxConfig,
      api: roxApi
    };

    roxKey = roxKeyFactory(roxClient);
  });

  it("Filter should call a callback with a ROX key", function() {
    roxApi.request.andCallFake(function(options) {
      expect(options).toBeDefined();
      expect(options.apiUrl).toEqual("url");
      expect(options.apiKeyId).toEqual("keyId");
      expect(options.apiKeySecret).toEqual("keySecret");
      expect(options.body).toEqual(JSON.stringify({ projectApiId: "projectId" }));

      return {
        then: function(fn) {
          fn({
            statusCode: 200,
            body: '{ "_embedded": { "item": [ { "value": "roxTestKey" } ] } }'
          });
          return {
            catch: jasmine.createSpy()
          };
        }
      };
    });

    var callback = jasmine.createSpy().andCallFake(function(error, result) {
      expect(result).toEqual("roxTestKey");
    });

    roxKey("projectId", "projectServerName", callback);

    waitsFor(function() {
      return callback.calls.length;
    }, "callback should have been called", 100);

    runs(function() {
      expect(loadFunction).toHaveBeenCalled();
      expect(roxApi.request).toHaveBeenCalled();
    });
  });

  it("Filter should call a callback with an error key when ROX Center do not answer a 200", function() {
    roxApi.request.andCallFake(function(options) {
      return {
        then: function(fn) {
          fn({
            statusCode: 201
          });
          return {
            catch: jasmine.createSpy()
          };
        }
      };
    });

    var callback = jasmine.createSpy().andCallFake(function(error, result) {
      expect(result).toEqual("UNABLE_TO_GENERATE_ROX_TEST_KEY");
    });

    roxKey("projectId", "projectServerName", callback);

    waitsFor(function() {
      return callback.calls.length;
    }, "callback should have been called", 100);
  });

  it("Filter should call a callback with an error key when there is any error", function() {
    roxApi.request.andCallFake(function(options) {
      return {
        then: function(fn) {
          return {
            catch: function(fn) {
              fn(new Error("The error is not important there"));
            }
          };
        }
      };
    });

    var callback = jasmine.createSpy().andCallFake(function(error, result) {
      expect(result).toEqual("UNKNOW_ERROR_OCCURED_PREVENTING_ROX_TEST_KEY_GENERATION");
    });

    roxKey("projectId", "projectServerName", callback);

    waitsFor(function() {
      return callback.calls.length;
    }, "callback should have been called", 100);
  });
});
