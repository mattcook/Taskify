// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

firebase = require('firebase');
angularfire = require('angularfire');
auth = require('../factories/auth');

angular.module('starter', ['ionic', 'starter.controllers','starter.services','firebase'])

.run(['$ionicPlatform', '$rootScope', '$state','Auth', function($ionicPlatform, $rootScope, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  $rootScope.$on('$stateChangeError', function() {
    console.log
    if (arguments[4] === 'AUTH_REQUIRED') $state.go('login');
  });
}])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl',
    resolve: {
      'currentAuth': ['Auth', function(Auth) {
        console.log('login resolve');
        return Auth.$waitForAuth();
      }]
    }
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl',
    resolve: {
      'currentAuth': ['Auth', function(Auth) {
        console.log("REQUIRING AUTH IN APP")
        return Auth.$requireAuth();
      }]
    }
  })

  .state('app.types', {
    url: "/types",
    views: {
      'menuContent': {
        templateUrl: "templates/types.html",
        controller: 'TypesCtrl'
      }
    },
    resolve: {
      'currentAuth': ['Auth', function(Auth) {
        console.log("requiring auth in types")
        return Auth.$requireAuth();
      }]
    }
  })

  .state('app.categorization', {
    url: "/type/image-categorization",
    views: {
      'menuContent': {
        templateUrl: "templates/types/categorization.html",
        controller: 'CategorizationCtrl'
      }
    },
    resolve: {
      'currentAuth': ['Auth', function(Auth) {
        return Auth.$requireAuth();
      }]
    }

  })

  .state('app.info-search', {
    url: "/type/info-search",
    views: {
      'menuContent': {
        templateUrl: "templates/types/info_search.html",
        controller: 'InfoSearchCtrl'
      }
    },
    resolve: {
      'currentAuth': ['Auth', function(Auth) {
        return Auth.$requireAuth();
      }]
    }
  })

  .state('app.filtering', {
    url: "/type/image-filter",
    views: {
      'menuContent': {
        templateUrl: "templates/types/filtering.html",
        controller: 'FilterCtrl'
      }
    }
  })

  .state('app.emotion', {
    url: "/type/emotion-sentiment",
    views: {
      'menuContent': {
        templateUrl: "templates/types/emotion.html",
        controller: 'EmotionCtrl'
      }
    }
  })

  .state('app.tagging', {
    url: "/type/tagging",
    views: {
      'menuContent': {
        templateUrl: "templates/types/tagging.html",
        controller: 'TaggingCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('login');
});
