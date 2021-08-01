// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: 'AIzaSyCdTcy_i1iFhR_780UjjFtxusoCHWaip8U',
    authDomain: 'holasoygokufrases.firebaseapp.com',
    databaseURL: 'https://holasoygokufrases.firebaseio.com',
    projectId: 'holasoygokufrases',
    storageBucket: 'holasoygokufrases.appspot.com',
    messagingSenderId: '720092220680',
    appId: '1:720092220680:web:b7e14a3c4d702a9df8b0bd',
    measurementId: 'G-8RXEH1H8WT',
};

// Signs-in .
function signIn() {
    // Sign into Firebase using popup auth & Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            console.log('valar morghulis / login', result.user.email);
            usuario = result;
            console.log(usuario);
            btnGuardarPersonaje.removeAttribute('disabled')
        })
        .catch((error) => console.log(error.message, error.code));
}

// Signs-out.
function signOut() {
    // Sign out of Firebase.
    firebase
        .auth()
        .signOut()
        .then(function () {
            console.log('valar doharis / logout');
            btnGuardarPersonaje.setAttribute('disabled',true)
        })
        .catch(function (err) {
            console.log(err, 'not today');
            btnGuardarPersonaje.setAttribute('disabled',true)
        });
}

// Triggers when the auth state change
function initFirebaseAuth() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            usuario = { user: user };
            nombreDelUsuario.innerHTML = 'Hola ' + usuario.user.displayName + '!';
            signInButtonElement.style.display = 'none';
            signOutButtonElement.style.display = 'block';
            btnGuardarPersonaje.removeAttribute('disabled')
        } else {
            nombreDelUsuario.innerHTML = '';
            signInButtonElement.style.display = 'block';
            signOutButtonElement.style.display = 'none';
            btnGuardarPersonaje.setAttribute('disabled',true)
        }
    });
}

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert(
            'You have not configured and imported the Firebase SDK. ' +
                'Make sure you go through the codelab setup instructions and make ' +
                'sure you are running the codelab using `firebase serve`'
        );
    }
}

let signInButtonElement = document.getElementById('login');
let signOutButtonElement = document.getElementById('logout');
let usuario = {};
let nombreDelUsuario = document.getElementById('name');
let esferaPixel = document.getElementById('esferaPixel');
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
initFirebaseAuth();
// Checks that Firebase has been imported.
checkSetup();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////// Upload Character ///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let nombrePersonaje = document.getElementById('nombrePersonaje');
let frasePersonaje = document.getElementById('frasePersonaje');
let imagenPersonaje = document.getElementById('imagenPersonaje');
let btnGuardarPersonaje = document.getElementById('btnGuardarPersonaje');
let newCharacterForm = document.getElementById('new-character-form');
var avisoSoloImagenes = document.getElementById('avisoSoloImagenes');
var avisoGuardastePersonaje = document.getElementById('avisoGuardastePersonaje');
var avisoGuardastePersonajePeroNoSosJere = document.getElementById('avisoGuardastePersonajePeroNoSosJere');
var avisoAlgoSalioMal = document.getElementById('avisoAlgoSalioMal');

let imgCharacter;
let xclose = document.getElementById('x-close');
let xclose2 = document.getElementById('x-close2');
let xclose3 = document.getElementById('x-close3');
let xclose4 = document.getElementById('x-close4');

// // Saves a new message on the Firebase DB.
// function saveCharacter2() {
//     // Add a new message entry to the database.
//     return firebase.firestore().collection("Characters")
//         .add({
//             name: getCharactererName(),
//             sentence: getCharacterSentence(),
//             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//         }).then(function(messageRef){
//             console.log(messageRef)
//         })
//         .catch(function (error) {
//             console.error("Error writing new message to database", error);
//         });
// }

// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.
function saveCharacter() {
    // 1 - We add a message with a loading icon that will get updated with the shared image.
    firebase
        .firestore()
        .collection('Characters')
        .add({
            name: getCharactererName(),
            sentence: getCharacterSentence(),
            imageUrl: '',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            estado: setState(),
        })
        .then(function (messageRef) {
            // 2 - Upload the image to Cloud Storage.
            var filePath =
                'Characters Images' +
                '/' +
                'user:' +
                firebase.auth().currentUser.uid +
                '/' +
                messageRef.id +
                '-' +
                imgCharacter.name;
            return firebase
                .storage()
                .ref(filePath)
                .put(imgCharacter)
                .then(function (fileSnapshot) {
                    // 3 - Generate a public URL for the file.
                    return fileSnapshot.ref.getDownloadURL().then((url) => {
                        // 4 - Update the chat message placeholder with the image's URL.
                        document.getElementById('loading').style.display = 'none';
                        if (setState()==='aprobado'){
                            document.getElementById('avisoGuardastePersonaje').style.display = 'block';
                            setTimeout(function () {
                                document.getElementById('avisoGuardastePersonaje').style.display = 'none';
                            }, 8000);
                        }else{
                            document.getElementById('avisoGuardastePersonaje').style.display = 'block';
                            setTimeout(function () {
                                document.getElementById('avisoGuardastePersonaje').style.display = 'none';
                            }, 8000);
                        }
                        return messageRef.update({
                            imageUrl: url,
                            storageUri: fileSnapshot.metadata.fullPath,
                        });
                    });
                });
        })
        .catch(function (error) {
            console.error('There was an error uploading a file to Cloud Storage:', error);
        });
}

newCharacterForm.addEventListener('submit', function (event) {
    event.preventDefault()
    // document.getElementById('loading').style.display = 'block';
    if (!newCharacterForm.checkValidity()) {
        event.preventDefault();
        document.getElementById('loading').style.display = 'none';
        event.stopPropagation();
    }
    newCharacterForm.classList.add('was-validated');
    // saveCharacter();
    alert('aun no funciona')
});

// Triggered when a file is selected via the media picker.
function onMediaFileSelected(event) {
    event.preventDefault();
    imgCharacter = event.target.files[0];

    // // Clear the selection in the file picker input.
    // imageFormElement.reset();

    imgPersonaje = document.getElementById('imagenPersonaje');
    // Check if the file is an image.
    if (!imgCharacter.type.match('image.*')) {
        imgPersonaje.value = '';
        avisoSoloImagenes.style.display = 'block';
        setTimeout(function () {
            document.getElementById('avisoSoloImagenes').style.display = 'none';
        }, 4000);
        return;
    }
    toggleButton();
}

function toggleButton() {
    if (nombrePersonaje.value && frasePersonaje.value && imagenPersonaje.value) {
        btnGuardarPersonaje.removeAttribute('disabled');
    } else {
        btnGuardarPersonaje.setAttribute('disabled', 'true');
    }
}

function getCharactererName() {
    return nombrePersonaje.value;
}
function getCharacterSentence() {
    return frasePersonaje.value;
}

function setState() {
    if (usuario.user.mail === "jeremiasfigueroa69@gmail.com") {
        return "aprobado"
    }else{
        return "en espera"
    }
}
//Sing In
signOutButtonElement.addEventListener('click', (e) => {
    e.preventDefault();
    signOut();
});
//Sing Out
signInButtonElement.addEventListener('click', (e) => {
    e.preventDefault();
    signIn();
});

// btnGuardarPersonaje.addEventListener('click', (e) => {
//     e.preventDefault();
//     document.getElementById('loading').style.display = 'block';

//     saveCharacter();
//     newCharacterForm.reset();
// });

xclose.addEventListener('click', (e) => {
    document.getElementById('avisoSoloImagenes').style.display = 'none';
});
xclose2.addEventListener('click', (e) => {
    document.getElementById('avisoGuardastePersonaje').style.display = 'none';
});
xclose3.addEventListener('click', (e) => {
    document.getElementById('avisoGuardastePersonajePeroNoSosJere').style.display = 'none';
});
xclose4.addEventListener('click', (e) => {
    document.getElementById('avisoAlgoSalioMal').style.display = 'none';
});
// imagenPersonaje.addEventListener('change', onMediaFileSelected);
// nombrePersonaje.addEventListener('change', toggleButton);
// frasePersonaje.addEventListener('change', toggleButton);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////// All Character ///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const rowCharacters = document.getElementById('rowCharacters');

function loadMessages() {
    // Create the query to load the characters.
    var query = firebase.firestore().collection('Characters').orderBy('timestamp', 'asc');

    // Start listening to the query.
    query.onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === 'removed') {
                // deleteMessage(change.doc.id);
            } else {
                let char = change.doc.data();

                const divcol = document.createElement('div');
                divcol.className = 'col-lg-4 col-md-6 col-xs-6';
                const card = document.createElement('div');
                divcol.appendChild(card);
                card.className = 'card thinborder text-center';

                const image = document.createElement('img');
                image.src = char.imageUrl;
                image.className = 'card-img-top rounded-circle mb-4';

                const cardbody = document.createElement('div');
                cardbody.className = 'card-body';
                const small = document.createElement('small');
                const h4 = document.createElement('h4');
                h4.className = 'card-title';
                h4.innerHTML = char.name;

                const p = document.createElement('p');
                p.className = 'card-text';
                p.innerHTML = char.sentence;

                small.appendChild(h4);
                small.appendChild(p);
                cardbody.appendChild(small);

                card.appendChild(image);
                card.appendChild(cardbody);

                rowCharacters.appendChild(divcol);
            }
        });
    });
}
loadMessages();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function cargarPersonaje() {
    let avatar = document.getElementById('avatar');
    let nombre = document.getElementById('nombre-personaje');
    let frase = document.getElementById('frase');
    let rdm = Math.floor(Math.random() * (27 - 1)) + 1; //numero random de 1 a 26
    // rdm=10
    avatar.src = '/images/' + rdm + '.png';
    switch (rdm) {
        case 1:
            nombre.innerHTML = 'Goku';
            frase.innerHTML = '"Oye, no te emociones, no nos has vencido todavía."';
            break;
        case 2:
            nombre.innerHTML = 'Vegeta';
            frase.innerHTML = '"¿Qué sucede Freezer? ¿Tu cerebro es otro de tus músculos débiles y sin usar?"';
            break;
        case 3:
            nombre.innerHTML = 'Bulma';
            frase.innerHTML = '"¡Que alguien me ayude! ¡Soy demasiado joven y bonita para morir!"';
            break;
        case 4:
            nombre.innerHTML = 'Piccoro';
            frase.innerHTML = '"Dejenme en paz, el que este verde no significa que no este maduro"';
            break;
        case 5:
            nombre.innerHTML = 'Maestro Roshi';
            frase.innerHTML =
                '"Hay que trabajar, Hay que aprender, hay que comer, hay que descansar y tambien hay que jugar"';
            break;
        case 6:
            nombre.innerHTML = 'Goku';
            frase.innerHTML = '"Prefiero ser un mono descerebrado que un monstruo sin corazón"';
            break;
        case 7:
            nombre.innerHTML = 'Broli';
            frase.innerHTML = '"¿Qué es ser consciente?"';
            break;
        case 8:
            nombre.innerHTML = 'Freezer';
            frase.innerHTML =
                '"Soy el poderoso Freezer y sí, todas las historias horribles que has escuchado son ciertas"';
            break;
        case 9:
            nombre.innerHTML = 'Gohan';
            frase.innerHTML = '"¿Pelear contigo? Vengo a matarte"';
            break;
        case 10:
            nombre.innerHTML = 'Vegeta';
            frase.innerHTML = '"Mientras el enemigo siga de pie, yo seguiré peleando"';
            break;
        case 11:
            nombre.innerHTML = 'Goku';
            frase.innerHTML = '🖤';
            break;
        case 12:
            nombre.innerHTML = 'Goku';
            frase.innerHTML = '"A veces la vida es muy incierta para los arrepentimientos."';
            break;
        case 13:
            nombre.innerHTML = 'Nº17';
            frase.innerHTML = '"Sacrificarse por el bien de los demás... es un acto muy humano"';
            break;
        case 14:
            nombre.innerHTML = 'Octavio';
            frase.innerHTML = '"Goku no puede morir, pase lo que pase yo lo protegere"';
            break;
        case 15:
            nombre.innerHTML = 'Nº16';
            frase.innerHTML =
                '"Gohan, protege a los seres vivos y a las plantas de este mundo que tanto ame...te lo encargo"';
            break;
        case 16:
            nombre.innerHTML = 'Cell';
            frase.innerHTML = '"¡Necio! ¿¡No te das cuenta que estás peleando contra el arma perfecta?!"';
            break;
        case 17:
            nombre.innerHTML = 'Maestro Karin';
            frase.innerHTML = '"Pelea hasta estar satisfecho."';
            break;
        case 18:
            nombre.innerHTML = 'Bardock';
            frase.innerHTML =
                '"Kakaroto tu debes cumplir mi objetivo...tu seras quien vengara la muerte de todos los Saiyajin y la desaparición del Planeta Vegeta"';
            break;
        case 19:
            nombre.innerHTML = 'Freezer';
            frase.innerHTML =
                '"Antes de comenzar tu patética lucha por sobrevivir, debería advertirte. Tu posibilidad de ganar es inexistente"';
            break;
        case 20:
            nombre.innerHTML = 'Vegeta';
            frase.innerHTML = '"Trunks, Bulma, esto es por ustedes. Esto también es por ti Kakaroto."';
            break;
        case 21:
            nombre.innerHTML = 'Krillin';
            frase.innerHTML = '"Goku, será un gusto pelear contigo de aquí en adelante."';
            break;
        case 22:
            nombre.innerHTML = 'Krillin';
            frase.innerHTML =
                '"Me gustaría que cambiaras al Androide 17 y 18 a seres humanos, así podrán vivir una vida normal en paz."';
            break;
        case 23:
            nombre.innerHTML = 'Majin Boo';
            frase.innerHTML = '"A pesar de ser un buen niño eres muy Fuerte"';
            break;
        case 24:
            nombre.innerHTML = 'Bulma';
            frase.innerHTML = '"¡No te preocupes, te protegeré de la carita aterradora de tu papá!"';
            break;
        case 25:
            nombre.innerHTML = 'Goku';
            frase.innerHTML =
                '"Mas vale qe te calmes maldito asesino, mataste a cruelmente a personas inocentes una tras otras, te atreviste a matar a Krilin"';
            break;
        case 26:
            nombre.innerHTML = 'Vegeta';
            frase.innerHTML = '"Por favor elimina a freezer, por favor matalo con tus manos de Saiyajin."';
            break;
        default:
            nombre.innerHTML = '';
            frase.innerHTML = '';
    }
}
cargarPersonaje();

let refresh = document.getElementById('refresh');
let agregarPersonaje = document.getElementById('agregarPersonaje');
let verTodo = document.getElementById('verTodo');

let extensionDemo = document.getElementById('extensionDemo');
let uploadCharacter = document.getElementById('uploadCharacter');
let allCharacters = document.getElementById('allCharacters');

refresh.addEventListener('click', () => {
    cargarPersonaje();
    allCharacters.setAttribute('hidden', true);
    uploadCharacter.setAttribute('hidden', true);
    extensionDemo.removeAttribute('hidden');
});
agregarPersonaje.addEventListener('click', () => {
    allCharacters.setAttribute('hidden', true);
    extensionDemo.setAttribute('hidden', true);
    uploadCharacter.removeAttribute('hidden');
});
verTodo.addEventListener('click', () => {
    extensionDemo.setAttribute('hidden', true);
    uploadCharacter.setAttribute('hidden', true);
    allCharacters.removeAttribute('hidden');
});
