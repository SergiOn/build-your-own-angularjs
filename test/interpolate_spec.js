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



});
