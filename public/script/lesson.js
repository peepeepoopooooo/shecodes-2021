var db = firebase.firestore()
var user
firebase.auth().onAuthStateChanged(function (u) {
    user = u
})

db.collection("lessons").orderBy("timestamp", "asc").onSnapshot(querySnapshot => {
    querySnapshot.forEach(doc => {
        console.log(doc.data())
    })
})