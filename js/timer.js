

//desabilitando o continuar no começo do código
document.getElementById("continuar").disabled = true;

const duracao_total= localStorage.getItem("duracao_treino");
const tempo_do_golpe= localStorage.getItem("tempo_golpe");
const intervalo_tempo= localStorage.getItem("intervalo_golpe");
const rounds = localStorage.getItem("qtd_rounds");
const descanso = localStorage.getItem("descanso");


// Recupera os golpes do localStorage e exibe na lista
function carregarGolpes() {
    //pegar os golpes como partes do json anterior
    const golpes = JSON.parse(localStorage.getItem("golpes")) || [];
    console.log("Carregando os golpes:" + golpes)
    let resultado = document.getElementById("resultado");
    
    resultado.innerHTML = ""; // Limpa a lista antes de preencher
    golpes.forEach(golpe => {
        resultado.textContent = golpe;
    });
    iniciarTreino(golpes,tempo_do_golpe,intervalo_tempo,duracao_total)
}

function formatarTempo(ms) {
    const totalSegundos = Math.floor(ms / 1000);
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    
    const minFormatado = minutos.toString().padStart(2, "0");
    const segFormatado = segundos.toString().padStart(2, "0");
    
    return `${minFormatado}:${segFormatado}`;
}


let tempoDecorrido = 0;
let pausado = false
let timeoutGolpe;
let timeoutIntervalo;

function iniciarTreino(golpes,tempo_do_golpe, intervalo_tempo, duracao_total) {
    console.log(tempo_do_golpe)
    console.log(intervalo_tempo)
    console.log(duracao_total)
    console.log("Temos estes rounds: " + contador_rounds)

    document.getElementById("round_atual").textContent = "Round atual: " + contador_rounds;
    //Iniciar o cronometro aqui
    iniciarCronometro()

    if (golpes.length == 0) {
        document.getElementById("resultado").textContent = "Nenhum golpe disponível!";
        return;
    }
    // Para qualquer treino anterior antes de iniciar um novo
    let pausado = false;
    clearTimeout(timeoutGolpe);
    clearTimeout(timeoutIntervalo);
    
    let tempoTotalMs = duracao_total * 60 * 1000;//convertendo para minutos
    let tempoGolpeMs = tempo_do_golpe * 1000;//convertendo para segundos
    let intervaloTempoMs = intervalo_tempo * 1000;

    function executarGolpe() {
        if (tempoDecorrido >= tempoTotalMs || pausado) {//tendo apenas 1 round cai neste if
            clearInterval(temporizador)
            console.log("Finalizando treino!Ou não...")
            finalizarTreino()
            return;
        }
        
        const golpeSorteado = golpes[Math.floor(Math.random() * golpes.length)];//sorteio do golpe
        document.getElementById("resultado").textContent = `${golpeSorteado}`;

        timeoutGolpe = setTimeout(() => {//primeiro (quanto tempo do golpe)
            if (!pausado) {
                document.getElementById("resultado").textContent = "Próximo golpe...";
                tempoDecorrido += intervaloTempoMs;//atualizando 1 segundo

                timeoutIntervalo = setTimeout(() => {//segundo(quanto tempo do intervalo)
                    tempoDecorrido += tempoGolpeMs ;//atualizando o tempo
                    executarGolpe();//executarGolpe denovo para próximo golpe
                }, intervaloTempoMs);
            }
        }, tempoGolpeMs);
    }
    executarGolpe();
}
//Botões de pausar e continuar treino 
function pausarTreino() {
    pausado = true;
    clearTimeout(timeoutGolpe);
    clearTimeout(timeoutIntervalo);
    clearInterval(temporizador);
    document.getElementById("pause").disabled = true;
    document.getElementById("continuar").disabled = false;
}

function continuarTreino() {
    pausado = false
    carregarGolpes()
    document.getElementById("pause").disabled = false;
    document.getElementById("continuar").disabled = true;
}

//função de resetar para casos de mais de um round*
function resetar(descanso) {
    // Para o temporizador
    clearInterval(temporizador); 
    tempo_timer = 0
    console.log(descanso)
    
    let descansoTotal = descanso * 60 * 1000
    console.log(descansoTotal)
    document.getElementById('cronometro').textContent =
    `${formatarTempo(tempo_timer)}`;

    let temporizador_descanso = setInterval(() => {
        if (descansoTotal > 0) {
            document.getElementById('resultado').textContent =
            `Descanso: ${formatarTempo(descansoTotal)}`;
            descansoTotal -= 1000;
            console.log(descansoTotal)
        } else {
            clearInterval(temporizador_descanso);
            document.getElementById('resultado').textContent = "Treino iniciado novamente!";
            tempoDecorrido = 0//atualizar tempo decorrido 
            carregarGolpes()
            // Antes de trocar de página
        }
    }, 1000);
}

//contador fora para ser atualizado depois 
let contador_rounds = 1
function finalizarTreino(){
    if(rounds == contador_rounds){
        document.getElementById("resultado").textContent = "Treino concluído!";
        console.log("Todos os rounds concluídos!");
        clearInterval(temporizador);
        return;
    }
    else if (contador_rounds < rounds ){//Em casos de mais de um round 
        contador_rounds ++
        console.log("Acrescentado mais um round!" + contador_rounds)
        resetar(descanso)
        return contador_rounds
    }
}

//começando o cronômetro
let tempo_timer = 0;
let temporizador;
let temporizador_descanso;

function iniciarCronometro() {
    temporizador = setInterval(() => {
        tempo_timer += 1000;
        console.log("Tempo decorrido no timer:" + tempoDecorrido)
        document.getElementById('cronometro').textContent =
        `${formatarTempo(tempo_timer)}`;
    }, 1000);
}

window.onload = function () {
    carregarGolpes()
};



