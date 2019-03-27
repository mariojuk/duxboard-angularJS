sportApp.filter('humanizeTime', function () {
    
    function humanizeTime(input){
        var time = new Date(input).getTime();
        return humanizeDuration(Date.now() - time, { round: true , largest: 1 }) + " ago";
    };

    humanizeTime.$stateful = true;

    return humanizeTime;
});