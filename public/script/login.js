document.querySelector('.login-btn').onclick = function() {
    var email = document.querySelector('#login-email').value
    var password = document.querySelector('#login-password').value
    if (email && password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log('siginin')
                window.location.assign('index.html')

                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }
}