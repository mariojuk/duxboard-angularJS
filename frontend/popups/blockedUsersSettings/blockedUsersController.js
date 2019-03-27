sportApp.controller("blockedUsersController",  ['$scope', 'httpService',function ($scope, httpService) {
        $scope.searchUser=function (model) {
            httpService.searchUsers(model).then(function (res) {
                $scope.searches = res.data;
            });
        };
        $scope.blockUserProfile=function (explanation, id) {
            httpService.getBlockUser(id, explanation).then(function (res) {
                $scope.message="UserBlocked";
            });
        };
}]);
