sportApp.controller("webinarsController", ['$scope', 'httpService', '$http', function ($scope, httpService, $http) {

	$scope.today= new Date();
	$scope.calendarOptions = {
		showWeeks: false
	}

	var getLiveWebinars = function(){
		httpService.getLiveWebinars().then(function(res){
			$scope.webinarsFeed = res.data;
			//heh
			_.each(res.data, function(group){
				_.each(group.feed, function(webinar){
					_.each(webinar.presenters, function(presenter){
						if(!_.some($scope.presenters, {_id: presenter._id})){
							var pr = presenter;
							presenter.webinar = webinar.title;
							presenter.startingDate = webinar.startingDate;
							$scope.presenters.push(pr)
						}
					})
				})
			})
		})
		$scope.live = true;
	}

	var getArchivedWebinars = function(){
		httpService.getArchivedWebinars().then(function(res){
			$scope.webinarsFeed = res.data;
		})
		$scope.live = false;
	}

	$scope.presentersString = function(presenters){
		return _.map(presenters, 'name').join(', ');
	}

	$scope.isLive = function(datetime){
		var now = new Date().getTime();
		return new Date(datetime).getTime() <= now;
	}

	$scope.toggleSelection = function(){
		if(!$scope.live){ getLiveWebinars(); }
		else{ getArchivedWebinars(); }
	}

	$scope.presenters = [];
	getLiveWebinars();

}])
