sportApp.directive('setHeight', function($window){
  return{
    link: function(scope, element, attrs){
    	var offset = attrs.setHeight ? attrs.setHeight : 60
        element.css('max-height', $window.innerHeight - offset + 'px');
    }
  }
})