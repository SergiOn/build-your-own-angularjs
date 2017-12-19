/* jshint globalstrict: true */
/* global filterFilter: false */
'use strict';

function $FilterProvider($provide) {

    var filters = {};

    this.register = function (name, factory) {
        if (_.isObject(name)) {
            return _.map(name, function (factory, name) {
                return this.register(name, factory);
            }.bind(this));
        } else {
            return $provide.factory(name + 'Filter', factory);
        }
    };

    this.$get = ['$injector', function ($injector) {
        return function filter(name) {
            return $injector.get(name + 'Filter');
        };
    }];

    this.register('filter', filterFilter);

}
$FilterProvider.$inject = ['$provide'];

// 513
