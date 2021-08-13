var db = firebase.firestore()
var user
firebase.auth().onAuthStateChanged(function (u) {
    user = u
})
db.collection("users").onSnapshot(querySnapshot => {
    querySnapshot.forEach(doc => {
        data = doc.data()
        var manage = document.querySelector('#manage-container')
        if (user && user.email == data.email && data.account == 'admin') {
            manage.style.display = 'block'
        } else {
            manage.style.display = 'none'
        }
    })
})
document.querySelector('#add-lesson').onclick = function () {
    var name = document.querySelector('#add-name')
    var content = document.querySelector('#add-content')
    var correctAnswer = document.querySelector('#correct-answer')
    var answers = document.querySelectorAll('.add-answers')
    var counter = 0
    var answers_object = {}
    answers.forEach(answer => {
        answers_object[counter] = answer.value
        counter ++
    })

    console.log(answers_object)
    if (name.value && content.value) {
        db.collection("lessons").doc().set({
            name: name.value,
            content: content.value,
            correctAnswer: correctAnswer.value,
            answers: firebase.firestore.FieldValue.arrayUnion(answers_object),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            window.location.assign("lesson.html")
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    } else {
        alert("At least one field is empty!")
    }

}