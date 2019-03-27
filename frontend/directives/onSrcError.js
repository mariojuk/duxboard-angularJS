sportApp.directive('onSrcError', function() {
  return {
    restrict:'A',
    link: function(scope, element, attr) {
      element.on('error', function() {
        element.attr('src', attr.onSrcError);
      })
    }
  }
})