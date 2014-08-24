define(function (require, exports, module) {

var rich            = require('rich');
var Transform       = require('famous/core/Transform');
var Easing          = require('famous/transitions/Easing');
var scoreItem       = require('./score-item').ScoreItem;

var ScoreView = rich.View.extend({
    nestedSubviews: true,
    size: [200, 400],

    initialize : function(){
        this.scoreItem = new scoreItem({
            model: this.model,
        });
        this.addSubview(this.scoreItem);

        this.cards = this.options.cards;

        this.listenTo(this.cards, 'alert:pair', this.increaseScore, this);
        this.listenTo(this.cards, 'alert:fail', this.decreaseScore, this);
    },

     sizeForViewAtIndex: function(view, index){
        // dynamic sizing, you could also specify size: [w, h]
        // as an option on NavigationView if you knew you
        // wanted a consistent size
        var size = rich.utils.getViewSize(view);
        return size;
    },

    increaseScore: function(e){
        var newScore = this.model.get('score') + (this.model.offset * 2);
        this.model.increaseScore();
    },

    decreaseScore: function(e){
        var newScore = this.model.get('score') - this.model.offset;
        this.model.decreaseScore();
    }

});

exports.ScoreView = ScoreView;

});
