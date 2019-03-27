sportApp.controller("settingsController",  ['$scope', 'httpService','popupService', 'userService',
    function ($scope, httpService,popupService, userService) {
        $scope.displaySettings=false;
        httpService.getUser(userService.getProperty("_id")).then(function(res) {
            $scope.user = res.data;
            $scope.coverPhotoUrl = "/uploads/" + $scope.userId + "/cover.jpg";
        });
        httpService.getUserCreditCardInfo(userService.getProperty("_id")).then(function (res) {
           $scope.card=res.data;
            $scope.card.expirationMonth=res.data.expirationDate.slice(0,2);
            $scope.card.expirationYear=res.data.expirationDate.slice(2,4);
            $scope.card.cardNumber=$scope.card.cardNumber.toString();

        });
        $scope.months=["01","02","03","04","05","06","07","08","09","10","11","12"]
        $scope.years=["17","18","19","20","21","22","23","24","25","26","27","28"]

        $scope.whoCanSeeMe= function () {
            var params={"whoCanSee":$scope.whoCanSeeMyProfile};
            httpService.postWhoCanSee(params).then(function () {
                $scope.messageWhoCanSee=  "Who can see my profile is now changed";
            });
        };

        httpService.getwhoCanSee().then(function (res) {
            $scope.whoCanSeeMyProfile=res.data.whoCanSeeMyProfile.toString();
        });
        $scope.blockUserList=function () {
            popupService.open('popups/unblockUser/unblockUser.html',  500, null, {}, $scope, true);
        };
        $scope.addCreditCard=function () {
            popupService.open('popups/addCreditCardSettings/addCreditCard.html', 500, null, {}, $scope, true);
        };
        $scope.changePasswordSettings = function() {
            popupService.open('popups/changePasswordSettings/changePasswordSettings.html', 500, null, {}, $scope, true);
        };
        $scope.changeEmailSettings = function() {
            popupService.open('popups/changeEmailSettings/changeEmailSettings.html', 500, null, {}, $scope, true);
        };
        $scope.terminateAccount= function() {
            popupService.open('popups/terminateAccountSettings/terminateAccount.html', 500, null, {}, $scope, true);
        };
        $scope.blockUser= function() {
            popupService.open('popups/blockedUsersSettings/blockedUsers.html', 500, null, {}, $scope, true);
        };

    }]);