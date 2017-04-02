// here is the vehicle that the person chooses
var Vehicle3 = (function() {
    "use strict";

    var car;

    function firstPlayer() {
        //if whiche ever car get sellected its gonna appear
        car = "js/models/mustang-white.js";
        return car;
    }
    firstPlayer();

    console.log(car);

    return {
        firstPlayer: firstPlayer
    };
})();
