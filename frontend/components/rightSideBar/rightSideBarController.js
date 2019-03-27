sportApp.controller("rightSideBarCtrl", ["$scope", "httpService", "popupService", function ($scope, httpService, popupService){
	
    $scope.inviteFriend = function () {
	    popupService.openPlain('popups/inviteFriends/inviteFriends.html');   
    };
  
    
    $scope.morePeople = function () {
        //dodat novi query i ubacit pagination
        popupService.users({
            title: "PEOPLE YOU MAY KNOW",
            getUsers: function(){
                return httpService.getPeopleYouMayKnow()
            }
        });
    }
     $scope.moreArticle = function () {
        popupService.article({
            title: "ARTICLE",
            getArticle: function(){
                return httpService.getArticlesFeed()
            }
        });
    }

    $scope.getMutualPartners = function(user){
       popupService.users({
            title: "MUTUAL PARTNERS WITH " + user.firstName + " " + user.secondName,
            getUsers: function(){
                return httpService.getMutualPartners(user._id);
            }
        });
    }

}]);