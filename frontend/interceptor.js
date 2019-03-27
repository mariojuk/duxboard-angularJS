sportApp.factory('AuthInterceptor', ["$rootScope", "$q", function($rootScope, $q) {
    return {
        responseError: function(response) {
            $rootScope.$broadcast({
                401: "not-authenticated",
            }[response.status], response);
            return $q.reject(response);
        }
    };
}]);
