var getActionType = function(action){
	var n = 0;
	while(action >= 10){
		action = action / 10;
		n += 1;
	}
	return Math.floor(action) * Math.pow(10, n)
}

sportApp.filter('byActionType', function(){
	return function(notifs, filter){
		if(_.includes(filter, 0))
	    {
	        return notifs;
	    }
	    else{
	    	var filtered = [];
	    	_.each(notifs, function(n){
	    		if(_.includes(filter, n.action) ||
    			_.includes(filter, getActionType(n.action)) ){
	    			filtered.push(n);
	    		}
	    	})
	    	return filtered;
	    }
	}
})

sportApp.filter('parseAction', ['userService', function (userService) {

	var uid = userService.getProperty("_id");

	var types = {
		70: "message",
		80: "invite",
		90: "partnership",
		100: "statement",
		200: "article",
		600: "profile"
	}

	var actions = function(id, actor, subject, action){
		switch(id){
			case 70: return actor + " sent you a " + action;

			case 81: return actor + " just joined DuxBoard after " + subject + " " + action;

			case 90: return actor + " sent request for " + subject + " " + action;
			case 91: return actor + " accepted " + subject + " " + action + " request";
			case 92: return actor + " denied " + subject + " " + action + " request";
			case 93: return actor + " canceled " + subject + " " + action + " request";
			case 94: return actor + " and " + subject + " are now partners";
			case 98: return actor + " and " + subject + " are no longer partners";
			case 99: return actor + " removed " + subject + " " + action;

			case 100: return actor + " posted new " + action;
			case 110: return actor + " edited " + action;
			case 120: return actor + " commented on " + subject + " " + action;
			case 129: return actor + " deleted comment on " + subject + " " + action;
			case 130: return actor + " gave " + subject + " " + action + " a medal";
			case 131: return actor + " removed medal from " + subject + " " + action;
			case 150: return actor + " shared " + subject + " " + action;
			case 190: return actor + " deleted " + subject + " " + action;

			case 200: return actor + " posted new " + action;
			case 210: return actor + " edited " + action;
			case 220: return actor + " commented on " + subject + " " + action;
			case 229: return actor + " deleted comment on " + subject + " " + action;
			case 230: return actor + " gave " + subject + " " + action + " a medal";
			case 231: return actor + " removed medal from " + subject + " " + action;
			case 250: return actor + " shared " + subject + " " + action;
			case 290: return actor + " deleted " + subject + " " + action;

			case 621: return actor + " updated " + action + " info";
			case 631: return actor + " updated " + action + " cover";
			case 641: return actor + " updated " + action + " picture";
			case 651: return actor + " updated " + action + " CV";
			case 666: return actor + " visited " + subject + " " + action;
		}
		return "unknown action"
	}

	var userStr = function(actor, bindHtml){
		var name = actor.firstName + " " + actor.secondName;
		if(bindHtml != true){ return name; }
		// ng-bind-html ne parsira ui-sref?
		// napravit template umisto filtera			...jednog dana
		return "<a href='profile/" + actor._id + "'>" + name + "</a>"
	}

	var actionStr = function(action, bindHtml){
		var typeId = getActionType(action);
		if(!bindHtml){
			return types[typeId]
		}
    	return "<span class='type" + typeId + "'>" + types[typeId] + "</span>"
	}

	var medalStr = function(notif, bindHtml){
		if(!bindHtml || !notif.reward){
			return ""
		}
		return "<i class='dux-medal blue'></i><span class='reward'>" +  notif.reward.toString() + "</span>"
	}
    
	return function(input, bindHtml){
		var actor = (uid == input.actor._id) ? "you" : userStr(input.actor, bindHtml);
		var subject = "";
		if (input.subject){
			subject = (uid == input.subject._id) ? "your" : userStr(input.subject, bindHtml) + "'s";
		}
		var action = actionStr(input.action, bindHtml);

		return actions(input.action, actor, subject, action) + medalStr(input, bindHtml);
	};

}]);