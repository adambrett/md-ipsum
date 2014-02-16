(function(global) {
    "use strict";

    ZeroClipboard.config({
        moviePath: global.moviePath,
        forceHandCursor: true
    });

    function Ipsum(elements) {
        this.elements = elements;
        this.init();
    }

    Ipsum.prototype.init = function() {
        for (var i = 0; i < this.elements.length; i++) {
            this.createClient(this.elements[i]);
        }
    };

    Ipsum.prototype.createClient = function(element) {
        var client = new ZeroClipboard(element);
        client.setText(this.getText(element));
        this.bindLoad(client);
    };

    Ipsum.prototype.getText = function (element) {
        return element.parentNode.getElementsByTagName('textarea')[0].value;
    };

    Ipsum.prototype.bindLoad = function (client) {
        var _this = this;
            console.log(client);
        client.on('load', function (client) {
            // _this.bindComplete(client);
        });
    };

    Ipsum.prototype.bindComplete = function (client) {
        var _this = this;
        client.on('complete', function(client, args) {
            console.log(args);
            _this.flashCopied();
        });

    };

    Ipsum.prototype.bindLoad = function (client) {
        client.on('load', function(client) {
        });
    };

    Ipsum.prototype.flashCopied = function () {
        var element = document.getElementById('#copied');
        _this.removeClass(element, 'fadeOut');
        this.addClass(element, 'fadeIn');

        var _this = this;
        setTimeout(function () {
            _this.removeClass(element, 'fadeIn');
            _this.addClass(element, 'fadeOut');
        }, 500);
    };

    Ipsum.prototype.addClass = function (element, className) {
        if (element.classList) {
            element.classList.add(className);
        }
        else {
            element.className += ' ' + className;
        }
    };

    Ipsum.prototype.removeClass = function (element, className) {
        if (element.classList) {
            element.classList.remove(className);
        }
        else {
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };

    global.ipsum = new Ipsum(document.getElementsByTagName('legend'));
})(window);
