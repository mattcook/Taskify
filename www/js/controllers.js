angular.module('starter.controllers', ['firebase'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('TypesCtrl', function($scope, $firebase) {
  'use strict';
  var ref = new Firebase('https://mobile-turk.firebaseio.com/types');
  $scope.types = [
  { title: 'Image Categorization',
    id: 'categorization',
    tasks: 321,
    ref: ref.child('categorization'),
    icon: 'icon ion-ios7-filing-outline'},
  { title: 'Information Search',
    id: 2,
    tasks: 119,
    ref: ref.child('info'),
    icon: 'icon ion-ios7-search'},
  { title: 'Image Filtering',
    id: 3,
    tasks: 13,
    ref: ref.child('filtering'),
    icon: 'icon ion-ios7-settings'},
  { title: 'Emotion Rating',
    id: 4,
    tasks: 78,
    ref: ref.child('emotion'),
    icon: 'icon ion-ios7-star-outline'},
  { title: 'Image Tagging',
    id: 5,
    tasks: 62,
    ref: ref.child('tagging'),
    icon: 'icon ion-ios7-pricetag-outline'},
  { title: 'Transcription',
    id: 6,
    tasks: 193,
    ref: ref.child('transcription'),
    icon: 'icon ion-ios7-compose-outline'}
  ];

  for(var i=0; i<$scope.types.length; i++) {
    $scope.types[i].sync = $firebase($scope.types[i].ref).$asArray();
  }
})

.controller('TypeCtrl', function($scope, $stateParams) {
  $scope.pid = $stateParams['typeId'];
});
