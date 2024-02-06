// Importar os módulos necessários do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD7pxlaSYxB40Nr3qbTbHLEh-gJgN4EPIM",
    authDomain: "gears2-e0f35.firebaseapp.com",
    projectId: "gears2-e0f35",
    storageBucket: "gears2-e0f35.appspot.com",
    messagingSenderId: "509544137239",
    appId: "1:509544137239:web:b205fadff126a48b181252",
    measurementId: "G-6K9W1YF08V"
};

// Inicializar o Firebase primeiro
const app = initializeApp(firebaseConfig);

// Obter uma referência ao objeto Auth
const auth = getAuth();

// Vincular a função ao formulário de criação de usuário
document.getElementById("createUserForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    // Obter o e-mail e a senha do usuário
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        // Criar um novo usuário com e-mail e senha
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Usuário criado com sucesso
        const user = userCredential.user;
        alert("Usuário criado com sucesso!");
    } catch (error) {
        // Erro ao criar o usuário
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Erro ao criar o usuário: " + errorMessage);
    }
});
