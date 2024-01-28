document.getElementById('minutos').addEventListener('change', function () {
    var minutos = parseInt(this.value);
    var horasInput = document.getElementById('horas');
    var horas = parseInt(horasInput.value);

    if (minutos >= 60) {
        horas += Math.floor(minutos / 60);
        minutos %= 60;

        // Atualizar os valores nos campos
        horasInput.value = horas;
        this.value = minutos;
    }
});
// Capturar os valores dos campos
var nome = document.getElementById('nome').value;
var mes = document.getElementById('mes').value;
var participou = document.getElementById('atividade-sim').checked;
var estudoBiblico = parseInt(document.getElementById('estudo-number').value);
var horas = parseInt(document.getElementById('horas').value);
var minutos = parseInt(document.getElementById('minutos').value);
var observacoes = document.getElementById('observacoes').value;

// Criar uma instância da classe Publicador
var publicador = new Publicador(nome, mes, participou, estudoBiblico, horas, minutos, observacoes);

// Adicionar lógica adicional conforme necessário
console.log(publicador);
