// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCdTcy_i1iFhR_780UjjFtxusoCHWaip8U",
    authDomain: "holasoygokufrases.firebaseapp.com",
    databaseURL: "https://holasoygokufrases.firebaseio.com",
    projectId: "holasoygokufrases",
    storageBucket: "holasoygokufrases.appspot.com",
    messagingSenderId: "720092220680",
    appId: "1:720092220680:web:b7e14a3c4d702a9df8b0bd",
    measurementId: "G-8RXEH1H8WT",
};

// Signs-in .
function signIn() {
    // Sign into Firebase using popup auth & Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result=>{
        console.log('valar morghulis / login', result.user.email)
        usuario = result
        console.log(usuario)
    }).catch(error=> console.log(error.message, error.code ))
    }

// Signs-out.
function signOut() {
    // Sign out of Firebase.
    firebase.auth().signOut().then(function(){
        console.log('valar doharis / logout')
    }).catch(function(err){
        console.log(err, "not today")
    })
}

// Triggers when the auth state change
function initFirebaseAuth(){
    firebase.auth().onAuthStateChanged(user=>{
        if (document.title == 'Hola soy Goku! - Nuevo Personaje') {
            if (user ) {
                usuario = {"user": user}
                name.innerHTML = 'Hola '+usuario.user.displayName+"!";
                signInButtonElement.style.display = 'none'
                signOutButtonElement.style.display = 'block'
            }else{
                name.innerHTML = ''
                signInButtonElement.style.display = 'block'
                signOutButtonElement.style.display = 'none'
            }
        }
        })
    }

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert(
            "You have not configured and imported the Firebase SDK. " +
                "Make sure you go through the codelab setup instructions and make " +
                "sure you are running the codelab using `firebase serve`"
        );
    }
}


let signInButtonElement = document.getElementById("login");
let signOutButtonElement = document.getElementById("logout");
let usuario = {}
let name = document.getElementById('name')

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
initFirebaseAuth()
// Checks that Firebase has been imported.
checkSetup();
