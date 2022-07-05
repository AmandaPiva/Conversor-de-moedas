//selecionando os elementos de entrada
var selInput = document.querySelector('#ValorEmReal');
var seloption = document.getElementsByName('moedaEstrangeira');
var instruction = document.querySelector('#aviso');

//selecionar os botões
var btnConverter = document.querySelector('#Converter');
var btnClear = document.querySelector('btnLimpar');

//COTAÇÃO DO DIA
//objeto cotação
var cotacao = {
    dolar: 5.24,
    euro: 5.54,
    libra: 6.43,
    bitcoins: 110637.33,
    real: 0
}

var moedaEstrangeira = '';
var moedaConvertida = 0.00;

//formatando a mensagem que será exibida ao converter para valores monetários
function formata(moedaConvertida){
    isNaN(cotacao.real) ? cotacao.real = 0 : '';    //operadores de condição ternária, se for verdadeira, acontece oq esta depois da ?, se não, o que está depois do :
    console.log("Moeda convertida" + moedaConvertida);  
    instruction.textContent = "O valor " + (cotacao.real).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + " convertida em " + moedaEstrangeira + " é " + moedaConvertida
    //O valor convertido mostrado junto com a formatação do valor em real no padrão br
}

//validando o campo input
function bloquearBotao(){   //função que bloqueia o botão caso o input estiver com erros
    if(selInput.value == 0 || selInput == '' || selInput == null){
        btnConverter.setAttribute('disabled', 'disabled');
        btnConverter.style.background = '#ccc';
        btnConverter.style.cursor = 'not-allowed';
    }
}

//ativando o botão caso estiver tudo certo com a entrada de dados
function ativarBotao(){
    if(selInput.value > 0){
        btnConverter.removeAttribute('disabled');
        btnConverter.style.background = 'red';
        btnConverter.style.cursor = 'pointer';
    }
    else{
        console.log('Erro ao ativar o botão');
    }
}

//validação dos radios
//vincular a verificação a um evento click no botão converter

btnConverter.addEventListener('click', function(){
    cotacao.real = parseFloat(selInput.value);  //convertendo o valor em real em float

    console.log('escolhe uma opção');

    //for que percorre todos os inputs radios e pega apenas o selecionado e guarda na mesma variável
    for(let i = 0; i < seloption.length; i++){
        if(seloption[i].checked){
            moedaEstrangeira = seloption[i].value;
            
            console.log(moedaEstrangeira);
        }
    }

    //switch que faz o cálculo da conversão, de acordo com a escolha do usuário

    switch(moedaEstrangeira){
        case 'dolar':
            moedaConvertida = selInput.value / cotacao.dolar;
            formata(moedaConvertida.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))
            break;

            case 'euro':
                moedaConvertida = selInput.value / cotacao.euro;
                formata(moedaConvertida.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }))
                break;

            case 'libra':
                moedaConvertida = selInput.value / cotacao.libra;
                formata(moedaConvertida.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }))
                break;
            
            case 'bitcoins':
                moedaConvertida = selInput.value / cotacao.bitcoins;
                formata(parseFloat(moedaConvertida).toFixed(5));
                break;

            default:
                instruction.textContent = "Escolha uma moeda estrangeira";    
    }
    isNaN(moedaConvertida) ? moedaConvertida = '0': '';

})
