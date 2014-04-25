var slice = Array.prototype.slice;

module.exports = function(object) {

    if (typeof object.on !== "undefined") {
        return object;
    }

    var events = {};

    object.on = function(identifier, fnc) {
        events[identifier] = events[identifier] || [];
        events[identifier].push(fnc);

        return object;
    };

    object.off = function(identifier, fnc) {
        if (identifier in events === true) {
            events[identifier].splice(events[identifier].indexOf(fnc), 1);
        }

        return object;
    };

    object.emit = function(identifier, fnc) {
        if (identifier in events === true) {
            for (var i = 0; i < events[identifier].length; i++) {
                events[identifier][i].apply(object, slice.call(arguments, 1));
            }
        }

        return object;
    };

    return object;

};
