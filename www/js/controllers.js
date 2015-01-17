angular.module('starter.controllers', [])

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

.controller('CategoriesCtrl', function($scope) {
  $scope.categories = [
  { title: 'Image Categorization', id: 1 , tasks: 321, icon: 'icon ion-ios7-filing-outline'},
  { title: 'Information Search', id: 2, tasks: 119, icon: 'icon ion-ios7-search'},
  { title: 'Image Filtering', id: 3, tasks: 13, icon: 'icon ion-ios7-settings'},
  { title: 'Emotion Rating', id: 4, tasks: 78, icon: 'icon ion-ios7-star-outline'},
  { title: 'Image Tagging', id: 5, tasks: 62, icon: 'icon ion-ios7-pricetag-outline'},
  { title: 'Transcription', id: 6, tasks: 193, icon: 'icon ion-ios7-compose-outline'}
  ];
})

.controller('CategoryCtrl', function($scope, $stateParams) {
  $scope.pid = $stateParams['catId']
});
