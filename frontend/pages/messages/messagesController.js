sportApp.controller("messagesController", ['$stateParams', '$scope', 'AuthService', 'userService', 'httpService','screenSize', function ($stateParams, $scope, AuthService, userService, httpService,screenSize) {
	var socket = AuthService.socket();
	$scope.userId = userService.getProperty("_id");
	$scope.messages = [];
	$scope.showContacts=true;
	$scope.showMesage=true;
	$scope.showButton=false;
	$scope.showButton2=true;

	var getParticipantsString = function(participants){
		var single = participants.length == 1;
		return _.map(participants, function(p){
			var name = (single) ? p.firstName : p.firstName[0] + ".";
			return name + " " + p.secondName;
		}).join(", ");
	}

	httpService.getConversations()
		.success(function(data){
			_.each(data, function(conv){
				conv.participants.splice(_.findIndex(conv.participants, function(item) {
					    return item._id === $scope.userId;
					}), 1);
				conv.altTitle = getParticipantsString(conv.participants);
			})	
			$scope.conversations = data;
			if($stateParams.id){
				$scope.conversation = _.find(data, function(conv) {
						return conv._id == $stateParams.id;
					})
				if($scope.conversation){
					$scope.loadConversation($scope.conversation, true);
				}
			}
		})

	$scope.$on('$destroy', function() {
		if($scope.conversation._id){
	    	socket.emit('leave room', $scope.conversation._id);
		}
	});

	var load = function(id, offset, last){
		httpService.getConversationMessages(id, offset, last)
			.success(function(data){
				$scope.messages = data.concat($scope.messages);
				var seen = 0;
				_.each(data, function(msg){
					seen += _.includes(msg.seen, $scope.userId) ? 0 : 1
				})
				$scope.conversation.newMessages -= seen;
				if(!$scope.conversation.newMessages && seen){
					userService.updateProperties({conversations: id}, false)
				}
			});
	}

	$scope.hasSeen = function(msg){
		return (msg.sender._id == $scope.userId &&
			_.includes(msg.seen, $scope.conversation.participants[0]._id))
	}

	$scope.loadConversation = function(conv, onload){
		if($scope.conversation && !onload){
			socket.emit('leave room', $scope.conversation._id);
		}
		$scope.conversation = conv;
		$scope.messages = [];
		
		load(conv._id);

		socket.emit('join room', $scope.conversation._id);
		if (screenSize.is('mobile') || screenSize.is('tablet')) {
			$scope.showContacts=false;
			$scope.showButton=true;
			$scope.showButton2=false;
		}
	}

	$scope.loadMore = function(){
		load($scope.conversation._id, 20, $scope.messages[0]._id)
	}

	$scope.sendMessage = function(text){
		socket.emit('message', {
			text: text,
			conversation: $scope.conversation._id,
		});
	};

	$scope.emitTypingStarted = function(){
		socket.emit('typing started', {
			conversation: $scope.conversation._id,
		});
	}

	$scope.emitTypingStopped = function(){
		socket.emit('typing stopped', {
			conversation: $scope.conversation._id,
		});
	}

    socket.on('message', function(data){
		$scope.messages = $scope.messages.concat(data);
		$scope.$apply();
		socket.emit('seen', {
			message: data,
			conversation: $scope.conversation._id,
		})
	});

	socket.on('seen', function(data){
		if($scope.conversation._id == data.conversation){
			var index = _.findIndex($scope.messages, {_id: data.message._id});
			$scope.messages[index].seen = data.message.seen;
		}
	})

	socket.on('seen all', function(data){
		if($scope.conversation._id == data.conversation){
			_.each($scope.messages, function(mesig){
				mesig.seen = _.union(mesig.seen || [], [data.user._id]);
			})
			$scope.$apply();
		}
	})

	socket.on('typing started', function(data){
		if(data.conversation == $scope.conversation._id){
			$scope.typing = data.sender;
			$scope.$apply();
		}
	});

	socket.on('typing stopped', function(data){
		if(data.conversation == $scope.conversation._id){
			$scope.typing = false;
			$scope.$apply();
		}
	});

	$scope.toggleContact=function () {
		$scope.showContacts=true;
		$scope.conversation=false
		$scope.showButton=false;
		$scope.showButton2=true;
	}
}]);