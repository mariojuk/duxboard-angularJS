sportApp.controller('postCtrl', ["$scope", "$timeout", "Upload","popupService", function($scope, $timeout, Upload,popupService) {
	
		//ovaj cili fajl prominit, ignoriraj ovo :D
		$scope.openNewArticlePopup = function () {
				popupService.openPlain('popups/newArticlePopup/newArticlePopup.html', 800, null, null, null, false); 
		};  
		
		$scope.isEmojiOpen = false;
		$scope.isImageOpen = false;
		$scope.isVideoOpen = false;

		if($scope.media && $scope.media.img){
			$scope.mediaImg = $scope.media.img;
		}

		$scope.hasPost = $scope.media && $scope.media.hasOwnProperty('post')

		$scope.isStatementVisible = $scope.hasPost;

    	var setFormHeight = function(){
    		if(!$scope.isStatementVisible && !$scope.isImageOpen && !$scope.isEmojiOpen && !$scope.isVideoOpen){
    			$scope.scHeight = '120px'
    			$scope.scMin = '0px'
    		}
    		else if($scope.isStatementVisible){
    			$scope.scHeight = '9999px'
    			$scope.scMin = '160px'
    		}
    		else{
    			//@input-height*2 iz lessa
    			$scope.scHeight = '160px'
    			$scope.scMin = '160px'
    		}
    	}

    	setFormHeight();

	    $scope.imageClick = function() {
	    	if ($scope.isEmojiOpen){
	    		$timeout(function() {
	        		$scope.$broadcast('openEmojiPicker');
	        	});
	        	$scope.isEmojiOpen = false;
	    	}
	    	$scope.isVideoOpen = false;
	    	$scope.isImageOpen = !$scope.isImageOpen;
	    	if($scope.hasPost){
	    		$scope.isStatementVisible = !$scope.isImageOpen;
	    	}
	    	setFormHeight()
	    }

	    $scope.videoClick = function() {
	    	if ($scope.isEmojiOpen){
	    		$timeout(function() {
	        		$scope.$broadcast('openEmojiPicker');
	        	});
	        	$scope.isEmojiOpen = false;
	    	}
	    	$scope.isImageOpen = false;
	    	$scope.isVideoOpen = !$scope.isVideoOpen;
	    	if($scope.hasPost){
	    		$scope.isStatementVisible = !$scope.isVideoOpen;
	    	}
	    	setFormHeight()
	    }

		$scope.emojiPick = function() {
			if($scope.text.length > $scope.maxChars){
				$scope.text = $scope.text.substring(0,$scope.maxChars);
			}
		}

		$scope.$on("emojiPickerClosed", function(){
			$scope.isEmojiOpen = false;
		});

		$scope.emojiClick = function() {
			$timeout(function() {
        		$scope.$broadcast('openEmojiPicker');
        	});
        	
	    	$scope.isImageOpen = false;
	    	$scope.isVideoOpen = false;
        	$scope.isInputFocused = true;
        	$scope.isEmojiOpen = !$scope.isEmojiOpen;
        	if($scope.hasPost){
	    		$scope.isStatementVisible = !$scope.isEmojiOpen;
	    	}
	    	setFormHeight()

		};

		$scope.publishClick = function(){
			if($scope.text.length || $scope.file || $scope.buttonLabel == "SHARE"){
				// console.log($scope.file.name);
		   		$scope.onPost({
		   			text: $scope.text,
		   			file: $scope.file,
		   			video: $scope.videoId 
		   		});
		   		$scope.text = "";
		   		$scope.file = "";
		   		$scope.videoId = "";
		   		$scope.ytLink = "";
		   		if ($scope.isEmojiOpen){
		    		$timeout(function() {
		        		$scope.$broadcast('openEmojiPicker');
		        	});
		        	$scope.isEmojiOpen = false;
		    	}
		    	$scope.isVideoOpen = false;
		    	$scope.isImageOpen = false;
	    		setFormHeight();
			}else{
				//console.log("invalid input");
			}
		};

		var inputChangedPromise = false;
		$scope.onInputChange = function(){
		    if(inputChangedPromise){
		        $timeout.cancel(inputChangedPromise);
		    }
		    else{
		    	$scope.onTypingStarted();
		    }
		    inputChangedPromise = $timeout(function(){
		    	$scope.onTypingStopped();
		    	inputChangedPromise = false;
		    },1000);
		}

		var ytVideoIdRegex = /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
		$scope.updateVideo = function(ytLink){
			var id = ytLink.match(ytVideoIdRegex);
			if(id && id[1] && id[1].length == 11){
				$scope.videoId = id[1];
			}
		}

}]);