sportApp.directive('youtubeVideo', ['$compile', 'screenSize', function($compile, screenSize){

    return {
      restrict: 'EA',
      templateUrl: '/components/youtubeVideo/youtubeVideo.html',
      scope: {
        videoId: '@',
        showThumbnail: '=?',
        size: '@'
      },
      link: function(scope, element, attr){
        if(!scope.showThumbnail){
          scope.showThumbnail = true
        }

        //16:9 ili 4:3 rezolucije
        if(screenSize.is('tablet')){
            scope.height = 173;
            scope.width = 307;
        }
        if(screenSize.is('desktop')){
            scope.height = 225;
            scope.width = 400;
        }
        if (screenSize.is('mobile') || scope.size == "small"){
          scope.height = 153;
          scope.width = 272;
        }
        if(scope.size == "smallest"){
          scope.height = 120;
          scope.width = 214;
        }


        scope.thumbnailSrc = 'http://img.youtube.com/vi/'
          + scope.videoId +'/hqdefault.jpg';
        
        var videoSrc = 'https://www.youtube.com/embed/'
          + scope.videoId + '?&showinfo=0&controls=0&autoplay=1';

        var iframeParams = {
          'id': 'ytplayer',
          'frameborder': 0,
          'type': 'text/html',
          'width': scope.width,
          'height': scope.height,
          'ng-src': videoSrc
        }

        scope.playVideo = function(){
          var iframe = _.reduce(iframeParams, function(result, value, key){
            return result + key + "='" + value +"' ";
          }, "<iframe ") + "></iframe>"
          var container = angular.element(element[0].querySelector('#iframeContainer'));
          container.append($compile(iframe)(scope));
        }
      }
    };

}]);