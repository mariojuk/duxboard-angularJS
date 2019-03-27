sportApp.controller('registerController', ['$scope', '$http', '$state', 'AuthService','toastr','notificationService', 'popupService', function($scope, $http, $state, AuthService,toastr,notificationService, popupService) {
    $scope.register = function(model) {
        AuthService.register(model).then(function (response) {
      	  	console.log(response.data);
           	$state.go('packages',{id:response.data});
            $scope.registrationErrors = response.data.msg;
        }).catch(function (err) {
            var msg;
                if(err.data.errors.length>1) {
                    err.data.errors.forEach(function (element) {
                        msg += "<br>" + element.msg;
                    });
                    notificationService.error(msg);
                }
                else {
                    notificationService.error(err.data.errors.error);
                }
        });
    };

    $scope.showPrivacyPolicy = function(){
        popupService.privacyPolicy();
    }

    $scope.showTermsOfUse = function(){
        popupService.termsOfUse();
    }

    $scope.countrys = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Canada","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre and Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts and Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos","Uganda","Ukraine","United Arab Emirates","United States of America","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"]
    $scope.sports = ["American Football","Baseball","Basketball","Biathlon","Billiards","Bodybuilding","Bowling","Boxing","Cricket","Curling","Cycling","Dancesport","Darts","Deadlifting","Diving","E-Sport","Extreme Sports","Golf","Gymnastics","Handball","Hockey","Horse Racing","Ice Dancing","Judo","Martial Arts","Motorsports","Polo","Rugby","Sailing","Soccer","Ski","Swimming","Tennis","Volleyball","Water Polo"];
    $scope.positions = ['Agent', 'Athlete', 'Coach',"Scout"];
    $scope.genders = ['Male','Female'];

}]);
