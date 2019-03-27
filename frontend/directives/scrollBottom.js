sportApp.directive('ngScrollBottom', ['$timeout', function ($timeout) {
  return {
    link: function ($scope, $element, attr) {
      $scope.$watch(attr.ngScrollBottom, function (newValue, oldValue) {
        //scroll na dno kod loadanja
        var scrollbar = Scrollbar.init($element[0]);
        if (newValue && !oldValue.length) {
          $timeout(function(){
            scrollbar.setPosition(0, scrollbar.getSize().content.height);
          }, 0);
        }
        //kompenziraj scroll kod učitavanja prethodnih poruka
        else if(newValue && oldValue && newValue[0]!=oldValue[0]){
          $timeout(function(){
            scrollbar.scrollTo(0, $("#"+oldValue[0]._id).position().top - 40);
          }, 0);
        }
        //scroll na dno kod novih poruka (ako je već pri dnu)
        else if(newValue && oldValue &&
          newValue[newValue.length - 1]!=oldValue[oldValue.length - 1] &&
          $("#"+oldValue[oldValue.length - 1]._id).position().top <= 400){
          $timeout(function(){
            scrollbar.scrollTo(0, scrollbar.getSize().content.height);
          }, 0);
        }
      });
    }
  }
}]);