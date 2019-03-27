sportApp.controller("profileSingleArticleController", ['$scope',"Upload", "userService",'$http', 'httpService', 'popupService','$stateParams', function ($scope, Upload, userService,  $http, httpService, popupService,$stateParams) {
    console.log($stateParams.aid);
    httpService.getArticle($stateParams.aid, $stateParams.id)
        .then(function(res) {
               $scope.article=res.data;
                console.log(res.data);
            }
        );
    $scope.postComment = function(text, file){
       
        Upload.upload({
            url: '/api/article/' + $scope.article._id  + '/comment',
            data: {
                text: text,
                file: file
            }
        }).then(function (res) {
            if(res.status == 200){
                $scope.article.comments = res.data.comments;
                $scope.article.likes = res.data.likes;
                $scope.article.liked = res.data.liked;
              
            }
        }, function (res) {
            if (res.status > 0){
                $scope.errorMsg = res.status + ': ' + res.data;
               
            }
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
           
        });
    };

    $scope.deleteComment = function(commentId, commIndex){
  

            popupService.confirm("DELETE COMMENT")
                .then(function(){
                    httpService.deleteComment( $scope.article._id, commentId)
                        .success(function(){
                            $scope.article.comments.splice(commIndex,1);
                        });
                });
        }
    $scope.getLikes = function(){
        popupService.users({
            title: "ARTICLE LIKES",
            getUsers: function(){
                return httpService.getArticleLikes($scope.article._id);
            }
        })
    }

    

    $scope.likeStatement = function(){
        if( !$scope.article.liked ){
            httpService.likeArticle($scope.article._id)
                .success(function(data) {
                    $scope.article.comments = data.comments;
                    $scope.article.likes = data.likes;
                    $scope.article.liked = data.liked;
                })
                .error(function(err) {
                    console.log(err);
                });
        }
        else{
            httpService.unlikeArticle($scope.article._id)
                .success(function(data) {
                    $scope.article.comments = data.comments;
                    $scope.article.likes = data.likes;
                    $scope.article.liked = data.liked;
                })
                .error(function(err) {
                    console.log(err);
                });
        }
    };

   
}]);