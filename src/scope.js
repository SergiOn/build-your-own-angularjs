/* jshint globalstrict: true */
'use strict';

function initWatchVal() { }

function Scope() {
    this.$$watchers = [];
    this.$$lastDirtyWatch = null;
    this.$$asyncQueue = [];
}

Scope.prototype.$watch = function (watchFn, listenerFn, valueEq) {
    var watcher = {
        watchFn: watchFn,
        listenerFn: listenerFn || function () { },
        valueEq: !!valueEq,
        last: initWatchVal
    };
    this.$$watchers.push(watcher);
    this.$$lastDirtyWatch = null;
};

Scope.prototype.$$areEqual = function (newValue, oldValue, valueEq) {
    if (valueEq) {
        return _.isEqual(newValue, oldValue);
    } else {
        return newValue === oldValue ||
            (typeof newValue === 'number' &&
            typeof oldValue === 'number' &&
            isNaN(newValue) && isNaN(oldValue));
    }
};

Scope.prototype.$$digestOnce = function () {
    var self = this;
    var dirty = false;
    var newValue, oldValue;
    _.forEach(this.$$watchers, function (watcher) {
        newValue = watcher.watchFn(self);
        oldValue = watcher.last;
        if (!self.$$areEqual(newValue, oldValue, watcher.valueEq)) {
            self.$$lastDirtyWatch = watcher;
            watcher.last = (watcher.valueEq ? _.cloneDeep(newValue) : newValue);
            watcher.listenerFn(
                newValue,
                oldValue === initWatchVal ? newValue : oldValue,
                self
            );
            dirty = true;
        } else if (self.$$lastDirtyWatch === watcher) {
            return false;
        }
    });
    return dirty;
};

Scope.prototype.$digest = function () {
    var dirty = false;
    var ttl = 10;
    this.$$lastDirtyWatch = null;
    do {
        while (this.$$asyncQueue.length) {
            var asyncTask = this.$$asyncQueue.shift();
            asyncTask.scope.$eval(asyncTask.expression);
        }
        dirty = this.$$digestOnce();
        if (dirty && !(ttl--)) {
            throw '10 digest iterations reached';
        }
    } while (dirty);
};

Scope.prototype.$eval = function (expr, locals) {
    return expr(this, locals);
};

Scope.prototype.$apply = function (expr) {
    try {
        return this.$eval(expr);
    } finally {
        this.$digest();
    }
};

Scope.prototype.$evalAsync = function (expr) {
    this.$$asyncQueue.push({ scope: this, expression: expr });
};
