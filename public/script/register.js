var db = firebase.firestore()

document.querySelector('.register-btn').onclick = function () {
    var email = document.querySelector('#register-email').value
    var password = document.querySelector('#register-password').value
    var confirmation = document.querySelector('#register-confirmation').value

    if (email && password && confirmation && password==confirmation) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in 
        user = userCredential.user;

        db.collection("users").doc(`${user.uid}`).set({
            email: user.email,
            account: "regular"
        })

        window.location.assign('index.html')
    })
    .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage)
    });
    }
}