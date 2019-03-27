sportApp.service('userService', [ function(){
	var currentUser = null;

	return {
	    getUser : function(){
	        return currentUser;
	    },
	    getProperty: function(prop){
	    	return currentUser[prop];
	    },
	    setUser : function(user){
	    	currentUser = user;
	    },
	    setProperty: function(key, value){
	    	currentUser[key] = value;
	    },
	    setProperties : function(obj){
	        _.forOwn(obj, function(value, key){
	        	currentUser[key] = value;
	        });
	    },
	    updateProperties : function(obj, add){
	    	//smislit bolji sistem
	    	_.forOwn(obj, function(value, key){
	    		if(Array.isArray(currentUser[key])){
	    			if(add && !_.includes(currentUser[key], value)){
	    				currentUser[key].push(value);
	    			}
	    			else if(!add && _.includes(currentUser[key], value)){
	    				_.pull(currentUser[key], value);
	    			}
	    		}
	    		else{
	    			currentUser[key] += (value * (add ? 1 : -1));
	    		}
	    	})
	    }
	}
}]);
	