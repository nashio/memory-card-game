define(function (require, exports, module) {

    var utils = {
        getRandomNumber : function(min, max) {
          return Math.round( Math.random() * (max - min) + min );
        }
    }

    exports.utils = utils;

});
