const session = Math.random().toString(36).substring(7);
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB9uDBL1ClI9S5ztN94TJNeuC673-rJV3Y",
    authDomain: "roomplayer-972fe.firebaseapp.com",
    databaseURL: "https://roomplayer-972fe-default-rtdb.firebaseio.com",
    projectId: "roomplayer-972fe",
    storageBucket: "roomplayer-972fe.appspot.com",
    messagingSenderId: "552556840407",
    appId: "1:552556840407:web:03c9bacce347b95eb9f792"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.database();
localStorage.setItem('db',db);
function getInputVal(id) {
    return document.getElementById(id).value;
}

document.getElementById("create").addEventListener("submit", createSession);
document.getElementById("join").addEventListener("submit", joinSession);

//Creating Session in db
function createSession(e) {
    e.preventDefault();

    var url = getInputVal("url");
    var id = url.slice(32)

    localStorage.setItem("videoId", id);

//Random sessionID getting created  ---  now i need it fixed because when referring to the session in database i will get current time of the  video being played and apply it here
    // var session = Math.random().toString(36).substring(7);
    localStorage.setItem("sessionId", session);
    console.log(session);
    
    db.ref("sessions" + "/" + session).set({
        id: id,
    });
    window.location.href = "./host/player.html";
}

//this is helping to join the session
async function joinSession(e) {
    e.preventDefault();

    var sessionId = getInputVal("sessionId");

    await db.ref("sessions/" + sessionId).on('value', (data) => {
        var id = data.val().id
        console.log(id);
        localStorage.setItem("videoId", id);
    });
    window.location.href = "./child/player.html";
}