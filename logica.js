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
        for (let id in data) {
            console.log(`ID: ${id}`);
            console.log(`Nome: ${data[id].nome}`);
            console.log(`Mês: ${data[id].mes}`);
            console.log(`Participou: ${data[id].participou}`);
            console.log(`Estudo Bíblico: ${data[id].estudoBiblico}`);
            console.log(`Horas: ${data[id].horas}`);
            console.log(`Minutos: ${data[id].minutos}`);
            console.log(`Observações: ${data[id].observacoes}`);
            console.log('---');
        }
    } else {
        // Os dados não existem
        console.log("Nenhum dado encontrado");
    }
}, (error) => {
    // Ocorreu um erro ao ler os dados
    console.error(error);
});
