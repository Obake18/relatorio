import { ref, push, update } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

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

document.getElementById('minutos').addEventListener('change', function () {
    var minutos = parseInt(this.value);
    var horasInput = document.getElementById('horas');
    var horas = parseInt(horasInput.value);

    if (minutos >= 60) {
        horas += Math.floor(minutos / 60);
        minutos %= 60;

        // Atualizar os valores nos campos com zero à esquerda
        horasInput.value = horas.toString().padStart(2, '0');
        this.value = minutos.toString().padStart(2, '0');
    }
});

// Adicionar um ouvinte de evento para o formulário
document.getElementById('relatorio-form').addEventListener('submit', function (event) {
    event.preventDefault();  // Evita que o formulário seja enviado normalmente

    // Capturar os valores dos campos dentro do evento de submissão
    var nome = document.getElementById('nome').value;
    var mes = document.getElementById('mes').value;
    var participou = document.getElementById('atividade-sim').checked;
    var estudoBiblicoInput = document.getElementById('estudo-number').value;
    var estudoBiblico = estudoBiblicoInput ? parseInt(estudoBiblicoInput) : 0;

    var horas = parseInt(document.getElementById('horas').value);
    var minutos = parseInt(document.getElementById('minutos').value);
    var observacoes = document.getElementById('observacoes').value;

    
 /*   if (!nome || !mes ) {
        // Display an error message or throw an error as per your requirement
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
    } */

    // Criar uma instância da classe Publicador
    var publicador = new Publicador(nome, mes, participou, estudoBiblico, horas, minutos, observacoes);

    // Adicionar lógica adicional conforme necessário
    console.log(publicador);

    // Enviar dados para o Firebase Realtime Database
    enviarDadosParaFirebase(publicador);
});


// Função para enviar dados para o Firebase Realtime Database
function enviarDadosParaFirebase(publicador) {
    // Obtenha uma referência para o banco de dados
    var databaseRef = ref(database, 'relatorios');

    // Gere um ID aleatório para o novo nó
    var newId = push(databaseRef).key;

    // Crie um objeto que representa a instância da classe Publicador
    var publicadorData = {
        id: newId,
        nome: publicador.nome,
        mes: publicador.mes,
        participou: publicador.participou,
        estudoBiblico: publicador.estudoBiblico,
        horas: publicador.horas.toString().padStart(2, '0'),
        minutos: publicador.minutos.toString().padStart(2, '0'),
        observacoes: publicador.observacoes
    };

    // Crie um objeto que representa o novo nó
    var newNode = {};
    newNode['Publicador' + newId] = publicadorData;

    // Use o método update para adicionar o novo nó ao banco de dados
    update(databaseRef, newNode);

    // Função para limpar os campos do formulário
function limparCampos() {
    document.getElementById('nome').value = '';
    document.getElementById('mes').value = '';
    document.getElementById('atividade-sim').checked = false;
    document.getElementById('estudo-number').value = '';
    document.getElementById('horas').value = '';
    document.getElementById('minutos').value = '';
    document.getElementById('observacoes').value = '';
}

    // (Opcional) Adicionar lógica adicional após o envio para o Firebase
    console.log("Dados enviados para o Firebase!");
    alert("Seu relatório foi devidamente enviado!");
    // Limpar os campos do formulário
    limparCampos();
}