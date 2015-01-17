(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./www/js/app.js":[function(require,module,exports){
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(["$ionicPlatform", function($ionicPlatform) {
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
}])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

    .state('app.categories', {
      url: "/categories",
      views: {
        'menuContent': {
          templateUrl: "templates/categories.html",
          controller: 'CategoriesCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/category/:catId",
    views: {
      'menuContent': {
        templateUrl: "templates/category.html",
        controller: 'CategoryCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/categories');
}]);

},{}],"./www/js/controllers.js":[function(require,module,exports){
angular.module('starter.controllers', [])

.controller('AppCtrl', ["$scope", "$ionicModal", "$timeout", function($scope, $ionicModal, $timeout) {
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
}])

.controller('CategoriesCtrl', ["$scope", function($scope) {
  $scope.categories = [
  { title: 'Image Categorization', id: 1 , tasks: 321, icon: 'icon ion-ios7-filing-outline'},
  { title: 'Information Search', id: 2, tasks: 119, icon: 'icon ion-ios7-search'},
  { title: 'Image Filtering', id: 3, tasks: 13, icon: 'icon ion-ios7-settings'},
  { title: 'Emotion Rating', id: 4, tasks: 78, icon: 'icon ion-ios7-star-outline'},
  { title: 'Image Tagging', id: 5, tasks: 62, icon: 'icon ion-ios7-pricetag-outline'},
  { title: 'Transcription', id: 6, tasks: 193, icon: 'icon ion-ios7-compose-outline'}
  ];
}])

.controller('CategoryCtrl', ["$scope", "$stateParams", function($scope, $stateParams) {
  $scope.pid = $stateParams['catId']
}]);

},{}]},{},["./www/js/app.js","./www/js/controllers.js"]);
