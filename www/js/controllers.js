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
  var uid = verifyAuth(auth, $scope, $state);
  var ref = new Firebase('https://mobile-turk.firebaseio.com/types');

  var earnedRef = ref.parent().child('/users/' + uid + '/totalEarned');
  $scope.user.totalEarned = $firebase(earnedRef).$asObject();

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

    var typeKey = $scope.types[i].ref.key();
    var completedLocation = 'users/' + uid + '/tasks/' + typeKey + '/completed';
    var userRef = ref.parent().child(completedLocation);
    $scope.types[i].completed = $firebase(userRef).$asArray();

    var moneyLocation = 'users/' + uid + '/tasks/' + typeKey + '/earned';
    var moneyRef = ref.parent().child(moneyLocation);

    $scope.types[i].earned = $firebase(moneyRef).$asObject();
  }
}])

.controller('LoginCtrl',
            ['currentAuth', 'Auth', '$scope', '$state',
              function(authStatus,  Auth, $scope, $state) {
  var loginRedirect = function (authData) {
    $scope.user = authData;
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
  var uid = verifyAuth(auth, $scope, $state);
  var ref = new Firebase('https://mobile-turk.firebaseio.com/types/categorization');
  var catRef = null;

  if (uid) {
    var userRef = new Firebase('https://mobile-turk.firebaseio.com/users/' + uid);
    var userLast = userRef.child('tasks/categorization/last');
    $scope.formData = {};

    $scope.submitCat = function() {
      var data = {};
      data[uid] = $scope.formData.category;
      catRef.child('responses').update(data);

      catRef.once('value', function(snap) {
        userLast.transaction(function(current) {
          current = current ? current : 0;
          return current < snap.val().createdAt ? snap.val().createdAt : current;
        });

        userRef.child('tasks/categorization/earned').transaction(function(current) {
          current = current ? current : 0;
          return current += snap.val().price;
        });

        userRef.child('tasks/categorization/completed').push(catRef.key());

        userRef.child('totalEarned').transaction(function(current) {
          current = current ? current : 0;
          return current += snap.val().price;
        })
      });
    };

    // Get User Data to find last task completed/skipped
    userLast.on('value', function(snap) {
      var lastTime = snap.val() ? snap.val() : 0;
      var q = ref.orderByChild('createdAt').startAt(lastTime+1).limitToFirst(1);
      $scope.categorization = $firebase(q).$asObject();

      // Load the last task from firebase
      $scope.categorization.$loaded()
      .then(function(data) {
        var key = null
        for (var i in data) {
          if (i[0] !== '$' && i !== 'forEach') {
            key = i;
            break;
          }
        }
        // Make the value returned accesible
        $scope.categorization.val = $scope.categorization[key];
        catRef = ref.child(key);
        $scope.helpModalText = $scope.categorization.val.description;
        popupModal($scope, $ionicModal);
      });
    });
  };
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
    return auth.uid;
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
