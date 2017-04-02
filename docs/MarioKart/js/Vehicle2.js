// here is the vehicle that the person chooses
var Vehicle2 = (function() {
    "use strict";

    var car;

    function firstPlayer() {
        //if whiche ever car get sellected its gonna appear
        car = "js/models/mustang-blue.js";
        return car;
    }
    firstPlayer();

    console.log(car);

    return {
        firstPlayer: firstPlayer
    };
})();
