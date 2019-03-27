sportApp.service('notificationService', ['AuthService', '$state', 'userService', '$filter', 'toastr', '$timeout', function(AuthService, $state, userService, $filter, toastr, $timeout){

	var onNotificationClick = function(notif){
		return function(){
			if(notif.data){
				AuthService.socket().emit("notification seen", notif._id);
				userService.updateProperties({notifications: -1}, true);
				$state.go("app." + notif.data.name, notif.data.params);
			}
		}
	}


	var parse = function(notif){

		var params = {
			onTap : onNotificationClick(notif),
			extraData : { imgSrc: notif.actor.profilePicture }
		}

		notify($filter('parseAction')(notif), "", params);

		if(notif.action == 90){
			userService.updateProperties({requests: notif.actor._id}, true)
		}else if(notif.action == 93){
			userService.updateProperties({requests: notif.actor._id}, false)
		}else if(notif.action == 70){
			userService.updateProperties({conversations: notif.data.params.id}, true)
		}else{
			userService.updateProperties({
				medals: notif.reward || 0,
				notifications: 1
			}, true);
		}

	}

	var notify = function(text, title, params){
		toastr.info(text, title, params);
	}

	var inline = function(text, classes, icon){
		var html = "<span>" + text + "</span>"
		if(icon){
			html = "<i class='fa " + icon + "'></i>" + html
		}

		var container = angular.element(document.querySelector('#inlineNotification'));
		classes += " active";

		container.html(html);
		container.addClass(classes);
		$("body,html").animate({scrollTop: 0}, 300);
		$timeout(function(){
			container.removeClass(classes);
			container.html("");
		}, 3000);
	}

	var success = function(text, inl){
		if(inl){
			inline(text, 'success', 'fa-check');
		}
		else{
			var params = {extraData : {icon: 'fa-check'}};
			toastr.success(text, "Success", params);
		}
	}
	var error = function(text, inl){
		if(inl){
			inline(text, 'error', 'fa-close');
		}
		else{
			var params = {extraData : {icon: 'fa-close'}};
			toastr.error(text, 'Error', params)
		}
	}
	var warning = function(text, inl){
		if(inl){
			inline(text, 'warning', 'fa-exclamation');
		}
		else{
			var params = {extraData : {icon: 'fa-exclamation'}};
			toastr.warning(text, 'Warning', params)
		}
	}

	return{
		parse: parse,
		notify: notify,
		inline: inline,
		success: success,
		error: error,
		warning: warning
	}

}]);
