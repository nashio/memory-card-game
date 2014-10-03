define(function( require, exports, module ){

var backbone = require('backbone');

var Score = backbone.Model.extend({

    defaults: {
        score: 0
    },

    offset: 10,

    initialize: function(){

    },

    decreaseScore: function(){
        var newScore = this.get('score') - Math.round(this.offset / 2);
        this.set('score', + newScore);
    },

    increaseScore: function(){
        var newScore = this.get('score') + (this.offset * 3);
        this.set('score', + newScore);
    }

});

exports.Score = Score;

});
