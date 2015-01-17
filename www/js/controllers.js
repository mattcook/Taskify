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
    { title: 'Categorization', id: 1 },
    { title: 'Data Collection', id: 2 },
    { title: 'Image Moderation', id: 3 },
    { title: 'Sentiment', id: 4 },
    { title: 'Image tagging', id: 5 },
    { title: 'Transcription', id: 6 }
  ];
})

.controller('CategoryCtrl', function($scope, $stateParams) {
  $scope.pid = $stateParams['catId']
});
