define(function (require, exports, module) {

var rich               = require('rich');
var Modifier           = require('famous/core/Modifier');
var Transform          = require('famous/core/Transform');
var app                = require('app/famous/core');
var backbone           = require('backbone');
var cardCollectionView = require('./card-collection-view').cardCollectionView;
var scoreView          = require('./score-view').ScoreView;;
var cardsCollection    = require('../collections/cards').Cards;
var scoreModel         = require('../models/score').Score;
var utils              = require('app/utils').utils;


var contextModifier = new Modifier({
        transform: Transform.translate(20, 20, 0)
});

var scoreModifier = new Modifier({
        transform: Transform.translate(640, 20, 0)
});

var mainLayout = rich.LayoutView.extend({
    name: 'mainLayout',

    regions:{
        main: app.Region.extend({modifier: contextModifier}),
        score: app.Region.extend({modifier: scoreModifier})
    },

    shouldInitializeRenderable: function(){
        return false;
    },

    onShow : function(){
        var cards = [];
        var total = 16;
        var perRow = 4;
        var pairIndex = 1;
        var i = 0;

        // get each index twice to create pairs
        // 1,1, 2,2, 3,3, 4,4...

        while(i < total){
            cards.push({
                idx: pairIndex,
                img: 'card-' + pairIndex + '.jpg'
            });

            i++;

            if(i % 2 == 0){
                pairIndex++;
            }
        }

        cards = _.shuffle(cards);

        this.data = new cardsCollection(cards);


        this.collectionView = new cardCollectionView({
            collection: this.data,
            perRow: perRow
        });

        // Show in region
        this.main.show(this.collectionView);

        this.scoreModel = new scoreModel();
        this.scoreView = new scoreView({
            model: this.scoreModel,
            cards: this.data
        });

        // Show in region
        this.score.show(this.scoreView);

    }

});

exports.mainLayout = mainLayout;

});
