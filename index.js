var postcss = require('postcss');
module.exports = postcss.plugin('postcss-gent', function(opts) {
  var options = Object.assign({
    componentInputPrefix: 'comp--',
    elementInputPrefix: 'elem--',
    roleInputPrefix: 'is--',
    stateInputPrefix: 'has--',

    outputPrifix: 'gent',
  }, opts);

  var compRxp = new RegExp(`(.*)\\.${options.componentInputPrefix}([a-zA-Z0-9]+)(.*)`);
  var elemRxp = new RegExp(`(.*)\\.${options.elementInputPrefix}([a-zA-Z0-9]+)(.*)`);
  var roleRxp = new RegExp(`(.*)\\.${options.roleInputPrefix}([a-zA-Z0-9]+)(.*)`);
  var stateRxp = new RegExp(`(.*)\\.${options.stateInputPrefix}([a-zA-Z0-9]+)(.*)`);

  return function(css, result) {

    // components
    css.walkRules(compRxp, function(component) {
      var matches = component.selector.match(compRxp);
      var componentName = matches[2];

      console.log(componentName)
      component.selector = component.selector.replace(compRxp, `$1.${options.outputPrifix}-$2$3`);

      // elements
      component.walkRules(elemRxp, function(element) {
        var matches = element.selector.match(elemRxp);
        var elementName = matches[2];

        console.log(elementName)
        element.selector = element.selector.replace(elemRxp, `$1.${options.outputPrifix}-${componentName}-$2$3`);
        element.moveAfter(component);
      });
    });

    // roles
    css.walkRules(roleRxp, function(role) {
      var matches = role.selector.match(roleRxp);
      var roleName = matches[2];

      role.selector = role.selector.replace(roleRxp, `$1.${options.outputPrifix}-is-$2$3`);

      console.log(roleName)
    });

    // states
    css.walkRules(stateRxp, function(state) {
      var matches = state.selector.match(stateRxp);
      var stateName = matches[2];

      state.selector = state.selector.replace(stateRxp, `$1.${options.outputPrifix}-has-$2$3`);

      console.log(stateName)
    });

  };

});
