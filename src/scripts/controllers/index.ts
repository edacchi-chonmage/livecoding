/// <reference path="../../../typings/tsd.d.ts" />

module app.controllers {
  class IndexController {
    public foo = 'Hello World';

    constructor () {
    }
  }

  export function initIndex () {
    angular.module('App')
      .controller('IndexCtrl', IndexController)
      .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
          .state('index', {
            url: '/',
            templateUrl: 'pages/index.html',
            title: 'foo title'
          })
        ;

        $urlRouterProvider.otherwise('/');
      })
    ;
  }
}

app.controllers.initIndex();
