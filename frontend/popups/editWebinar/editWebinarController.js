sportApp.controller('editWebinarController', ['$scope', 'notificationService', '$http', function ($scope, notificationService, $http) {

	$scope.webinar = _.clone($scope.ngDialogData.webinar);
    $scope.webinar.startingDate = new Date($scope.webinar.startingDate);
    $http.get('api/presenter/all').then(function(res){
        $scope.presenters = res.data;
    })

    $scope.submit = function(){
        var data = _.clone($scope.webinar);
        data.presenters = _.map(data.presenters, function(pr) {
            return pr._id;
        });

        $http.post($scope.ngDialogData.api, data)
        .then(function(res){
            $scope.closeThisDialog({ webinar : res.data });
        })
        .catch(function(res){
            notificationService.error(res.data);
        })
    }

    $scope.addPresenter = function(presenter){
        if(_.isObject(presenter)){
            if($scope.webinar.presenters){
                $scope.webinar.presenters.push(presenter);
            }else{
                $scope.webinar.presenters = [presenter];
            }
            $scope.newPresenter = undefined;
        }
    }

    $scope.removePresenter = function(index){
        $scope.webinar.presenters.splice(index, 1);
    }

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

}])