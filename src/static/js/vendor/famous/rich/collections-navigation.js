define(function (require, exports, module) {
    var Engine = require('famous/core/Engine');
    var Easing = require('famous/transitions/Easing');
    var RenderNode = require('famous/core/RenderNode');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');
    var FamousView = require('./view').FamousView;

    var NavigationController = FamousView.extend({
        views: null,
        topView: null,
        transitionDuration: 200,
        _inTransition: false,
        _isPop: false,
        _transitionIn: null,
        _transitionOut: null,

        constructor: function(){
            this.views = [];

            this.view = new FamousView();
            FamousView.prototype.constructor.apply(this, arguments);
        },

        _render: function(){
            var root = this.createRenderNode();

            if(root){
                this._spec = root.render();
                this.root = root;
            } else {
                this._spec = this.root.render();
            }
        },

        _prepareModification: function(transform, transition){
            var deferred = $.Deferred();

            var self = this;

            var tick = function(){
                self._render();
            };

            var callback = function(){
                Engine.removeListener('postrender', tick);
                deferred.resolve(this);
            }.bind(this);

            Engine.on('postrender', tick);

            return {deferred: deferred.promise(), callback: callback};
        },

        createRenderNode: function(){
            // var duration = 200;
            // var node;
            // var transformStart;
            // var transformEnd;
            // var previousViewtransitionKey;
            // var newViewtransitionKey;
            // var root = new RenderNode();
            // var newView = this.topView;
            // var previousView = null;
            // var previousViewIndex = this.views.length - 2;


            // if(previousViewIndex >= 0){
            //     previousView = this.views[previousViewIndex];
            // }

            // if(previousView){

            //     if(!this._inTransition){

            //         previousViewtransitionKey = this._isPop ? 'transitionIn' : 'transitionOut';

            //         previousView.context = this.context;
            //         previousView.navigationController = this;

            //         transformStart = this._isPop ? Transform.translate(-300, 0, 0) :
            //                                        Transform.identity;


            //         transformEnd = this._isPop ? Transform.identity :
            //                                      Transform.translate(-300, 0, 0);


            //         this._transitionOut = new StateModifier({
            //             transform: transformStart
            //         });


            //         previousView.triggerMethod(previousViewtransitionKey);

            //         this._transitionOut.setTransform(
            //             transformEnd,
            //             {duration: duration, curve: Easing.outQuad}
            //         );
            //     }

            //     node = new RenderNode();
            //     node.add(this._transitionOut).add(previousView);
            //     root.add(node);
            // }

            // if(newView){

            //     if(!this._inTransition){

            //         newViewtransitionKey = this._isPop ? 'transitionOut' : 'transitionIn';

            //         newView.context = this.context;
            //         newView.navigationController = this;

            //         transformStart = this._isPop ? Transform.identity :
            //                                        Transform.translate(300, 0, 0);


            //         transformEnd = this._isPop ? Transform.translate(300, 0, 0) :
            //                                      Transform.identity;

            //         this._transitionIn = new StateModifier({
            //             transform: transformStart
            //         });

            //         var obj = this._prepareModification();
            //         this._inTransition = true;

            //         obj.deferred.then(function(){

            //             newView.triggerMethod(newViewtransitionKey + 'Complete');

            //             if(previousView){
            //                 previousView.triggerMethod(previousViewtransitionKey + 'Complete');
            //             }

            //             this._transitionIn = null;
            //             this._transitionOut = null;
            //             this._inTransition = false;

            //             if(this._isPop){
            //                 var v = this.views.pop();
            //                 v.destroy();
            //             }

            //             this._isPop = false;

            //         }.bind(this));

            //         newView.triggerMethod(newViewtransitionKey);
            //         this._transitionIn.setTransform(
            //             transformEnd,
            //             {duration: duration, curve: Easing.outQuad},
            //             obj.callback
            //         );
            //     }

            //     node = new RenderNode();
            //     node.add(this._transitionIn).add(newView);
            //     root.add(node);
            // }

            if(this._inTransition) return;

            var root = new RenderNode();

            var nodeOut = this.createTransitionOutNode();
            var nodeIn = this.createTransitionInNode();

            if(nodeOut){
                root.add(nodeOut);
            }

            if(nodeIn){
                root.add(nodeIn);
            }

            return root;
        },

        createTransitionInNode: function(){
            var duration = this.transitionDuration;
            var view = this.topView;
            var node;
            var transitionKey;
            var transformStart;
            var transformEnd;

            if(!view) return null;

            transitionKey = this._isPop ? 'transitionOut' : 'transitionIn';

            view.context = this.context;
            view.navigationController = this;

            transformStart = this._isPop ? Transform.identity :
                                           Transform.translate(300, 0, 0);


            transformEnd = this._isPop ? Transform.translate(300, 0, 0) :
                                         Transform.identity;

            this._transitionIn = new StateModifier({
                transform: transformStart
            });

            var obj = this._prepareModification();
            this._inTransition = true;

            obj.deferred.then(function(){

                view.triggerMethod(transitionKey + 'Complete');

                // if(previousView){
                //     previousView.triggerMethod(previousViewtransitionKey + 'Complete');
                // }

                this._transitionIn = null;
                this._transitionOut = null;
                this._inTransition = false;

                if(this._isPop){
                    var v = this.views.pop();
                    this.topView = this.views[this.views.length - 1];
                    v.destroy();
                    this.root = null;
                }

                this._isPop = false;


            }.bind(this));

            view.triggerMethod(transitionKey);

            this._transitionIn.setTransform(
                transformEnd,
                {duration: duration, curve: Easing.outQuad},
                obj.callback
            );

            node = new RenderNode();
            node.add(this._transitionIn).add(view);

            return node;
        },

        createTransitionOutNode: function(){
            var node;
            var duration = this.transitionDuration;
            var view = null;
            var transitionKey;
            var transformStart;
            var transformEnd;

            var viewIndex = this.views.length - 2;


            if(viewIndex >= 0){
                view = this.views[viewIndex];
            }

            if(!view) return null;

            transitionKey = this._isPop ? 'transitionIn' : 'transitionOut';

            view.context = this.context;
            view.navigationController = this;

            transformStart = this._isPop ? Transform.translate(-300, 0, 0) :
                                           Transform.identity;

            transformEnd = this._isPop ? Transform.identity :
                                         Transform.translate(-300, 0, 0);

            this._transitionOut = new StateModifier({
                transform: transformStart
            });

            view.triggerMethod(transitionKey);

            this._transitionOut.setTransform(
                transformEnd,
                {duration: duration, curve: Easing.outQuad}
            );

            node = new RenderNode();
            node.add(this._transitionOut).add(view);

            return node;
        },

        pushView: function(view){
            this.views.push(view);
            this.topView = view;
            this.root = null;
        },

        popView: function(){
            if(this.views.length > 1){
                this._isPop = true;
                this.root = null;
            }
        }
    });

    exports.NavigationController = NavigationController;
});
