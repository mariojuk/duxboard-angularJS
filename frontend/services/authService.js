sportApp.service('AuthService', ["$http", "userService", function($http, userService) {
    var LOCAL_TOKEN_KEY = 'sportApp';
    var isAuthenticated = false;
    var authToken;
    var socket;

    function loadUserCredentials() {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if (token) {
            useCredentials(token);
        }   
    }

    function storeUserCredentials(token) {
        window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        useCredentials(token);
    }

    function useCredentials(token) {
        isAuthenticated = true;
        authToken = token;
        socket = io.connect("", getSocketConfig(token));

        socket.on('connected', function(data){
            userService.setProperties(data.userData);
        });

        var currentUser = parseJwt(token);
        userService.setUser(currentUser);
        userService.setProperty('isAdmin', _.includes(currentUser.roles, 'admin'));

        $http.defaults.headers.common.Authorization = authToken;
    }

    function getSocketConfig(token) {
        return {
            forceNew: true,
            transportOptions: {
                polling: {
                    extraHeaders: {
                        authorization: token,
                    }
                }
            }
        };
    }

    function destroyUserCredentials() {
        authToken = undefined;
        isAuthenticated = false;
        $http.defaults.headers.common.Authorization = undefined;
        window.localStorage.removeItem(LOCAL_TOKEN_KEY);
        userService.setUser({});
    }

    function parseJwt (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
    };

    var register = function(user) {
        return $http.post('api/auth/register', user);
    };
    var forgot =function(email){
        return $http.post('api/auth/forgot', email);
    };
    var changePassword=function (user,token) {
        return $http.post('api/auth/changepassword/'+token ,user)
    };
    var changeMail=function (user) {
        return $http.post('api/settings/changeEmail',user)
    };
    var changePass=function (user) {
        
        return $http.post('api/settings/changePassword',user)
    };

    var login = function(user) {
        return $http.post('api/auth/authenticate', user).then(function(result) {
            storeUserCredentials(result.data.token);
            return result;
        });
    };

    var logout = function() {
        destroyUserCredentials();
        socket.disconnect();
    };

    loadUserCredentials();

    return {
        login: login,
        register: register,
        logout: logout,
        forgot: forgot,
        changePassword:changePassword,
        changeMail:changeMail,
        changePass:changePass,
        socket: function(){ return socket; },
        isAuthenticated: function() { return isAuthenticated; },
    };
}]);
