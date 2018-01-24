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

});
