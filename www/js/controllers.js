angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Perform the login action when the user submits the login form

})

.controller('CategoriesCtrl', function($scope) {
  $scope.categories = [
      { title: 'Image Categorization', id: 'image-categorization' , tasks: 321, icon: 'icon ion-ios7-filing-outline'},
      { title: 'Information Search', id: 'info-search', tasks: 119, icon: 'icon ion-ios7-search'},
      { title: 'Image Filtering', id: 'filtering', tasks: 13, icon: 'icon ion-ios7-settings'},
      { title: 'Emotion Rating', id: 'emotion-rating', tasks: 78, icon: 'icon ion-ios7-star-outline'},
      { title: 'Image Tagging', id: 'image-tagging', tasks: 62, icon: 'icon ion-ios7-pricetag-outline'},
      { title: 'Transcription', id: 'transcription', tasks: 193, icon: 'icon ion-ios7-compose-outline'}
      ];
})

.controller('LoginCtrl', function($scope, $location, $stateParams) {
  $scope.doLogin = function() {
    $location.path("app/categories")
  }
})

.controller('CategorizationCtrl', function($scope, $stateParams) {
  $scope.pid = 1
})

.controller('InfoSearchCtrl', function($scope, $stateParams) {
  $scope.pid = 2
});
