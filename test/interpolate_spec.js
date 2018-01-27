/* jshint globalstrict: true */
/* global publishExternalAPI: false, createInjector: false */
'use strict';

describe('$interpolate', function () {

    beforeEach(function () {
        delete window.angular;
        publishExternalAPI();
    });

    it('exist', function () {
        var injector = createInjector(['ng']);
        expect(injector.has('$interpolate')).toBe(true);
    });

    it('produces an identity function for static content', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var inter = $interpolate('hello');
        expect(inter instanceof Function).toBe(true);
        expect(inter()).toBe('hello');
    });

    it('evaluates a single expression', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var inter = $interpolate('{{anAttr}}');
        expect(inter({anAttr: '42'})).toBe('42');
    });

    it('evaluates many expressions', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var inter = $interpolate('First {{anAttr}}, then {{anotherAttr}}!');
        expect(inter({anAttr: '42', anotherAttr: '43'})).toBe('First 42, then 43!');
    });

    it('passes through ill-defined interpolations', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var inter = $interpolate('why u no }}work{{');
        expect(inter({})).toBe('why u no }}work{{');
    });

    it('turns nulls into empty strings', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var inter = $interpolate('{{aNull}}');
        expect(inter({aNull: null})).toBe('');
    });

    it('turns undefineds into empty strings', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var inter = $interpolate('{{aUndefined}}');
        expect(inter({})).toBe('');
    });

    it('turns numbers into strings', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var inter = $interpolate('{{aNumber}}');
        expect(inter({aNumber: 42})).toBe('42');
    });

    it('turns booleans into strings', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var inter = $interpolate('{{aBoolean}}');
        expect(inter({aBoolean: true})).toBe('true');
    });

    it('turns arrays into JSON strings', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var inter = $interpolate('{{anArray}}');
        expect(inter({anArray: [1, 2, [3]]})).toBe('[1,2,[3]]');
    });

    it('turns objects into JSON strings', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var inter = $interpolate('{{anObject}}');
        expect(inter({anObject: {a: 1, b: '2'}})).toBe('{"a":1,"b":"2"}');
    });

    it('unescapes escaped sequences', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var inter = $interpolate('\\{\\{expr\\}\\} {{expr}} \\{\\{expr\\}\\}');
        expect(inter({expr: 'value'})).toBe('{{expr}} value {{expr}}');
    });

    it('does not return function when flagged and no expressions', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var inter = $interpolate('static content only', true);
        expect(inter).toBeFalsy();
    });

    it('returns function when flagged and has expressions', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var inter = $interpolate('has an {{expr}}', true);
        expect(inter).not.toBeFalsy();
    });



});
