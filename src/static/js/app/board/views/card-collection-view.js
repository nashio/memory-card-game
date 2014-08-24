define(function (require, exports, module) {

var rich       = require('rich');
var Modifier   = require('famous/core/Modifier');
var Transform  = require('famous/core/Transform');
var CardView   = require('./card-view').CardView;

var cardCollectionView = rich.CollectionView.extend({
    childView: CardView,
    size: [700, 400],

    initialize: function(){
        this.perRow = this.options.perRow;
        this.listenTo(this.collection, 'close:all', this.closeAll);
        this.listenTo(this.collection, 'alert:pair', this.alertPair);
    },

    modifierForViewAtIndex: function(view, index){
        var padding = 4;
        var width = view.getSize()[0];
        var height = view.getSize()[1];
        var row = Math.floor(index / this.perRow);
        var col = index % this.perRow;

        var topOffset = 0 || ((height + padding) * row );
        var leftOffset = (width + padding) * col;

        return new Modifier({
            transform: Transform.translate(leftOffset, topOffset, 0)
        });
    },

    // close the cards, no pair
    closeAll: function(){
        this.children.each(function(childView){
            if( childView.model.get('open') && childView.model.get('status')){
                childView.model.close();

            }
        });
    },

    // shows animation indicating you made a pair
    alertPair: function(card1, card2){
        this.children.each(function(childView){
            if( childView.model == card1 || childView.model == card2 ){
                setTimeout(function(){
                    childView.alertWin();
                }, 800);
            }
        });
    }

});

exports.cardCollectionView = cardCollectionView;

});