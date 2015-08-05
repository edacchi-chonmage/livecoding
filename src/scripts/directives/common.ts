/// <reference path="../../../typings/tsd.d.ts" />

module app.directives {
  export function init () {
    angular.module('App')
      .directive('appTitle', ['$rootScope', function ($rootScope) {
        return {
          restrict: 'A',
          link: function (scope, element) {
            var listener = function (event, state) {
              if (state.title) {
                var pageTitle = state.title;
                element.text(pageTitle);
              }
            };

            $rootScope.$on('$stateChangeSuccess', listener);
          }
        }
      }])
    ;
  }
}

app.directives.init();
