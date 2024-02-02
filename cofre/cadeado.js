import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, updatePassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

// Sua configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD7pxlaSYxB40Nr3qbTbHLEh-gJgN4EPIM",
    authDomain: "gears2-e0f35.firebaseapp.com",
    projectId: "gears2-e0f35",
    storageBucket: "gears2-e0f35.appspot.com",
    messagingSenderId: "509544137239",
    appId: "1:509544137239:web:b205fadff126a48b181252",
    measurementId: "G-6K9W1YF08V"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Função para fazer login
function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Usuário logado
            const user = userCredential.user;

            // Redirecione para a página após o login bem-sucedido
            window.location.href = "table.html";
        })
        .catch((error) => {
            // Erro no login
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Erro no login: " + errorMessage);
        });
}



// Vincular a função ao formulário de login
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
});
