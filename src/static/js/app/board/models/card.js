define(function( require, exports, module ){

var backbone = require('backbone');

var Card = backbone.Model.extend({

    defaults: {
        open: 0, // not flipped
        status: 1 // card still in game
    },

    close: function(){
        this.set('open', 0);
    }

});

exports.Card = Card;

});
