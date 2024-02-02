// Importe os módulos necessários do Firebase Authentication
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import { getDatabase, ref, onValue, query } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Obtenha uma instância do objeto Auth
const auth = getAuth();

// Obtenha os elementos de login
const loginContainer = document.getElementById('login-container');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const botaoLogin = document.getElementById('botao-login');

// Obtenha os elementos da página
const tabelaRelatorios = document.getElementById('tabelaRelatorios');
const botaoBaixar = document.getElementById('botaoBaixar');
const modeToggle = document.getElementById('mode-toggle');

// Crie uma função para mostrar os elementos de login
function mostrarLogin() {
    loginContainer.style.display = 'block';
    tabelaRelatorios.style.display = 'none';
    botaoBaixar.style.display = 'none';
    modeToggle.style.display = 'none';
}

// Crie uma função para mostrar os elementos da página
function mostrarPagina() {
    loginContainer.style.display = 'none';
    tabelaRelatorios.style.display = 'table';
    botaoBaixar.style.display = 'inline-block';
    modeToggle.style.display = 'inline-block';
}

// Crie uma função para fazer o login com o Firebase
function fazerLogin() {
    // Obtenha o e-mail e a senha digitados
    const email = emailInput.value;
    const senha = senhaInput.value;

    // Valide os campos de entrada
    if (email === '' || senha === '') {
        alert('Por favor, digite o seu e-mail e senha.');
        return;
    }

    // Tente fazer o login com o Firebase
    signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            // Login bem-sucedido
            const user = userCredential.user;
            console.log('Usuário logado: ' + user.email);
            mostrarPagina();
        })
        .catch((error) => {
            // Login falhou
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode + ': ' + errorMessage);
            alert('E-mail ou senha incorretos.');
        });
}

// Adicione um evento de clique ao botão de login
botaoLogin.addEventListener('click', fazerLogin);

// Verifique o estado de autenticação do usuário
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Usuário está logado
        console.log('Usuário logado: ' + user.email);
        mostrarPagina();
    } else {
        // Usuário não está logado
        console.log('Usuário não logado.');
        mostrarLogin();
    }
});


// Obtenha uma referência para o banco de dados
const databaseRef = ref(database, 'relatorios');

// Crie uma consulta para obter os dados
const relatoriosQuery = query(databaseRef);

// Use a função on para ouvir as alterações nos dados
onValue(relatoriosQuery, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // Os dados existem, então você pode processá-los como quiser

        // Mapeie os dados para um array de relatórios
        const relatorios = Object.values(data);

        // Organize os relatórios em ordem alfabética pelo nome
        relatorios.sort((a, b) => (a.nome || "").localeCompare(b.nome || ""));

        let table = document.getElementById('tabelaRelatorios'); // Obtenha a referência para a tabela

        // Limpe apenas as linhas de dados, preservando o cabeçalho
        for(let i = table.rows.length - 1; i > 0; i--)
        {
            table.deleteRow(i);
        }

        // Percorra os relatórios
        relatorios.forEach((relatorio) => {
            // Crie uma nova linha para cada publicador
            let row = table.insertRow(-1);

            // Crie uma nova célula para cada propriedade do publicador
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            let cell6 = row.insertCell(5);
            let cell7 = row.insertCell(6);

            // Defina o texto de cada célula, e preencha com "não informado" se for null ou undefined
            cell1.innerHTML = relatorio.nome || "Não informado";
            cell2.innerHTML = relatorio.mes || "Não informado";
            cell3.innerHTML = relatorio.participou ? 'Sim' : 'Não';
            cell4.innerHTML = relatorio.estudoBiblico || "Não informado";
            cell5.innerHTML = isNaN(relatorio.horas) ? "0" : relatorio.horas; // Se for NaN, defina como "0"
            cell6.innerHTML = isNaN(relatorio.minutos) ? "0" : relatorio.minutos; // Se for NaN, defina como "0"
            cell7.innerHTML = relatorio.observacoes || "Nada informado";
        });
    } else {
        // Os dados não existem
        console.log("Nenhum dado encontrado");
    }
}, (error) => {
    // Ocorreu um erro ao ler os dados
    console.error(error);
});

