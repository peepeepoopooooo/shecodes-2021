var user

firebase.auth().onAuthStateChanged(function(u) {
    var login = document.querySelector('#login-nav')
    var register = document.querySelector('#register-nav')
    var logout = document.querySelector('#logout-nav')

    if (u) {
        user = u
        logout.style.display = 'block'
        login.style.display = 'none'
        register.style.display = 'none'
    } else {
        user = u
        logout.style.display = 'none'
        login.style.display = 'block'
        register.style.display = 'block'
    }
    console.log(u)
})

db.collection("users").onSnapshot(querySnapshot => {
    querySnapshot.forEach(doc => {
        console.log(doc.data())
        data = doc.data()
        var manage = document.querySelector('#manage')
        if (user && user.email==data.email && data.account=='admin') {
            manage.style.display = 'block'
        } else {
            manage.style.display = 'none'
        }
    })
})


document.querySelector('#logout-nav').onclick = function() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.assign("index.html")
      }).catch((error) => {
        // An error happened.
      });
}
