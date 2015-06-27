/* global angular */
angular.module('am9', ['satellizer'])
  .config(function ($authProvider) {
    $authProvider.facebook({
      clientId: '966482230069701'
    })

  })
  .controller('TestCtrl', function ($scope, $auth) {
    $scope.authenticate = function (provider) {
      $auth.authenticate(provider).then(function () {
        $scope.refresh()
      })
    }
    $scope.logout = function () {
      $auth.logout()
      $scope.refresh()
    }

    $scope.refresh = function () {
      $scope.status = $auth.isAuthenticated() ? 'logged' : 'not'
    }
    $scope.refresh()
  })
