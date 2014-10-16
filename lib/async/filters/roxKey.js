var _ = require('underscore'),
    Q = require('q');

module.exports = function(roxClient) {
  // To manage some dirty logging
  var roxFirstKey = true;

  // Load the ROX configuration
  var roxConfig = new roxClient.Config();
  roxConfig.load();

  /**
   * Filter to generate ROX test keys directly from the ROX Center server
   *
   * @param {String} projectKey The project key to identify the right project on ROX Center
   * @param {String} roxServer The ROX Center server name to retrieve its configuration (credentials and URL)
   * @param {Function} callback The callback function given by Nunjucks
   */
  return function(projectKey, roxServer, callback) {
    // Prepare the request body
    var serializedPayload = JSON.stringify({
      projectApiId: projectKey
    });

    // Log a message to tell the user that there is at least one ROX key to generate
    if (roxFirstKey) {
      roxFirstKey = false;
      console.log("Generation of ROX keys. This can take few minutes.");
    }

    // Do the request to get the ROX key
    Q.call(
      roxClient.api.request(
        _.extend(
          _.pick(roxConfig.servers[roxServer], 'apiUrl', 'apiKeyId', 'apiKeySecret'),
          {
            apiRel: 'v1:testKeys',
            method: 'POST',
            body: serializedPayload,
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': serializedPayload.length,
            }
          }
        )
      )

      // Handle the response from the request
      .then(function(response) {
        if (response.statusCode === 200) {
          var roxTestKeyGenerated = JSON.parse(response.body)._embedded.item[0].value;
            // Logging to show activity
            process.stdout.write('.');
            callback(null, roxTestKeyGenerated);
          }
        else {
          console.log(response.statusCode);
          console.log(response.body);
          callback(null, "UNABLE_TO_GENERATE_ROX_TEST_KEY");
        }
      })

      // Dirty logging in case of error
      .catch(function(error) {
        callback(null, "UNKNOW_ERROR_OCCURED_PREVENTING_ROX_TEST_KEY_GENERATION");
        console.log(error);
      })
    );
  };
};

module.exports['@singleton'] = true;
module.exports['@require'] = ['rox-client-node'];
