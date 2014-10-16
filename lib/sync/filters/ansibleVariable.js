/**
 * Allow the generation of ansible variable names that are dynamically defined from
 * the Nunjuck template and then avoid to have conflicts between the template formats
 * that are really similar.
 *
 * Currently, this filter do not support to inject Jinja filters
 *
 * @param {String} variableName The variable name to define for Ansible
 * @param {String} suffix Define a suffix to add to the variableName
 * @return {String} The variable name directly injectable in a Jinja2 template (Ex: {{ aVariableName_aVariableSuffix }})
 */
module.exports = function(variableName, suffix) {
  if (suffix === undefined || suffix === null) {
    return "{{ " + variableName + " }}";
  }
  else {
    return "{{ " + variableName + suffix + " }}";
  }
};
