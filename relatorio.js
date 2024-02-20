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
// Adiciona um ouvinte de evento de mudança ao elemento com ID 'minutos'
document.getElementById('minutos').addEventListener('change', function () {
    // Obtém o valor dos minutos como um número inteiro
    var minutos = parseInt(this.value);

    // Obtém o elemento de entrada de horas pelo ID
    var horasInput = document.getElementById('horas');
    // Obtém o valor das horas como um número inteiro
    var horas = parseInt(horasInput.value);

    // Verifica se o valor dos minutos é maior ou igual a 60
    if (minutos >= 60) {
        // Incrementa o número de horas com base nos minutos excedentes
        horas += Math.floor(minutos / 60);
        // Atualiza o valor dos minutos para o restante após a conversão para horas
        minutos %= 60;

        // Atualiza os valores nos campos, adicionando zeros à esquerda se necessário
        horasInput.value = horas.toString().padStart(2, '0');
        this.value = minutos.toString().padStart(2, '0');
    }
});

// Adicionar um ouvinte de evento para o formulário
document.getElementById('relatorio-form').addEventListener('submit', function (event) {
    // Evita que o formulário seja enviado normalmente
    event.preventDefault();

    // Capturar os valores dos campos dentro do evento de submissão
    var nome = document.getElementById('nome').value;
    var mes = document.getElementById('mes').value;
    var participou = document.getElementById('atividade-sim').checked;
    var estudoBiblicoInput = document.getElementById('estudo-number').value;
    var estudoBiblico = estudoBiblicoInput ? parseInt(estudoBiblicoInput) : 0;
    var horas = parseInt(document.getElementById('horas').value);
    var minutos = parseInt(document.getElementById('minutos').value);
    var observacoes = document.getElementById('observacoes').value;

    // Verifica se campos obrigatórios estão preenchidos (código comentado)
    /* if (!nome || !mes ) {
        // Exibir uma mensagem de erro ou lançar um erro conforme necessário
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
    } */

    // Cria uma instância da classe Publicador com os valores capturados
    var publicador = new Publicador(nome, mes, participou, estudoBiblico, horas, minutos, observacoes);

    // Adiciona lógica adicional conforme necessário
    console.log(publicador);

    // Envia dados para o Firebase Realtime Database
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

    // (Opcional) Adicionar lógica adicional após o envio para o Firebase
    console.log("Dados enviados para o Firebase!");
    alert("Seu relatório foi devidamente enviado!");
    
    // Limpar os campos do formulário
    limparCampos();
}

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
