/* jshint globalstrict: true */
/* global filter: false, register: false, parse: false */
'use strict';

describe('filter', function () {

    it('can be registered and obtained', function () {
        var myFilter = function () { };
        var myFilterFactory = function () {
            return myFilter;
        };

        register('my', myFilterFactory);

        expect(filter('my')).toBe(myFilter);
    });

    it('allows registering multiple filters with an object', function () {
        var myFilter = function () { };
        var myOtherFilter = function () { };

        register({
            my: function () {
                return myFilter;
            },
            myOther: function () {
                return myOtherFilter;
            }
        });

        expect(filter('my')).toBe(myFilter);
        expect(filter('myOther')).toBe(myOtherFilter);
    });

    it('can parse filter expression', function () {
        register('upcase', function () {
            return function (str) {
                return str.toUpperCase();
            };
        });

        var fn = parse('aString | upcase');

        expect(fn({aString: 'Hello'})).toBe('HELLO');
    });

    it('can parse filter chain expression', function () {
        register('upcase', function () {
            return function (s) {
                return s.toUpperCase();
            };
        });
        register('exclamate', function () {
            return function (s) {
                return s + '!';
            };
        });

        var fn = parse('"hello" | upcase | exclamate');

        expect(fn()).toBe('HELLO!');
    });

    it('can pass an additional argument to filters', function () {
        register('repeat', function () {
            return function (s, times) {
                return _.repeat(s, times);
            };
        });

        var fn = parse('"hello" | repeat: 3');

        expect(fn()).toBe('hellohellohello');
    });

    it('can pass several additional arguments to filters', function () {
        register('surround', function () {
            return function (s, left, right) {
                return left + s + right;
            };
        });

        var fn = parse('"hello" | surround: "*": "!"');

        expect(fn()).toBe('*hello!');
    });

});
