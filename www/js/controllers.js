angular.module('starter.controllers', ['firebase'])

.controller('AppCtrl', ['currentAuth', function($scope, $timeout) {
  
  // Perform the login action when the user submits the login form
}])

.controller('TypesCtrl', ['$scope', '$firebase', function($scope, $firebase) {
  console.log("TYPESS")
  'use strict';
  var ref = new Firebase('https://mobile-turk.firebaseio.com/types');
  $scope.types = [
  { title: 'Image Categorization',
    id: 'image-categorization',
    tasks: 321,
    ref: ref.child('categorization'),
    icon: 'icon ion-ios7-filing-outline'},
  { title: 'Information Search',
    id: 'info-search',
    tasks: 119,
    ref: ref.child('info'),
    icon: 'icon ion-ios7-search'},
  { title: 'Image Filtering',
    id: 'image-filter',
    tasks: 13,
    ref: ref.child('filtering'),
    icon: 'icon ion-ios7-settings'},
  { title: 'Emotion Rating',
    id: 'emotion-sentiment',
    tasks: 4,
    ref: ref.child('emotion'),
    icon: 'icon ion-ios7-star-outline'},
  { title: 'Image Tagging',
    id: 'tagging',
    tasks: 62,
    ref: ref.child('tagging'),
    icon: 'icon ion-ios7-pricetag-outline'},
  { title: 'Transcription',
    id: 'transcription',
    tasks: 193,
    ref: ref.child('transcription'),
    icon: 'icon ion-ios7-compose-outline'}
  ];

  for(var i=0; i<$scope.types.length; i++) {
    $scope.types[i].sync = $firebase($scope.types[i].ref).$asArray();
  }
}])

.controller('LoginCtrl', ['currentAuth', 'Auth', '$scope', '$state', function(authStatus,  Auth, $scope, $state) {
  var loginRedirect = function () {
    $state.go('app.types');
  };

  if (typeof authStatus !== undefined && authStatus !== null) {
    console.log(authStatus);
    loginRedirect();
    return;
  }

  $scope.loginData = {};
  $scope.doLogin = function() {
    Auth.$authWithPassword($scope.loginData).then(function(authData) {
      console.log("Logged in as:", authData.uid);
      loginRedirect();
    }).catch(function(error) {
      alert(error.message);
    });
  }
}])

.controller('CategorizationCtrl', ['currentAuth', function($scope, $stateParams, $ionicModal, $firebase) {
  'use strict';

  $scope.modal_text = "Select the category that most appropriately suits the image. If you cannot determine a suitable category, you may skip this task."
  popupModal($scope, $ionicModal);

  var ref = new Firebase('https://mobile-turk.firebaseio.com/types/categorization');

  $scope.categorization = $firebase(ref).$asArray();

}])

.controller('InfoSearchCtrl', function($scope, $stateParams, $ionicModal) {
  $scope.modal_text = "Using the information provided, please complete the missing field. If you cannot determine an answer, you may skip this task."
  popupModal($scope, $ionicModal);
  $scope.openGoogle = function($scope){
  window.open('http://google.com', '_blank', 'location=yes');
  };
})

.controller('FilterCtrl', function($scope, $stateParams, $ionicModal) {
  $scope.modal_text = "Select the category that most appropriately suits the image. If you cannot determine a suitable category, you may skip this task."
  popupModal($scope, $ionicModal);
})

.controller('EmotionCtrl', function($scope, $stateParams, $ionicModal) {
  $scope.modal_text = "Pick the best sentiment based on the provided. Ranges from Strongly Negative, Negative, Neutral, Positive, and Strongly Positive from left to right."
  popupModal($scope, $ionicModal);
})

.controller('TaggingCtrl', function($scope, $stateParams, $ionicModal) {
  $scope.modal_text = "Pick the best sentiment based on the provided. Ranges from Strongly Negative, Negative, Neutral, Positive, and Strongly Positive from left to right."
  popupModal($scope, $ionicModal);
});

var popupModal = function($scope, $ionicModal){
  $ionicModal.fromTemplateUrl('templates/help-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  })
};
