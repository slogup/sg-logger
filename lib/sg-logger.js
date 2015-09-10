var colog = require('colog');

function Logger(label) {

    label = label.split("/");
    label = label[label.length - 2] + "/" + label[label.length - 1];
    function log(func, arguments) {
        if (arguments) {

            var log = "";
            for (var i = 0; i < arguments.length; ++i) {
                if (arguments[i] instanceof Object) {
                    arguments[i] = JSON.stringify(arguments[i]);
                }
                log += (" " + arguments[i]);
            }
            func.call(colog, (label + ":" + log));
        }
    }

    this.g = function () {
        log(colog.answer, arguments);
    };

    this.i = function () {
        log(colog.success, arguments);
    };

    this.d = function () {
        if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV === undefined) {
            log(colog.info, arguments);
        }
    };

    this.w = function () {
        log(colog.warning, arguments);
    };

    this.e = function () {
        log(colog.error, arguments);
    };
}

module.exports = Logger;
