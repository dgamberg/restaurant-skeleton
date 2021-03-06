myApp.factory('Authentication',
    ['$rootScope', '$firebaseAuth', '$firebaseObject', 'FIREBASE_URL', '$location',
    function( $rootScope, $firebaseAuth,  $firebaseObject, FIREBASE_URL, $location ) {
        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(ref);

        //detect authentication
        auth.$onAuth(function (authUser) {
            if (authUser) {
                var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
                var userObj = $firebaseObject(userRef);
                $rootScope.currentUser = userObj;
            }
            else {
                $rootScope.currentUser = '';
            }
        });

        var authObject = {
            login: function (user) {
                auth.$authWithPassword({
                    email: user.email,
                    password: user.password
                }).then(function (regUser) {
                    $location.path('/success');
                }).catch(function (error) {
                    $rootScope.message = error.message;
                });
            },
            logout: function () {
                return auth.$unauth();
            },
            requireAuth: function () {
                return auth.$requireAuth();
            },
            register: function (user) {
                auth.$createUser({
                    email: user.email,
                    password: user.password
                }).then(function (regUser) {
                    var regRef = new Firebase(FIREBASE_URL + 'users')
                        //add child path to URL
                        .child(regUser.uid)
                        .set({
                            date: Firebase.ServerValue.TIMESTAMP,
                            regUser: regUser.uid,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                        });//user info
                    authObject.login(user);
                }).catch(function (error) {
                    $rootScope.message = error.message;
                }); //createUser
            }
        };
        return authObject;
    }]); // Factory

