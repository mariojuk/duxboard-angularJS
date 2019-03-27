sportApp.config(["$stateProvider", "$urlRouterProvider", "$locationProvider",
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/home');
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('login', {
            url: '/login',
                views: {
                    'main': {
                        templateUrl: 'pages/login/login.html',
                        controller: 'loginController'
                    },
                    'header': {}
                }
            })
            .state('landing', {
                url: '/',
                views: {
                    'main': {
                        templateUrl: 'pages/landing/landing.html',
                        controller: 'landingPageController'
                    },
                    'header': {}
                }
            })
            .state('register', {
                url: '/register',
                views: {
                    'main': {
                        templateUrl: 'pages/register/register.html',
                        controller: 'registerController'
                    },
                    'header': {}
                }
            })
            .state('changepassword', {
                url: '/changepassword/:token',
                views: {
                    'main': {
                        templateUrl: 'pages/changepassword/changepassword.html',
                        controller: 'changepasswordController'
                    },
                    'header': {}
                }
            })
            .state('forgotpassword', {
                url: '/forgotpassword',
                views: {
                    'main': {
                        templateUrl: 'pages/forgotpassword/forgotpassword.html',
                        controller: 'forgotpasswordController'
                    },
                    'header': {}
                }
            })
            .state('packages', {
                url: '/packages/:id',
                views: {
                    'main' : {
                        templateUrl: 'pages/packages/packages.html',
                        controller: 'packagesController'
                    },
                    'header': {}
                }
            })
            .state('paymentPlan', {
                url: '/paymentPlan',
                views:{
                    'main': {
                        templateUrl: 'pages/packages/paymentPlan/paymentPlan.html',
                        controller: 'paymentPlanController'
                    },
                    'header': {}
                }  
            })
            .state('thankBox', {
                url: '/thankBox/:email',
                views:{
                    'main': {
                        templateUrl: 'pages/packages/thankBox/thankBox.html',
                        controller: 'thankBoxController'
                    },
                    'header': {}
                }  
            })
            .state('app', {
                url: '',
                redirectTo: 'app.home',
                views: {
                    'header': {
                        templateUrl: 'components/header/header.html',
                        controller: 'headerController'
                    },
                    'main': {
                        controller: 'mainController'
                    },
                    'sidebar@app': {
                        templateUrl: 'components/leftSideBar/leftSideBar.html',
                        controller: 'leftSideBarController'
                    }
                }
            })
            .state('app.home', {
                url: '^/home',
                views: {
                    'content@app': {
                        templateUrl: 'pages/home/home.html',
                        controller: 'homeController'
                    }
                }
            })
            .state('app.profile', {
                url: '^/profile/:id',
                redirectTo: 'app.profile.statements',
                views: {
                    'content@app': {
                        templateUrl: 'pages/profile/profile.html',
                        controller: 'profileController'
                    }
                }
            })
            .state('app.profile.statements', {
                url: '^/profile/:id/statements',
                views: {
                    'profileContent@app.profile': {
                        templateUrl: 'pages/profile/subpages/statements/statements.html',
                        controller: 'profileStatementsController'
                    }
                }
            })
            .state('app.profile.about', {
                url: '^/profile/:id/about',
                views: {
                    'profileContent@app.profile': {
                        templateUrl: 'pages/profile/subpages/about/about.html',
                        controller: 'profileAboutController'
                    }
                }
            })
            .state('app.profile.articles', {
                url: '^/profile/:id/articles',
                views: {
                    'profileContent@app.profile': {
                        templateUrl: 'pages/profile/subpages/articles/articles.html',
                        controller: 'profileArticlesController'
                    }
                }
            })
            .state('app.profile.articles.newarticle', {
                url: '^/profile/:id/newarticle',
                views: {
                    'profileContent@app.profile': {
                        templateUrl: 'pages/profile/subpages/newArticle/newArticle.html',
                        controller: 'newArticleController'
                    }
                }
            })
            .state('app.article', {
                url: '^/:id/article/:aid',
                redirectTo: 'app.profile.articles.article'
            })
            .state('app.profile.articles.article', {
                url: '^/profile/:id/article/:aid',
                views: {
                    'profileContent@app.profile': {
                        templateUrl: 'pages/profile/subpages/singlearticle/singlearticle.html',
                        controller: 'profileSingleArticleController'
                    }
                }
            })
            .state('app.profile.partners', {
                url: '^/profile/:id/partners',
                views: {
                    'profileContent@app.profile': {
                        templateUrl: 'pages/profile/subpages/partners/partners.html',
                        controller: 'profilePartnersController'
                    }
                }
            })
            .state('app.profile.photos', {
                url: '^/profile/:id/photos',
                views: {
                    'profileContent@app.profile': {
                        templateUrl: 'pages/profile/subpages/photos/photos.html',
                        controller: 'profilePhotosController'
                    }
                }
            })
            .state('app.status', {
                url: '^/status/:id',
                views: {
                    'content@app': {
                        templateUrl: 'pages/status/status.html',
                        controller: 'statusController'
                    }
                }
            })
            .state('app.search', {
                url: '^/search?user',
                views: {
                    'content@app': {
                        templateUrl: 'pages/search/search.html',
                        controller: 'searchController'
                    }
                }
            })
            .state('app.settings', {
                url: '^/settings',
                views: {
                    'content@app': {
                        templateUrl: 'pages/settings/settings.html',
                        controller: 'settingsController'
                    }
                }
            })
           .state('app.admin', {
                 url: '^/admin',
                 views: {
                    'content@app': {
                         templateUrl: 'pages/admin/admin.html',
                         controller: 'adminController'
                     }
                 }
            })
           .state('app.admin.preorders', {
                url: '^/admin/preorders',
                views: {
                    'adminPanel@app.admin': {
                        templateUrl: 'pages/admin/preorders/preorders.html',
                        controller: 'adminPreordersController'
                    }
                }
            })
            .state('app.admin.webinars', {
                url: '^/admin/webinars',
                views: {
                    'adminPanel@app.admin': {
                        templateUrl: 'pages/admin/webinars/webinars.html',
                        controller: 'adminWebinarsController'
                    }
                }
            })
            .state('app.admin.presenters', {
                url: '^/admin/presenters',
                views: {
                    'adminPanel@app.admin': {
                        templateUrl: 'pages/admin/presenters/presenters.html',
                        controller: 'adminPresentersController'
                    }
                }
            })
            .state('app.changeEmail', {
                url: '^/changeEmail/',
                views: {
                    'content@app': {
                        templateUrl: 'pages/settings/subpages/changeEmail/changeEmailSettings.html',
                        controller: 'changeEmailSettingsController'
                    },

                }
            })
            .state('app.changeEmailToken', {
                url: '^/changeEmail/:token',
                views: {
                    'content@app': {
                        templateUrl: 'pages/settings/subpages/changeEmail/changeEmailSettings.html',
                        controller: 'changeEmailSettingsController'
                    },

                }
            })
            .state('app.changePassword', {
                url: '^/settings/changepassword/',
                views: {
                    'content@app': {
                        templateUrl: 'pages/settings/subpages/changePassword/changePasswordSettings.html',
                        controller: 'changePasswordSettingsController'
                    }
                }
            })
            .state('app.changePasswordToken', {
                url: '^/settings/changepassword/:token',
                views: {
                    'content@app': {
                        templateUrl: 'pages/settings/subpages/changePassword/changePasswordSettings.html',
                        controller: 'changePasswordSettingsController'
                    }
                }
            })

            .state('app.blockedUsers', {
                url: '^/settings/blockedUsers/',
                views: {
                    'content@app': {
                        templateUrl: 'pages/settings/subpages/blockedUsers/blockedUsers.html',
                        controller: 'blockedUsersController'
                    }
                }
            })
            .state('app.terminateAccount', {
                url: '^/settings/terminateAccount/',
                views: {
                    'content@app': {
                        templateUrl: 'pages/settings/subpages/terminateAccount/terminateAccount.html',
                        controller: 'terminateAccountController'
                    }
                }
            })
            .state('app.terminateAccountToken', {
                url: '^/settings/terminateAccount/:token',
                views: {
                    'content@app': {
                        templateUrl: 'pages/settings/subpages/terminateAccount/terminateAccount.html',
                        controller: 'terminateAccountController'
                    }
                }
            })
            .state('app.requests', {
                url: '^/requests',
                views: {
                    'content@app': {
                        templateUrl: 'pages/requests/requests.html',
                        controller: 'requestsController'
                    }
                }
            })
            .state('app.analysis', {
                url: '^/analysis',
                views: {
                    'content@app': {
                        templateUrl: 'pages/analysis/analysis.html',
                        controller: 'analysisController'
                    }
                }
            })
            .state('app.notifications', {
                url: '^/notifications',
                views: {
                    'content@app': {
                        templateUrl: 'pages/notifications/notifications.html',
                        controller: 'notificationsController'
                    }
                }
            })
            .state('app.webinars', {
                url: '^/webinars',
                views: {
                    'content@app': {
                        templateUrl: 'pages/webinars/webinars.html',
                        controller: 'webinarsController'
                    }
                }
            })
        .state('app.freeagent', {
            url: '^/freeagent',
            views: {
                'content@app': {
                    templateUrl: 'pages/freeagent/freeAgent.html',
                    controller: 'freeAgentController'
                }
            }
        })
            .state('app.elearning', {
                url: '^/elearning',
                views: {
                    'content@app': {
                        templateUrl: 'pages/elearning/elearning.html',
                        controller: 'elearningController'
                    }
                }
            })
            .state('app.elearning.courses', {
                url: '^/elearning/courses',
                views: {
                    'content@app': {
                        templateUrl: 'pages/elearning/courses/courses.html',
                        controller: 'elearningCoursesController'
                    }
                }
            })
            .state('app.elearning.course', {
                url: '^/elearning/course',
                views: {
                    'content@app': {
                        templateUrl: 'pages/elearning/course/course.html',
                        controller: 'elearningCourseController'
                    }
                }
            })
            .state('app.consulting', {
                url: '^/consulting',
                views: {
                    'content@app': {
                        templateUrl: 'pages/consulting/consulting.html',
                        controller: 'consultingController'
                    }
                }
            })
            .state('app.messages', {
                url: '^/messages/:id',
                views: {
                    'content@app': {
                        templateUrl: 'pages/messages/messages.html',
                        controller: 'messagesController'
                    }
                }
            });
    }]);
