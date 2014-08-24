define(function (require, exports, module) {

var rich          = require('rich');
var StateModifier = require('famous/modifiers/StateModifier');
var template      = require('hbs!../templates/card-front');

var cardFrontItem = rich.ItemView.extend({
    template : template,
    size: [150, 150],
    className: 'front',

    triggers:{
        'click': 'click:open'
    },

    initialize : function(){
        this.modifier = new StateModifier({
            origin: [0.5, 0.5], // Set the origin to the center for rotation
            align: [.5, .5]
        });
    },


});

exports.cardFrontItem = cardFrontItem;

});