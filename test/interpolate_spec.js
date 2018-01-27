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

        var interp = $interpolate('hello');
        expect(interp instanceof Function).toBe(true);
        expect(interp()).toBe('hello');
    });

    it('evaluates a single expression', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var interp = $interpolate('{{anAttr}}');
        expect(interp({anAttr: '42'})).toBe('42');
    });

    it('evaluates many expressions', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var interp = $interpolate('First {{anAttr}}, then {{anotherAttr}}!');
        expect(interp({anAttr: '42', anotherAttr: '43'})).toBe('First 42, then 43!');
    });

    it('passes through ill-defined interpolations', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var interp = $interpolate('why u no }}work{{');
        expect(interp({})).toBe('why u no }}work{{');
    });

    it('turns nulls into empty strings', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var interp = $interpolate('{{aNull}}');
        expect(interp({aNull: null})).toBe('');
    });

    it('turns undefineds into empty strings', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var interp = $interpolate('{{aUndefined}}');
        expect(interp({})).toBe('');
    });

    it('turns numbers into strings', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var interp = $interpolate('{{aNumber}}');
        expect(interp({aNumber: 42})).toBe('42');
    });

    it('turns booleans into strings', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var interp = $interpolate('{{aBoolean}}');
        expect(interp({aBoolean: true})).toBe('true');
    });

    it('turns arrays into JSON strings', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var interp = $interpolate('{{anArray}}');
        expect(interp({anArray: [1, 2, [3]]})).toBe('[1,2,[3]]');
    });

    it('turns objects into JSON strings', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var interp = $interpolate('{{anObject}}');
        expect(interp({anObject: {a: 1, b: '2'}})).toBe('{"a":1,"b":"2"}');
    });

    it('unescapes escaped sequences', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var interp = $interpolate('\\{\\{expr\\}\\} {{expr}} \\{\\{expr\\}\\}');
        expect(interp({expr: 'value'})).toBe('{{expr}} value {{expr}}');
    });

    it('does not return function when flagged and no expressions', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var interp = $interpolate('static content only', true);
        expect(interp).toBeFalsy();
    });

    it('returns function when flagged and has expressions', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var interp = $interpolate('has an {{expr}}', true);
        expect(interp).not.toBeFalsy();
    });

    it('uses a watch delegate', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');

        var interp = $interpolate('has an {{expr}}');
        expect(interp.$$watchDelegate).toBeDefined();
    });

    it('correctly returns new and old value when watched', function () {
        var injector = createInjector(['ng']);
        var $interpolate = injector.get('$interpolate');
        var $rootScope = injector.get('$rootScope');

        var interp = $interpolate('{{expr}}');
        var listenerSpy = jasmine.createSpy();

        $rootScope.$watch(interp, listenerSpy);
        $rootScope.expr = 42;

        $rootScope.$apply();
        expect(listenerSpy.calls.mostRecent().args[0]).toBe('42');
        expect(listenerSpy.calls.mostRecent().args[1]).toBe('42');

        $rootScope.expr++;
        $rootScope.$apply();
        expect(listenerSpy.calls.mostRecent().args[0]).toBe('43');
        expect(listenerSpy.calls.mostRecent().args[1]).toBe('42');
    });

    it('allows configuring start and end symbols', function () {
        var injector = createInjector(['ng', function ($interpolateProvider) {
            $interpolateProvider.startSymbol('FOO').endSymbol('OOF');
        }]);
        var $interpolate = injector.get('$interpolate');
        expect($interpolate.startSymbol()).toBe('FOO');
        expect($interpolate.endSymbol()).toBe('OOF');
    });

    it('works with start and end symbols that differ from default', function () {
        var injector = createInjector(['ng', function ($interpolateProvider) {
            $interpolateProvider.startSymbol('FOO').endSymbol('OOF');
        }]);
        var $interpolate = injector.get('$interpolate');
        var interpFn = $interpolate('FOOmyExprOOF');
        expect(interpFn({myExpr: 42})).toBe('42');
    });

    it('does not work with default symbols when reconfigured', function () {
        var injector = createInjector(['ng', function ($interpolateProvider) {
            $interpolateProvider.startSymbol('FOO').endSymbol('OOF');
        }]);
        var $interpolate = injector.get('$interpolate');
        var interpFn = $interpolate('{{myExpr}}');
        expect(interpFn({myExpr: 42})).toBe('{{myExpr}}');
    });

    it('supports unescaping for reconfigured symbols', function () {
        var injector = createInjector(['ng', function ($interpolateProvider) {
            $interpolateProvider.startSymbol('FOO').endSymbol('OOF');
        }]);
        var $interpolate = injector.get('$interpolate');
        var interpFn = $interpolate('\\F\\O\\OmyExpr\\O\\O\\F');
        expect(interpFn({})).toBe('FOOmyExprOOF');
    });

    it('denormalizes directive templates', function () {
        var injector = createInjector(['ng',
            function ($interpolateProvider, $compileProvider) {
            $interpolateProvider.startSymbol('[[').endSymbol(']]');
            $compileProvider.directive('myDirective', function () {
                return {
                    template: 'Value is {{myExpr}}'
                };
            });
        }]);
        injector.invoke(function ($compile, $rootScope) {
            var el = $('<div my-directive></div>');
            $rootScope.myExpr = 42;
            $compile(el)($rootScope);
            $rootScope.$apply();

            expect(el.html()).toBe('Value is 42');
        });
    });

});
