//estilizando os options
document.querySelectorAll("option").forEach(option => {
  option.style.fontFamily = "Kanit, sans-serif";
  option.style.fontWeight = "700";
  option.style.color = "white";
  option.style.background = "#eb4b4b";
});


function desabilitarInicio(){
  let selects = document.querySelectorAll("#todos_golpes .golpe");
  for (i in selects){
    selects[i].disabled = true
  }
}

//parse int converte para número o select
function disabilitarSelects(){
  let quantidade = parseInt(document.getElementById("qtd_golpes").value);
  let selects = document.querySelectorAll("#todos_golpes .golpe");
  let golpesAplicados = []
  //colocando todos os golpes dentro de uma div e só elas sendo selecionadas
  for (let i = 0; i < selects.length; i++) {
    if (i < quantidade) {
        selects[i].disabled = i >= quantidade; // Habilita os necessários
    }else{
      selects[i].disabled = true
    }
  };
  selects.forEach(select => {
    if (!select.disabled) {
        golpesAplicados.push(select.value);
    }
  })
  return golpesAplicados;
}

function enviarValores() {
    
    
    
    const qtd_golpes = document.getElementById("qtd_golpes").value;
    const golpe1 = document.getElementById("golpe1").value;
    const golpe2 = document.getElementById("golpe2").value;
    const golpe3 = document.getElementById("golpe3").value;
    const golpe4 = document.getElementById("golpe4").value;
    const golpe5 = document.getElementById("golpe5").value;
    const golpe6 = document.getElementById("golpe6").value;
    const golpe7 = document.getElementById("golpe7").value;
    const golpe8 = document.getElementById("golpe8").value;
    const golpe9 = document.getElementById("golpe9").value;
    const golpe10 = document.getElementById("golpe10").value;
    const golpe11 = document.getElementById("golpe11").value;
    const golpe12 = document.getElementById("golpe12").value;

    const tempo_golpe = document.getElementById("tempo_do_golpe").value;
    const intervalo = document.getElementById("intervalo_do_golpe").value;
    const descanso_round = document.getElementById("descanso_entre_rounds").value;
    const duracao = document.getElementById("duracao_treino").value;
    const rounds = document.getElementById("qtd_rounds").value;
    const golpes = disabilitarSelects()

    
    localStorage.setItem("qtd_golpes", qtd_golpes); 
    localStorage.setItem("golpe1", golpe1); 
    localStorage.setItem("golpe2", golpe2); 
    localStorage.setItem("golpe3", golpe3); 
    localStorage.setItem("golpe4", golpe4); 
    localStorage.setItem("golpe5", golpe5); 
    localStorage.setItem("golpe6", golpe6); 
    localStorage.setItem("golpe7", golpe7); 
    localStorage.setItem("golpe8", golpe8); 
    localStorage.setItem("golpe9", golpe9); 
    localStorage.setItem("golpe10", golpe10); 
    localStorage.setItem("golpe11", golpe11); 
    localStorage.setItem("golpe12", golpe12);  
    localStorage.setItem("tempo_golpe", tempo_golpe); 
    localStorage.setItem("intervalo_golpe", intervalo); 
    localStorage.setItem("descanso", descanso_round); 
    localStorage.setItem("duracao_treino", duracao); 
    localStorage.setItem("qtd_rounds", rounds);
    localStorage.setItem("golpes",JSON.stringify(golpes))
    console.log(golpes)
    console.log(tempo_golpe)
    console.log(duracao)
    console.log(golpes)
    console.log(golpes)
    //qtd de golpes,duraçao total,tempo do golpe,intervalo e quantidade de rounds,se tiver mais de um round ver como repetir após o término de um round 
    
    if (qtd_golpes == "-"){
      alert("Selecione a quantidade de golpes para começar o treino!")
      return
    }
    else if (duracao == "-"){
      alert("Selecione a duração total do treino!")
      return
    }
    else if (tempo_golpe == "-"){
      alert("Selecione o tempo de cada golpe!")
      return
    }
    else if (intervalo == "-"){
      alert("Selecione o intervalo de cada golpe!")
      return
    }
    else if (rounds == "-"){
      alert("Selecione quantos rounds terá o treino!")
      return
    }
    comecoTreino()
}
  

function reset() {
  const selects = document.querySelectorAll('.golpe');
  selects.forEach(select => {
    select.value = '';
    select.disabled = false;
  });

  const quantidadeSelect = document.getElementById('qtd_golpes');
  if (quantidadeSelect) {
    quantidadeSelect.value = '';
  }  
}

function comecoTreino() {
  const textoContador = document.getElementById('texto_5seg');
  const contador = document.getElementById('tempo_5seg');
  
  contador.innerText = ""; // Deixa o timer invisível antes de iniciar

  let tempo = 5;
  let textoTempo = "O treino irá começar em:"
  let intervalo = setInterval(() => {
      if (tempo > 0) {
          textoContador.innerText = textoTempo
          contador.innerText = tempo; // Exibe o tempo apenas depois de clicar no botão
          tempo--;
      } else {
          clearInterval(intervalo);
          // Antes de trocar de página
          window.location.href = "timer.html";
      }
  }, 1000);
} // Chama a função novamente após 1 segundo



window.onload = function () {
  desabilitarInicio()
};
