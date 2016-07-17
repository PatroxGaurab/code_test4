(function() {

  angular
    .module('meanApp')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'authentication'];
  function meanData ($http, authentication) {

    var getProfile = function (routeParams) {
      return $http.get('/api/profile?sso='+routeParams.sso+'&sig='+routeParams.sig, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };
    var googleCallback = function (routeParams) {
      return $http.get('/api/auth/google?code='+routeParams.code
      );
    };
    return {
      getProfile : getProfile,
      googleCallback : googleCallback
    };
  }

})();
