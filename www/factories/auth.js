angular.module('starter.services', ['firebase'])
.factory('Auth', ['$firebaseAuth', function($firebaseAuth) {
  console.log('auth factory');
  var ref = new Firebase('https://mobile-turk.firebaseio.com/');
  return $firebaseAuth(ref);
}]);
