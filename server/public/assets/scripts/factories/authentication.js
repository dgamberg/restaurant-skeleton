myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', 'FIREBASE_URL', '$location',
    function( $rootScope, $firebaseAuth, FIREBASE_URL, $location){

        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(ref);

        return {
            login: function(user){
                auth.$authWithPassword({
                   email: user.email,
                   password: user.password
                }).then(function(regUser){
                    $location.path('/success');
                }).catch(function(error){
                    $rootScope.message = error.message;
                });
            },
            register: function(user){
                auth.$createUser({
                    email: user.email,
                    password: user.password
                }).then(function(regUser){
                    var regRef = new Firebase(FIREBASE_URL + 'users')
                        //add child path to URL
                        .child(regUser.uid)
                        .set({
                            date: Firebase.ServerValue.TIMESTAMP ,
                            regUser: regUser.uid,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                        });//user info

                    $rootScope.message = "Hi " + user.firstName + ", Thanks for registering.";
                }).catch(function(error){
                    $rootScope.message = error.message;
                }); //createUser
            }
        };
    }]); // Factory

