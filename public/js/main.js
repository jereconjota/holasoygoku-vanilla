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
        if (user) {
            usuario = {"user": user}
            name.innerHTML = 'Hola '+usuario.user.displayName+"!";
            signInButtonElement.style.display = 'none'
            signOutButtonElement.style.display = 'block'
        }else{
            name.innerHTML = ''
            signInButtonElement.style.display = 'block'
            signOutButtonElement.style.display = 'none'
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

// Saves a new message on the Firebase DB.
function saveCharacter2() {
    // Add a new message entry to the database.
    return firebase.firestore().collection("Characters")
        .add({
            name: getCharactererName(),
            sentence: getCharacterSentence(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(function(messageRef){
            console.log(messageRef)
        })
        .catch(function (error) {
            console.error("Error writing new message to database", error);
        });
}

// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.
function saveCharacter() {
    // 1 - We add a message with a loading icon that will get updated with the shared image.
    console.log('2')
    firebase.firestore().collection("Characters")
        .add({
            name: getCharactererName(),
            sentence: getCharacterSentence(),
            imageUrl: '',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function (messageRef) {
            // 2 - Upload the image to Cloud Storage.
            var filePath = 'Characters Images' + "/" + 'user:'+firebase.auth().currentUser.uid + "/" + messageRef.id + '-' + imgCharacter.name
            console.log('2.1')
            return firebase.storage().ref(filePath).put(imgCharacter)
                .then(function (fileSnapshot) {
                    // 3 - Generate a public URL for the file.
                    console.log('2.2')
                    return fileSnapshot.ref.getDownloadURL().then((url) => {
                        // 4 - Update the chat message placeholder with the image's URL.
                        console.log('2.3')
                        document.getElementById('loading').style.display = 'none';
                        document.getElementById('avisoGuardastePersonaje').style.display = 'block';
                        setTimeout(function(){document.getElementById('avisoGuardastePersonaje').style.display = 'none'}, 8000);

                        return messageRef.update({
                            imageUrl: url,
                            storageUri: fileSnapshot.metadata.fullPath,
                        });
                    });
                });
        })
        .catch(function (error) {
            console.error("There was an error uploading a file to Cloud Storage:", error);
        });
}

// Triggered when a file is selected via the media picker.
function onMediaFileSelected(event) {
    event.preventDefault();
    imgCharacter = event.target.files[0];

    // // Clear the selection in the file picker input.
    // imageFormElement.reset();
    
    let imgPersonaje = document.getElementById('imagenPersonaje')
    // Check if the file is an image.
    if (!imgCharacter.type.match("image.*")) {
        imgPersonaje.value = ''
        avisoSoloImagenes.style.display = 'block';
        setTimeout(function(){document.getElementById('avisoSoloImagenes').style.display = 'none'}, 4000);
        return;
    }
    toggleButton()
}

function toggleButton() {
    if (nombrePersonaje.value && frasePersonaje.value && imagenPersonaje.value) {
        btnGuardarPersonaje.removeAttribute("disabled");
    } else {
        btnGuardarPersonaje.setAttribute("disabled", "true");
    }
}

function getCharactererName() {
    return nombrePersonaje.value
}
function getCharacterSentence() {
    return frasePersonaje.value
}

let signInButtonElement = document.getElementById("login");
let signOutButtonElement = document.getElementById("logout");
let name = document.getElementById('name')
let nombrePersonaje = document.getElementById('nombrePersonaje')
let frasePersonaje = document.getElementById('frasePersonaje')
let imagenPersonaje = document.getElementById('imagenPersonaje')
let btnGuardarPersonaje = document.getElementById('btnGuardarPersonaje')
let usuario = {}
let newCharacterForm = document.getElementById('new-character-form')
var avisoSoloImagenes = document.getElementById("avisoSoloImagenes")
var avisoGuardastePersonaje = document.getElementById("avisoGuardastePersonaje")
let imgCharacter
let xclose = document.getElementById("x-close")
let xclose2 = document.getElementById("x-close2")


//Sing In
signOutButtonElement.addEventListener("click", (e)=>{
    e.preventDefault()
    signOut()
});
//Sing Out
signInButtonElement.addEventListener("click", (e)=>{
    e.preventDefault()
    signIn()
});

btnGuardarPersonaje.addEventListener('click', (e)=>{
    e.preventDefault()
    console.log('1')
    document.getElementById('loading').style.display = 'block';

    saveCharacter()
    console.log('3')
    newCharacterForm.reset()
})

xclose.addEventListener('click', (e)=>{
    document.getElementById('avisoSoloImagenes').style.display = 'none'
})
xclose2.addEventListener('click', (e)=>{
    document.getElementById('avisoGuardastePersonaje').style.display = 'none'
})
imagenPersonaje.addEventListener("change", onMediaFileSelected);
nombrePersonaje.addEventListener("change", toggleButton);
frasePersonaje.addEventListener("change", toggleButton);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
initFirebaseAuth()
// Checks that Firebase has been imported.
checkSetup();
