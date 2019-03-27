sportApp.service('popupService', ["$q", "ngDialog", function($q, ngDialog){
	
	var open = function(template, width, height, data, scope, showClose){
		if(ngDialog.getOpenDialogs().length){
			width += 20;
		}
		return ngDialog.open({ 
			template: template,
			width: width,
			height: height,
			data: data,
			scope: scope,
			appendClassName: 'ngdialog-theme-custom',
			showClose: showClose
    	});
	}

	var openPlain = function(template, width, height, data){
		return ngDialog.open({ 
			template: template,
			width: width,
			height: height,
			data: data,
			showClose: true
    	});
	}

	var confirm = function(title, text, confirm, cancel){
		var data = {
			title: title,
			text: text || "Are you sure you want to do this?",
			confirm: confirm || "Yes",
			cancel: cancel || "No"
		}
		var dialog = open(	'popups/confirmAction/confirmAction.html', 300, null, data, null, false)

		return dialog.closePromise.then(function(data){
			if(data.value === true){ return true }
			else{ return $q.reject() }
		})
	}

	var notify = function(title, text, type){
		//type: true za success, false za error, undefined za default
		var data = {
			title: title,
			text: text,
			type: type
		}
		return open('popups/notify/notify.html', 300, null, data, null, true)
	}

	var users = function(data){ 
		return open('popups/usersPopup/usersPopup.html', 600, null, data, null, true)
	}
	var article = function(data){ 
		return open('popups/moreArticle/moreArticle.html', 600, null, data, null, true)
	}

	var media = function(user, text, media){
		var data = {
				user: user,
				media: media,
				text: text
			}
		return open('popups/postMedia/postMedia.html', 9999, '100%', data, null, false)
	}

	var sharePost = function (post) {
		var data = {
			post: post
		};

		return open('popups/sharePost/sharePost.html', 600, null, data, null, true)
	};

	var editPost = function (post) {
		var data = {
			post: post
		};

		return open('popups/editPost/editPost.html', 600, null, data, null, true)
	};

	var editArticle = function (article) {
		var data = {
			article: article
		};

		return open('popups/editArticle/editArticle.html', 600, null, data, null, true)
	};

	var privacyPolicy = function () {
		return open('popups/privacyPolicy/privacyPolicy.html', 600, null, null, null, true)
	};

	var termsOfUse = function () {
		return open('popups/termsOfUse/termsOfUse.html', 600, null, null, null, true)
	};

	var editPresenter = function (presenter) {
		var data = {
			title: 'Edit presenter',
			presenter: presenter,
			api: '/api/presenter/' + presenter._id + '/edit'
		};
		return open('popups/editPresenter/editPresenter.html', 600, null, data, null, true)
	};

	var newPresenter = function(){
		var data = {
			title: 'New presenter',
			api: '/api/presenter/'
		}
		return open('popups/editPresenter/editPresenter.html', 600, null, data, null, true)
	};

	var editWebinar = function (webinar) {
		var data = {
			title: 'Edit webinar',
			webinar: webinar,
			api: '/api/webinars/' + webinar._id + '/edit'
		};
		return open('popups/editWebinar/editWebinar.html', 600, null, data, null, true)
	};

	var newWebinar = function(presenters){
		if(!presenters){
			presenters = [];
		}
		var data = {
			title: 'New webinar',
			api: '/api/webinars/new',
			webinar: { presenters: presenters }
		}
		return open('popups/editWebinar/editWebinar.html', 600, null, data, null, true)
	};

	return {
		open: open,
		openPlain: openPlain,
		confirm: confirm,
		notify: notify,
		users: users,
		media: media,
		sharePost: sharePost,
		editPost: editPost,
		editArticle: editArticle,
		article: article,
		privacyPolicy: privacyPolicy,
		termsOfUse: termsOfUse,
		newPresenter: newPresenter,
		editPresenter: editPresenter,
		newWebinar: newWebinar,
		editWebinar: editWebinar
	};

}]);
