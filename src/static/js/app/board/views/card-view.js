define(function (require, exports, module) {

var rich           = require('rich');
var Transform      = require('famous/core/Transform');
var Easing         = require('famous/transitions/Easing');

var cardFrontItem  = require('./card-front-item').cardFrontItem;
var cardBackItem   = require('./card-back-item').cardBackItem;


var CardView = rich.View.extend({
    nestedSubviews: true,
    size: [150, 150],

    initialize : function(){

        this.front = new cardFrontItem({model: this.model});
        this.back = new cardBackItem({model: this.model});

        this.addSubview(this.back);
        this.addSubview(this.front);

        this.listenTo(this.front, 'click:open', this.wantsOpen);
        this.listenTo(this.back, 'click:close', this.wantsClose);

        this.listenTo(this.model, 'change:open', this.wantsCardFlip);
    },

    wantsCardFlip: function(){
        var open = this.model.get('open');
        if( open ){
            this.open();
        } else {
            this.close();
        }
    },

    wantsOpen: function(){
        var cards = this.model.collection;
        cards.verifyCardOpen(this.model);
    },

    wantsClose: function(){
        var cards = this.model.collection;
        cards.verifyCardClose(this.model);
    },

    wantsRemove: function(){
        this.trigger('remove', this);
    },

    open: function(){
        this.front.setTransform(
            Transform.rotateY(Math.PI),
            { duration : 800, curve: Easing.outQuad }
        );
        this.back.setTransform(
            Transform.rotateY(Math.PI),
            { duration : 800, curve: Easing.outQuad }
        );
    },

    close: function(){
        this.front.setTransform(
            Transform.identity,
            { duration : 800, curve: Easing.outQuad }
        );
        this.back.setTransform(
            Transform.identity,
            { duration : 800, curve: Easing.outQuad }
        );
    },

    alertWin: function(){

        this.back.setTransform(
            Transform.scale(1.5, 1.5, 1.5),
            { duration : 150, curve: Easing.inQuad }
        );

        this.front.setTransform(
            Transform.scale(1.5, 1.5, 1.5),
            { duration : 150, curve: Easing.inQuad }
        );

        this.open();

    }

});

exports.CardView = CardView;

});
