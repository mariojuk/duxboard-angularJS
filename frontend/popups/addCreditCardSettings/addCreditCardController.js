sportApp.controller("addCreditCardController",  ['$scope', 'httpService','$http', 'userService',
    function ($scope, httpService,$http, userService) {

        $scope.changePlan = function(cardinfo){
            cardinfo.expirationDate= cardinfo.expirationMonth.toString()+cardinfo.expirationYear.toString();
            httpService.postUserCreditCardInfo(cardinfo).then(function (res) {
                $scope.closeThisDialog();
            });
        };
        $scope.monthss=["01","02","03","04","05","06","07","08","09","10","11","12"];
        $scope.yearss=["17","18","19","20","21","22","23","24","25","26","27","28"];
        httpService.getUserCreditCardInfo(userService.getProperty("_id")).then(function (res) {
            $scope.cardSettings=res.data;
            $scope.cardSettings.expirationMonth=res.data.expirationDate.slice(0,2);
            $scope.cardSettings.expirationYear=res.data.expirationDate.slice(2,4);
            $scope.cardSettings.cardNumber=$scope.card.cardNumber.toString();
        });
    }]);