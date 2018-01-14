/* jshint globalstrict: true */
'use strict';

var ngControllerDirective = function () {

    return {
        restrict: 'A',
        scope: true,
        controller: '@'
    };
};
