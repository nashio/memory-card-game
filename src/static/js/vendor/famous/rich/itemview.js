define(function (require, exports, module) {
    var marionette  = require('marionette');
    var Surface = require('famous/core/Surface');
    var FamousView = require('./view').FamousView;


    var obj = {};
    _.extend(obj, marionette.ItemView.prototype, FamousView.prototype);

    var FamousItemView = FamousView.extend(obj);

    FamousItemView = FamousItemView.extend({
        renderable: null,

        constructor: function(options){
            FamousView.prototype.constructor.apply(this, arguments);
        },

        shouldInitializeRenderable: function(){
            return true;
        },

        initializeRenderable: function(){
            var renderable = new Surface(this.properties);
            return renderable;
        },

    });

    exports.FamousItemView = FamousItemView;
});
