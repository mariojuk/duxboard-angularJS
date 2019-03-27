sportApp.service('constantServices',['$http', function($http) {

    return {
        getSport: function () {
            return ["American Football", "Baseball", "Basketball", "Biathlon", "Billiards", "Bodybuilding", "Bowling", "Boxing", "Cricket", "Curling", "Cycling", "Dancesport", "Darts", "Deadlifting", "Diving", "E-Sport", "Extreme Sports", "Golf", "Gymnastics", "Handball", "Hockey", "Horse Racing", "Ice Dancing", "Judo", "Martial Arts", "Motorsports", "Polo", "Rugby", "Sailing", "Soccer", "Ski", "Swimming", "Tennis", "Volleyball", "Water Polo"];
        }
    }
}]);