var postcss = require('postcss');
module.exports = postcss.plugin('postcss-gent', function(opts) {
  var options = Object.assign({
    componentInputPrefix: 'comp--',
    elementInputPrefix: 'elem--',
    roleInputPrefix: 'is--',
    stateInputPrefix: 'has--',
    selectorInputPrefix: 'sel--',

    libName: 'gent',
  }, opts);

  var compRxp = new RegExp(`(.*)\\.${options.componentInputPrefix}([a-zA-Z0-9]+)(.*)`);
  var elemRxp = new RegExp(`(.*)\\.${options.elementInputPrefix}([a-zA-Z0-9]+)(.*)`);
  var roleRxp = new RegExp(`(.*)\\.${options.roleInputPrefix}([a-zA-Z0-9]+)(.*)`);
  var stateRxp = new RegExp(`(.*)\\.${options.stateInputPrefix}([a-zA-Z0-9]+)(.*)`);
  var selectorRxp = new RegExp(`(.*)\\.${options.selectorInputPrefix}([a-zA-Z0-9]+)-([a-zA-Z0-9]+)(.*)`);

  return function(css, result) {

    // components
    css.walkRules(compRxp, function(component) {
      var matches = component.selector.match(compRxp);
      var componentName = matches[2];

      component.selector = component.selector.replace(compRxp, `$1.${options.libName}-$2$3`);

      // elements
      component.walkRules(elemRxp, function(element) {
        var matches = element.selector.match(elemRxp);
        var elementName = matches[2];

        element.selector = element.selector.replace(elemRxp, `$1.${options.libName}-${componentName}-$2$3`);
        element.moveAfter(component);
      });
    });

    // roles
    css.walkRules(roleRxp, function(role) {
      var matches = role.selector.match(roleRxp);
      var roleName = matches[2];

      role.selector = role.selector.replace(roleRxp, `$1.${options.libName}-is-$2$3`);
    });

    // states
    css.walkRules(stateRxp, function(state) {
      var matches = state.selector.match(stateRxp);
      var stateName = matches[2];

      state.selector = state.selector.replace(stateRxp, `$1.${options.libName}-has-$2$3`);
    });

    // selectors
    css.walkRules(selectorRxp, function(sel) {
      var matches = sel.selector.match(selectorRxp);
      var componentName = matches[2];
      var elementName = matches[3];

      sel.selector = sel.selector.replace(selectorRxp, `$1.${options.libName}-$2-$3$4`);
    });

  };

});
