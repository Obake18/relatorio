import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import { getDatabase, ref, onValue, query } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

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


// Obtenha uma referência para o banco de dados
var databaseRef = ref(database, 'relatorios');

// Crie uma consulta para obter os dados
var relatoriosQuery = query(databaseRef);

// Use a função on para ouvir as alterações nos dados
onValue(relatoriosQuery, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // Os dados existem, então você pode processá-los como quiser
        var table = document.getElementById('tabelaRelatorios'); // Obtenha a referência para a tabela
        table.innerHTML = ''; // Limpe a tabela
        for (let id in data) {
            // Crie uma nova linha para cada publicador
            var row = table.insertRow(-1);

            // Crie uma nova célula para cada propriedade do publicador
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);

            // Defina o texto de cada célula
            cell1.innerHTML = data[id].nome;
            cell2.innerHTML = data[id].mes;
            cell3.innerHTML = data[id].participou ? 'Sim' : 'Não';
            cell4.innerHTML = data[id].estudoBiblico;
            cell5.innerHTML = data[id].horas;
            cell6.innerHTML = data[id].observacoes;
        }
    } else {
        // Os dados não existem
        console.log("Nenhum dado encontrado");
    }
}, (error) => {
    // Ocorreu um erro ao ler os dados
    console.error(error);
});
