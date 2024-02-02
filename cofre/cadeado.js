// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7pxlaSYxB40Nr3qbTbHLEh-gJgN4EPIM",
    authDomain: "gears2-e0f35.firebaseapp.com",
    projectId: "gears2-e0f35",
    storageBucket: "gears2-e0f35.appspot.com",
    messagingSenderId: "509544137239",
    appId: "1:509544137239:web:b205fadff126a48b181252",
    measurementId: "G-6K9W1YF08V"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.getAnalytics(app);
const database = firebase.getDatabase(app);

// Função para fazer login
function login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Usuário logado
        var user = userCredential.user;
        
        // Verifique se o usuário tem permissão para acessar a página
        var ref = firebase.database().ref('users/' + user.uid);
        ref.once('value', function(snapshot) {
          if (snapshot.val().hasAccess) {
            // O usuário tem acesso, redirecione para a página
            window.location.href = "table.html";
          } else {
            // O usuário não tem acesso, mostre uma mensagem de erro
            alert("Você não tem permissão para acessar esta página.");
          }
        });
    })
    .catch((error) => {
        // Erro no login
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Erro no login: " + errorMessage);
    });
}

// Vincular a função ao formulário de login
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    login(email, password);
});
