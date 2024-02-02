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
