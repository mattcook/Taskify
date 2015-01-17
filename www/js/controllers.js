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
    { title: 'Image Categorization', id: 1 },
    { title: 'Information Search', id: 2 },
    { title: 'Image Filtering', id: 3 },
    { title: 'Emotion Rating', id: 4 },
    { title: 'Image Tagging', id: 5 },
    { title: 'Transcription', id: 6 }
  ];
})

.controller('CategoryCtrl', function($scope, $stateParams) {
  $scope.pid = $stateParams['catId']
});
