sportApp.controller("homeController", ['$scope', 'httpService', '$state', 'Upload', function ($scope, httpService,$state, Upload) {

	$scope.postStatus = function(text, file, video){
		// console.log(text, file.name);
		Upload.upload({
            url: '/api/status',
            data: {
                text: text,
                file: file,
                media: { video: video }
            }
        }).then(function (res) {
			$scope.feed.unshift(res.data);
        }, function (res) {
            if (res.status > 0){
            	$scope.errorMsg = res.status + ': ' + res.data;
            }
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
	};

	var loadHome = function(){
		httpService.getHome()
			.then(function(res) {
				$scope.feed = res.data.feed;
				$scope.articles = res.data.articles;
				$scope.mayknow = res.data.mayknow;
			})
			.catch(function (err) { console.log(err); });
	}
	loadHome();

	$scope.updateFeed = function(lastId){
		return httpService.getFeed(10, lastId)
			.then(function(res) {
				$scope.feed= $scope.feed.concat(res.data);
			})
			.catch(function(err) { console.log(err) })
	}

}]);