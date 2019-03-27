sportApp.controller('feedCtrl', ["$scope", "Upload", "userService", "httpService", "popupService", function($scope, Upload, userService, httpService, popupService) {

		$scope.userId = userService.getProperty("_id");

		//refreshat svakih par sekundi?
		$scope.postTime = function(date){
			var time = new Date(date).getTime();
			return humanizeDuration(Date.now() - time, { round: true , largest: 1 });
		};

		$scope.sharePost = function(post){
			post = (post.media && post.media.hasOwnProperty('post')) ?
						post.media.post : post;
			if(post){
				popupService.sharePost(post).closePromise.then(function(data){
					if($scope.updateOnShare && !_.includes(['$escape','$closeButton','$document'], data.value)){
						$scope.posts.unshift(data.value);
					}
				})	
			}else{
				popupService.notify("SHARE STATEMENT", "You cannot share deleted statement", false);
			}
		}

		$scope.deletePost = function(id, index){
			popupService.confirm("DELETE STATEMENT")
				.then(function(){
					httpService.deleteStatus(id)
						.success(function(){
							$scope.posts.splice(index,1);
							// popupService.notify("DELETE STATUS", "Status successfully deleted", true)
						});
				});
		}

		$scope.toggleComments = function(post){
			post.showComments = !post.showComments;
		}

		$scope.deleteComment = function(postId, postIndex, commentId, commIndex){
			popupService.confirm("DELETE COMMENT")
				.then(function(){
					httpService.deleteComment(postId, commentId)
						.success(function(){
							$scope.posts[postIndex].comments.splice(commIndex,1);
						});
				});
		}

		$scope.postComment = function(postId, $index, text, file, video){
			Upload.upload({
	            url: '/api/status/' + postId + '/comment',
	            data: {
	                text: text,
	                file: file,
	                media: { video: video }
	            }
	        }).then(function (res) {
	            if(res.status == 200){
					$scope.posts[$index].comments = res.data.comments;
					$scope.posts[$index].likes = res.data.likes;
					$scope.posts[$index].liked = res.data.liked;

				}
	        }, function (res) {
	            if (res.status > 0){
	            	$scope.errorMsg = res.status + ': ' + res.data;

				}
	        }, function (evt) {
	            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);

			});
		};

		$scope.seenPost = function($index){
			if($index == $scope.posts.length - 1){
				$scope.updateFeed( { nextId : $index + 1, lastId:  $scope.posts[$index]._id } );
			}
		};

}]);