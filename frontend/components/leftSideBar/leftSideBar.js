(function() {
    sportApp.controller('leftSideBarController', leftSideBarCtrl);

    leftSideBarCtrl.$inject = ["$scope", "$state", "userService", "AuthService", "popupService", "screenSize"]

    function leftSideBarCtrl($scope, $state, userService, AuthService, popupService, screenSize) {

	    $scope.userInfo = false;

        $scope.$watch( userService.getUser, function(user){
            $scope.currentUser = user;      
        }, true)
        var socket = AuthService.socket();

        $scope.onlineOptions = [
            {title: "Online", option: "online"},
            {title: "Busy", option: "busy"},
            {title: "Away", option: "away"},
            {title: "Offline", option: "offline"}
        ]

        $scope.onStatusChange = function(){
            socket.emit("online status", { status: $scope.onlineStatus.option })
        }

        socket.emit("online partners");
        socket.on("online partners", function(data){
            $scope.onlineUsers = data.partners;
            $scope.onlineStatus = _.find($scope.onlineOptions, function(status){
                return status.option == data.tisi;
            })
            // console.log($scope.onlineUsers);
        })
        socket.on("online status", function(data){
            if(data._id == $scope.currentUser._id){
                console.log(data.onlineStatus);
                $scope.onlineStatus = _.find($scope.onlineOptions, function(status){
                    return status.option == data.onlineStatus;
                })
            }
            else{
                var index = _.findIndex($scope.onlineUsers, function(user){
                    return user._id == data._id
                })
                if(index){
                    $scope.onlineUsers.push(data);
                }
                else{
                    if(data.onlineStatus == "offline"){
                        $scope.onlineUsers.splice(index, 1);
                    }
                    else{
                        $scope.onlineUsers[index].onlineStatus = data.onlineStatus;     
                    }
                }
            }
            $scope.$apply();
        })

        $scope.toggleMenu = function() {
            if(screenSize.is('tablet')){
                $scope.smallmenu = !$scope.smallmenu;
            }
            if(screenSize.is('mobile')){
                $scope.$emit('toggle-menu');
            }
        }

        $scope.smallmenu = screenSize.is('tablet');

        screenSize.when('mobile, desktop', function(){
            $scope.smallmenu = false;
        })


        $scope.logout = function() {
            popupService.confirm("LOGOUT")
                .then(function(){
                    AuthService.logout();
                    $state.go('login');
            })
        };
    }

})();
