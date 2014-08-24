define(function( require, exports, module ){

var backbone    = require('backbone');
var cardModel   = require('../models/card').Card;
var Cards = backbone.Collection.extend({

    model : cardModel,

    // check if limit number of cards where flipped

    verifyCardOpen: function(card){
        var openCards = this.getOpenCards();

        if( openCards.length > 1){
            this.trigger('close:all');
        }

        card.set('open', 1);
        this.findPair();
    },

    verifyCardClose: function(card){
        if( card.get('status') ){
            card.set('open', 0);
        }
    },

    getOpenCards: function(){
        return this.filter(function(model){
            return model.get('open') && model.get('status');
        });
    },

    findPair: function(){
        var openCards = this.getOpenCards();
        if( openCards.length > 1){
            if( openCards[0].get('idx') == openCards[1].get('idx') ){
                openCards[0].set('status', 0); // kill them
                openCards[1].set('status', 0);
                this.trigger('alert:pair', openCards[0], openCards[1]);
                return true;
            }
            this.trigger('alert:fail', openCards[0], openCards[1]);
        }
        return false;
    }


});

exports.Cards = Cards;

});
