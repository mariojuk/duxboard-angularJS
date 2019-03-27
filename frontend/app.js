var dependencies = [
    'angular-inview',
    'vkEmojiPicker',
    'ngTouch',
    'matchMedia',
    'ngSanitize',
    'ui.router',
    'ngFileUpload',
    'uiCropper',
    'ngDialog',
    'toastr',
    'sticky',
    'ngAnimate',
    'SmoothScrollbar',
    'ngQuill',
    '720kb.socialshare',
    'ngMask',
    'chart.js',
    'ui.bootstrap'
];

var sportApp = angular
    .module('sportApp', dependencies)
    .config(sportAppConfig)
    .run(sportAppRun);


sportAppConfig.$inject = ["$httpProvider", "$sceDelegateProvider", "toastrConfig", "ngDialogProvider", "ngQuillConfigProvider", "screenSizeConfigProvider"];
function sportAppConfig($httpProvider, $sceDelegateProvider, toastrConfig, ngDialogProvider, ngQuillConfigProvider, screenSizeConfigProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        '*://www.youtube.com/**'
    ]);

    ngDialogProvider.setDefaults({
        closeByNavigation: true,
        className: 'ngdialog-theme-plain'
    });

    ngQuillConfigProvider.set({
        modules: {
            toolbar: [
              [{ font: [] }],
              [{ color: [] }],
              [{ size: [] }],
              [{ align: [] }],
              [{ 'indent': '-1'}, { 'indent': '+1' }],
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'link'],
              ['clean']
            ]
        },
        theme: 'snow',
        formats: [
            'background', 'bold', 'color', 'font', 'code', 'italic',
            'link', 'size', 'strike', 'script', 'underline',
            'blockquote', 'header', 'indent', 'list', 'align',
            'direction', 'code-block', 'formula'
        ],
        bounds: document.body,
        readyOnly: false
    });

    screenSizeConfigProvider.set({
      rules: {
        mobile  : "only screen and (max-width: 767px)",
        tablet  : "only screen and (min-width: 768px) and (max-width: 1024px)",
        desktop : "only screen and (min-width: 1025px)"
      }
    });

    angular.extend(toastrConfig, {
    allowHtml: true,
    templates: {
      toast: 'toast.html',
      // neradi se extraData objektom?
      // preventOpenDuplicates: true,
      // preventDuplicates: true
    }
  });
}

sportAppRun.$inject = ["$rootScope", "$state", "AuthService", "$templateCache", "$http"];
function sportAppRun($rootScope, $state, AuthService, $templateCache, $http) {
    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
        if (!AuthService.isAuthenticated()) {
         if (next.name !== 'login' && next.name !== 'landing' && next.name !== 'register' && next.name !== 'forgotpassword'
			&& next.name!== 'changepassword' && next.name !== 'packages' && next.name !== 'paymentPlan' && next.name !== 'thankBox') {
              event.preventDefault();
              $state.go('login');

          }
        }else{
            if(next.name === 'landing' || next.name === 'login' || next.name === 'register'){
                event.preventDefault();
                $state.go('app.home');
            }
        }
    });

    $rootScope.$on('not-authenticated', function(){
      $state.go('login');
    });

    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params, {location: 'replace'})
      }
    });

    $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        $rootScope.$broadcast('set-menu-visibility', false);
        $rootScope.$broadcast('set-nav-visibility', false);
    });

    $http.get('popups/notify/notify.html').then(function(res){
        $templateCache.put('popups/notify/notify.html', res.data) 
    });

    $http.get('components/toast/toast.html').then(function(res){
        $templateCache.put('toast.html', res.data) 
    });

    $http.get('popups/usersPopup/usersPopup.html').then(function(res){
        $templateCache.put('popups/usersPopup/usersPopup.html', res.data) 
    });
};