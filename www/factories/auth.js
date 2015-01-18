angular.module('starter.services', ['firebase'])
.factory('Auth', ['$firebaseAuth', function($firebaseAuth) {
  var ref = new Firebase('https://mobile-turk.firebaseio.com/');
  return $firebaseAuth(ref);
}]);
