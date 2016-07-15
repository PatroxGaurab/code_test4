(function () {

  angular.module('meanApp', ['ngRoute']);

  function config ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: '/auth/register/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/auth/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/profile', {
        templateUrl: '/profile/profile.view.html',
        controller: 'profileCtrl',
        controllerAs: 'vm'
      })
      .when('/login_external', {
        templateUrl: '/auth/login_external/login_external.view.html',
        controller: 'login_externalCtrl',
        controllerAs: 'vm'
      })
      .when('/api/login_external/callback', {
        templateUrl: '/auth/login_external/login_external.view.html',
        controller: 'login_externalCtrl',
        controllerAs: 'vm'
      })
      .when('/api/login_external', {
	templateUrl: '/auth/login_external/login_external.view.html',
        controller: 'login_externalCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  function run($rootScope, $location, authentication, $http) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
        $location.path('/');
      }
    });
   $rootScope.$on("$routeChangeSuccess", function (e, current) {
	a=current.params;
	url = Object.keys(a).map(function(k) {
	    return encodeURIComponent(k) + '=' + encodeURIComponent(a[k])
	}).join('&')
        $rootScope.query = url;
    });

  }
  
  angular
    .module('meanApp')
    .config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', 'authentication','$http', run]);

})();
