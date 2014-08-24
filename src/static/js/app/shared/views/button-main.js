define(function (require, exports, module) {

var rich = require('rich');
var StateModifier = require('famous/modifiers/StateModifier');
var template = require('hbs!../templates/button-main');

var SlideButton = rich.ItemView.extend({
    template : template,
    size: [300, 50],

    triggers:{
        'click .action': 'open'
    },

    initialize : function(){
        this.modifier = new StateModifier({
            origin: [0.5, 0.5], // Set the origin to the center, this will center the rotation as well
            align: [.5, .5]
        });
    },
});

exports.SlideButton = SlideButton;

});
