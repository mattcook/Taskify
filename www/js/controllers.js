angular.module('starter.controllers', ['firebase'])

.controller('AppCtrl', function($scope, $timeout) {
  // Perform the login action when the user submits the login form
})

.controller('CardsCtrl', function($scope,$stateParams, $ionicModal, TDCardDelegate) {
  var cardTypes = [
    { image: 'https://pbs.twimg.com/profile_images/546942133496995840/k7JAxvgq.jpeg' },
    { image: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png' },
    { image: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg' },
    ];

  $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }
})

.controller('CardCtrl', function($scope, TDCardDelegate) {
  $scope.cardSwipedLeft = function(index) {
    $scope.addCard();
  };
  $scope.cardSwipedRight = function(index) {
    $scope.addCard();
  };
})

.controller('TypesCtrl',
            ['currentAuth', '$state', '$scope', '$firebase',
             function(auth, $state, $scope, $firebase) {
  'use strict';
  verifyAuth(auth, $scope, $state);

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

.controller('LoginCtrl',
            ['currentAuth', 'Auth', '$scope', '$state',
              function(authStatus,  Auth, $scope, $state) {
  var loginRedirect = function (authData) {
    $scope.user = authData;
    window.$scope = $scope;
    $state.go('app.types');
  };

  if (typeof authStatus !== undefined && authStatus !== null) {
    loginRedirect();
    return;
  }

  $scope.loginData = {};
  $scope.doLogin = function() {
    Auth.$authWithPassword($scope.loginData).then(function(authData) {
      loginRedirect(authData);
    }).catch(function(error) {
      alert(error.message);
    });
  }
}])

.controller('CategorizationCtrl',
            ['currentAuth', '$scope', '$state', '$stateParams', '$ionicModal', '$firebase',
              function(auth, $scope, $state, $stateParams, $ionicModal, $firebase) {
  'use strict';
  verifyAuth(auth, $scope, $state);

  $scope.modal_text = "Select the category that most appropriately suits the image. If you cannot determine a suitable category, you may skip this task."

  var ref = new Firebase('https://mobile-turk.firebaseio.com/types/categorization');
  var q = ref.orderByChild('createdAt').limitToFirst(1);

  $scope.categorization = $firebase(q).$asObject();
  $scope.categorization.$loaded()
  .then(function(data) {
    var key = null
    for (var i in data) {
      if (i[0] !== '$' && i !== 'forEach') {
        key = i;
        break;
      }
    }
    $scope.categorization.val = $scope.categorization[key];
    popupModal($scope, $ionicModal);
  });
}])

.controller('InfoSearchCtrl', function($scope, $stateParams, $ionicModal) {
  $scope.modal_text = "Using the information provided, please complete the missing field. If you cannot determine an answer, you may skip this task."
  popupModal($scope, $ionicModal);
  $scope.openGoogle = function($scope){
  window.open('http://google.com', '_blank', 'location=yes');
  };
})

.controller('EmotionCtrl', function($scope, $stateParams, $ionicModal) {
  $scope.modal_text = "Pick the best sentiment based on the provided. Ranges from Strongly Negative, Negative, Neutral, Positive, and Strongly Positive from left to right."
  popupModal($scope, $ionicModal);
})

.controller('TaggingCtrl', function($scope, $stateParams, $ionicModal) {
  $scope.modal_text = "Pick the best sentiment based on the provided. Ranges from Strongly Negative, Negative, Neutral, Positive, and Strongly Positive from left to right."
  popupModal($scope, $ionicModal);
})

.controller('TranscribeCtrl', function($scope, $stateParams, $ionicModal) {
  $scope.modal_text = "Pick the best sentiment based on the provided. Ranges from Strongly Negative, Negative, Neutral, Positive, and Strongly Positive from left to right."
  popupModal($scope, $ionicModal);
});

var verifyAuth = function(auth, $scope, $state) {
  if (typeof auth !== undefined && auth !== null) {
    $scope.user = auth;
    window.$scope = $scope;
    ref = new Firebase('https://mobile-turk.firebaseio.com/');
    ref.child('users').child($scope.user.uid).update({
      lastLogin: Date.now(),
      email: $scope.user.password.email
    });
    ref.onAuth(function(auth) {
      if (auth === null) {
        $state.user = null;
        $state.go('login');
      }
    });

    return auth;
  } else {
    $state.go('login');
    return false;
  }
}

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
