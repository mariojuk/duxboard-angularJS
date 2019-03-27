sportApp.controller("adminPreordersController", ['$scope', 'httpService','popupService', function ($scope, httpService,popupService) {

    $scope.preorders = 0;
    $scope.selected=[];
    
    $scope.exist=function(item){
        return $scope.selected.indexOf(item)> -1;
    }

    $scope.selection=function(item){
        var idx=$scope.selected.indexOf(item.mail);
        if(idx > -1){
            $scope.selected.splice(idx,1);
        }
        else{
            console.log( $scope.selected);
            $scope.selected.push(item.mail);  
        }
    }
    
    $scope.getPreorders = function(){
        httpService.getPreorder()
        .then(function(res){
            $scope.preorderUsers = res.data; 
            $scope.preorders = res.data.length;

        }).catch(function (err) {
           
         console.log(err);
          });
     
    }

    $scope.adminMail = function() {
      httpService.postAdminEmails($scope.selected,$scope.emailText,$scope.subject)
     
           .then(function(res){
           popupService.notify("E-Mail","YOUR E-Mail HAVE BEEN SENT",true);
       })
            .catch(function(res){
                popupService.notify("Error",res.data,false);
            })
    }
   

    
}]);
