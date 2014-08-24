define(function (require, exports, module) {
var _ = require('underscore');

function getViewSize(view){
    var className = _.result(view, 'className');
    var fragment = document.createDocumentFragment();
    var div = document.createElement('div');

    div.setAttribute('class', className);
    div.setAttribute('style', 'visibility:hidden; position:absolute;');

    div.innerHTML = view.renderHTML();

    fragment.appendChild(div);

    document.body.appendChild(fragment);
    var rect = div.getBoundingClientRect();
    document.body.removeChild(div);

    return [rect.width, rect.height];
}

exports.getViewSize = getViewSize;

});
