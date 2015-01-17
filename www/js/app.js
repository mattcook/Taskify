// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

firebase = require('firebase');
angularfire = require('angularfire');

angular.module('starter', ['ionic', 'starter.controllers', 'firebase'])

.run(function($ionicPlatform) {
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
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl'
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.types', {
    url: "/types",
    views: {
      'menuContent': {
        templateUrl: "templates/types.html",
        controller: 'TypesCtrl'
      }
    }
  })

  .state('app.categorization', {
    url: "/type/image-categorization",
    views: {
      'menuContent': {
        templateUrl: "templates/types/categorization.html",
        controller: 'CategorizationCtrl'
      }
    }
  })

  .state('app.info-search', {
    url: "/type/info-search",
    views: {
      'menuContent': {
        templateUrl: "templates/types/info_search.html",
        controller: 'InfoSearchCtrl'
      }
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
  $urlRouterProvider.otherwise('/login');
});
