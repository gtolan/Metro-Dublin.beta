

var FirebaseSubscribe = {

    toggleSignIn: function () {
        // Disable the sign-in button during async sign-in tasks.
        document.getElementById('quickstart-sign-in').disabled = true;
        if (firebase.auth().currentUser) {
            // [START signout]
            firebase.auth().signOut().catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                FirebaseSubscribe.handleError(error);
                // [END_EXCLUDE]
            });
            // [END signout]
        } else {
            var email = document.getElementById('email').value;
            // Sending email with sign-in link.
            // [START authwithemail]
            var actionCodeSettings = {
                // URL you want to redirect back to. The domain (www.example.com) for this URL
                // must be whitelisted in the Firebase Console.
                'url': window.location.href + "/subscription-confirmation", // Here we redirect back to this same page.
                'handleCodeInApp': true // This must be true.
            };
            firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings).then(function() {
                // Save the email locally so you don’t need to ask the user for it again if they open
                // the link on the same device.
                window.localStorage.setItem('emailForSignIn', email);
                // The link was successfully sent. Inform the user.
                alert('An email was sent to ' + email + '. Please use the link in the email to confirm your sign-up.');
                // [START_EXCLUDE]
                // Re-enable the sign-in button.
                document.getElementById('quickstart-sign-in').disabled = true;
                // [END_EXCLUDE]
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                FirebaseSubscribe.handleError(error);
                // [END_EXCLUDE]
            });
            // [END authwithemail]
        }
    },

    handleDeleteUser:function (){
        var user = firebase.auth().currentUser;
        console.log(user, "current user")
        user.delete().then(function() {
            console.log('start del')
            window.alert('Your email address has been removed from our subscription list');
            document.getElementById('quickstart-sign-in').classList.remove('hidden');
            //document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            // [END_EXCLUDE]
            var del = document.getElementById('user-delete');
            del.classList.add('hidden');
            document.getElementById('subscribe-info').innerText = "Subscribe for more information";
        }).catch(function(error) {
            console.log('failed del')
            window.prompt('Delete error');
        });
    },

    handleError:function(error) {
        // Display Error.
        alert('Error: ' + error.message);
        console.log(error);
        // Re-enable the sign-in button.
        document.getElementById('quickstart-sign-in').disabled = false;
    },

    handleSignIn: function() {
        // [START handlesignin]
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
            // [START_EXCLUDE]
            // Disable the sign-in button during async sign-in tasks.
            document.getElementById('quickstart-sign-in').disabled = true;
            // [END_EXCLUDE]
            // You can also get the other parameters passed in the query string such as state=STATE.
            // Get the email if available.
            var email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                // User opened the link on a different device. To prevent session fixation attacks, ask the
                // user to provide the associated email again. For example:
                email = window.prompt('Please provide the email you have subscribed with to re-authenticate.');
            }
            if (email) {
                // The client SDK will parse the code from the link for you.
                firebase.auth().signInWithEmailLink(email, window.location.href).then(function(result) {
                    // Clear the URL to remove the sign-in link parameters.
                    if (history && history.replaceState) {
                        window.history.replaceState({}, document.title, window.location.href.split('?')[0]);
                    }
                    // Clear email from storage.
                    window.localStorage.removeItem('emailForSignIn');
                    // Signed-in user's information.
                    var user = result.user;
                    var isNewUser = result.additionalUserInfo.isNewUser;
                    console.log(result)
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // [START_EXCLUDE]
                    FirebaseSubscribe.handleError(error);
                    // [END_EXCLUDE]
                });
            }
        }
        // [END handlesignin]
    },


    initApp:function() {
        // Restore the previously used value of the email.
        var email = window.localStorage.getItem('emailForSignIn');
        document.getElementById('email').value = email;
        // Automatically signs the user-in using the link.
        FirebaseSubscribe.handleSignIn();
        // Listening for auth state changes.
        // [START authstatelistener]
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                // Update UI.
                // [START_EXCLUDE]
                //  document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
                document.getElementById('quickstart-sign-in').classList.add('hidden');
                document.getElementById('subscribe-info').innerText = "Thank you, you are subscribed!";
                //document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
                // [END_EXCLUDE]
                document.getElementById('email').value = email;
                var del = document.getElementById('user-delete');
                del.classList.remove('hidden');
                del.addEventListener('click', function(){
                    console.log('delete user..')
                    FirebaseSubscribe.handleDeleteUser()
                })




            } else {
                // User is signed out.
                // Update UI.
                // [START_EXCLUDE]
                //document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
                document.getElementById('quickstart-sign-in').textContent = 'Subscribe';
                document.getElementById('subscribe-info').innerText = "Subscribe for more information";
                //document.getElementById('quickstart-account-details').textContent = 'null';
                // [END_EXCLUDE]
            }
            // [START_EXCLUDE silent]
            document.getElementById('quickstart-sign-in').disabled = false;
            // [END_EXCLUDE]
        });
        // [END authstatelistener]
        document.getElementById('quickstart-sign-in').addEventListener('click', FirebaseSubscribe.toggleSignIn, false);
    }
}
// window.onload = initApp;
