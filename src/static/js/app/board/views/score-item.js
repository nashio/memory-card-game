define(function (require, exports, module) {

var rich            = require('rich');
var StateModifier   = require('famous/modifiers/StateModifier');
var template        = require('hbs!../templates/score');

var ScoreItem = rich.ItemView.extend({
    template : template,
    size: [150, 200],
    className: 'score',

    initialize : function(){
        this.modifier = new StateModifier({
            origin: [0, 0], // Set the origin to the center for rotation
            align: [0, 0]
        });
        this.listenTo(this.model, 'change', this.updateScore);
    },

    updateScore: function(){
        this.$el.find('span').html(this.model.get('score'));
    }

});

exports.ScoreItem = ScoreItem;

});