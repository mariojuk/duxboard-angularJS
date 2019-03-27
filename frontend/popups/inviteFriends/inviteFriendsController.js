sportApp.controller("inviteFriendsController",['$scope','httpService','popupService','userService', 'googleContactsService', function ($scope, httpService,popupService,userService, googleContactsService){
	
	$scope.inviteGmail = function () {
		googleContactsService.getContacts(function(contacts){
			 popupService.open('popups/inviteGmail/inviteGmail.html', 600, null, {contacts: contacts}, null, true);
		})
       
    };
	$scope.invite = function(mail) {
	
      httpService.inviteFriends(mail)
           .then(function(res){
		   popupService.notify("E-Mail","YOUR INVITES HAVE BEEN SENT",true);
	   })
			.catch(function(res){
				popupService.notify("Error",res.data,false);
			})
    }
}]);
	
