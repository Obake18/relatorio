// Importar os módulos necessários do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, verifyPasswordResetCode, confirmPasswordReset, updateEmail, EmailAuthProvider, reauthenticateWithCredential } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";



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


// Inicializar o Firebase primeiro
const app = initializeApp(firebaseConfig)

// Obter uma referência ao objeto Auth
const auth = getAuth();

// Vincular a função ao formulário de criação de usuário
document.getElementById("createUserForm").addEventListener("submit", function (event) {
    event.preventDefault();
    // Obter o e-mail e a senha do usuário
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // Criar um novo usuário com e-mail e senha
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Usuário criado com sucesso
            const user = userCredential.user;
            alert("Usuário criado com sucesso!");
        })
        .catch((error) => {
            // Erro ao criar o usuário
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Erro ao criar o usuário: " + errorMessage);
        });
});

// Vincular a função ao formulário de login de usuário
document.getElementById("loginUserForm").addEventListener("submit", function (event) {
    event.preventDefault();
    // Obter o e-mail e a senha do usuário
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // Conectar o usuário com e-mail e senha
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Usuário conectado com sucesso
            const user = userCredential.user;
            alert("Usuário conectado com sucesso!");
        })
        .catch((error) => {
            // Erro ao conectar o usuário
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Erro ao conectar o usuário: " + errorMessage);
        });
});

// Vincular a função ao formulário de redefinição de senha
document.getElementById("resetPasswordForm").addEventListener("submit", function (event) {
    event.preventDefault();
    // Obter o e-mail do usuário
    const email = document.getElementById("email").value;
    // Enviar um e-mail de redefinição de senha para o usuário
    sendPasswordResetEmail(auth, email)
        .then(() => {
            // E-mail enviado com sucesso
            alert("E-mail de redefinição de senha enviado com sucesso!");
        })
        .catch((error) => {
            // Erro ao enviar o e-mail
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Erro ao enviar o e-mail de redefinição de senha: " + errorMessage);
        });
});

// Vincular a função ao formulário de atualização de senha
document.getElementById("updatePasswordForm").addEventListener("submit", function (event) {
    event.preventDefault();
    // Obter a nova senha do usuário
    const newPassword = document.getElementById("newPassword").value;
    // Obter o token de redefinição da URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('oobCode');
    // Verificar o token e atualizar a senha do usuário
    verifyPasswordResetCode(auth, token)
        .then((email) => {
            // Token verificado com sucesso
            confirmPasswordReset(auth, token, newPassword)
                .then(() => {
                    // Senha atualizada com sucesso
                    alert("Senha atualizada com sucesso!");
                    // Redirecionar para a página de login
                    window.location.href = "login.html";
                })
                .catch((error) => {
                    // Erro ao atualizar a senha
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert("Erro ao atualizar a senha: " + errorMessage);
                });
        })
        .catch((error) => {
            // Erro ao verificar o token
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Erro ao verificar o token: " + errorMessage);
        });
});

// Função para atualizar o e-mail
function changeEmail() {
    const user = auth.currentUser;

    if (user) {
        // Reautenticar o usuário com a senha atual
        const password = prompt("Digite a sua senha atual:");
        const credential = EmailAuthProvider.credential(user.email, password);
        reauthenticateWithCredential(user, credential)
            .then(() => {
                // Usuário reautenticado com sucesso
                // Pedir o novo e-mail ao usuário
                const newEmail = prompt("Digite o seu novo e-mail:");
                // Atualizar o e-mail com o novo e-mail
                updateEmail(user, newEmail)
                    .then(() => {
                        // E-mail atualizado com sucesso
                        alert("E-mail atualizado com sucesso!");
                    })
                    .catch((error) => {
                        // Erro ao atualizar o e-mail
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        alert("Erro ao atualizar o e-mail: " + errorMessage);
                    });
            })
            .catch((error) => {
                // Erro ao reautenticar o usuário
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Erro ao reautenticar o usuário: " + errorMessage);
            });
    } else {
        alert("Nenhum usuário está logado.");
    }
}

// Vincular a função ao formulário de atualização de e-mail
document.getElementById("updateEmailForm").addEventListener("submit", function (event) {
    event.preventDefault();
    // Chamar a função changeEmail do arquivo cadeado.js
    changeEmail();
});
