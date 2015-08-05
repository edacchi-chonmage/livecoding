/// <reference path="../../typings/tsd.d.ts" />

module app {
  export function init () {
    angular.module('App', [
      'ui.router',
      'ngAnimate'
    ]);
  }
}

app.init();
