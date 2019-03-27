sportApp.controller("analysisController", ['$scope', 'httpService', 'userService', '$filter', function ($scope, httpService, userService, $filter) {

	var user = userService.getUser()
	var updatePosts = function(posts){
		return _.map(posts, function(p){
			p.user = user;
			p.comments = []
			p.comments.length = p.commentsCount;
			if(p.media){
				p.media = _.map(p.media, function(v, k){
					return k;
				})[0]
			}
			//računat na backendu i gledat id-eve korisnika koji su lajkali, komentirali itd.
			p.rate = ((p.commentsCount + p.likesCount + p.sharesCount) / p.seenCount  * 100).toFixed(2)
			return p
		})
	}

	$scope.actions = [
		{
			name: "Invite users",
			value: 0,
			keys: [81]
		},
		{
			name: "Give medal on statement or article",
			value: 0,
			keys: [130, 131, 230, 231]
		},
		{
			name: "Share statement or article",
			value: 0,
			keys: [150, 250]
		},
		{
			name: "New partnership",
			value: 0,
			keys: [91, 94, 99]
		}
	]

	var resultLimit = 3;
	$scope.engagements = [
		{
			name: "Reach",
			getStatements: function(){
				return httpService.getMostSeenStatus(resultLimit);
			}
		},
		{
			name: "Most medals",
			getStatements: function(){
				return httpService.getMostLikedStatus(resultLimit);
			}
		},
		{
			name: "Most comments",
			getStatements: function(){
				return httpService.getMostCommentedStatus(resultLimit);
			}
		},
		{
			name: "Most shares",
			getStatements: function(){
				return httpService.getMostSharedStatus(resultLimit);
			}
		}
	]

	$scope.selectedEngagement = $scope.engagements[0];
	$scope.selectedEngagement.getStatements().then(function(res){
		$scope.statements = updatePosts(res.data);
	})

	$scope.onEngagementSelection = function(){
		$scope.selectedEngagement.getStatements().then(function(res){
			$scope.statements = updatePosts(res.data);
		})
	}

	//prominit ovisno o backendu
	var daysInPackage = 30;
	var packageStartDate = new Date();
	packageStartDate.setDate(packageStartDate.getDate() - daysInPackage);

	$scope.medalsCount = 0;	//ili uzet uz userServicea
	httpService.getMedalsCount(packageStartDate).then(function(res){
		_.each(res.data, function(resAct){
			$scope.medalsCount += (resAct._id.reward * resAct.count);
			_.each($scope.actions, function(act){
				if(_.includes(act.keys, resAct._id.action)){
					act.value += (resAct._id.reward * resAct.count);
					return false;
				}
			})
		})
	});

	$scope.chartSeries = ["medals"];
	$scope.selectedDate = $filter('date')(new Date(), 'dd/MM');

	$scope.chartOnClick = function (points, evt) {
		$scope.selectedDate = $scope.chartLabels[points[0]._index];
		$scope.$apply();
	}

	$scope.updateChart = function(){

		httpService.getMedalsByDays(daysInPackage).then(function(res){

			$scope.chartData = [[]];
			$scope.chartLabels = [];

			_.times(daysInPackage, function(i){
				var date = new Date();
				date.setDate(date.getDate() - (daysInPackage - i - 1) );
				$scope.chartLabels.push($filter('date')(date, 'dd/MM'));
				$scope.chartData[0][i] = 0;
			})

			_.each(res.data, function(d){
				d.date = $filter('date')(d.createdAt, 'dd/MM');
				$scope.chartData[0][_.indexOf($scope.chartLabels, d.date)] += d.reward;
			});

			$scope.medals = res.data;
		})
	}
	$scope.updateChart();

}]);
