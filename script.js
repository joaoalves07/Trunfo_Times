let playerHand = [];
let computerHand = [];
let playedCardsPlayer = [];
let playedCardsComputer = [];
let selectedCardIndex = null;
let selectedAttribute = null;
let playerScore = 0;
let computerScore = 0;

const params = new URLSearchParams(window.location.search);
const playerTeam = params.get("player");
const opponentTeam = params.get("opponent");

// Inicializar o jogo com os times escolhidos
document.addEventListener("DOMContentLoaded", () => {
  startGame(playerTeam, opponentTeam);
});

function startGame(playerTeam, opponentTeam) {
  if (
    localStorage.getItem(opponentTeam) == "false" ||
    localStorage.getItem(playerTeam) == "false"
  ) {
    console.log("Error - Você não possui esse time");
    window.location.href = "index.html";
    alert("Error - Você não possui esse time");
    endGame();
  } else {
    switch (playerTeam) {
      case "Fluminense":
        Fluminense.sort(() => Math.random() - 0.5);
        playerHand = Fluminense.slice(0, 7);
        var novaImagem = "Fluminense/FundoFluminense.jpg";
        document.body.style.backgroundImage = `url('${novaImagem}')`;
        break;
      case "Flamengo":
        Flamengo.sort(() => Math.random() - 0.5);
        playerHand = Flamengo.slice(0, 7);
        var novaImagem = "Flamengo/FundoFlamengo.jpg";
        document.body.style.backgroundImage = `url('${novaImagem}')`;
        break;
      case "Botafogo":
        Botafogo.sort(() => Math.random() - 0.5);
        playerHand = Botafogo.slice(0, 7);
        var novaImagem = "Botafogo/FundoBotafogo.jpg";
        document.body.style.backgroundImage = `url('${novaImagem}')`;
        break;
      case "Vasco":
        Vasco.sort(() => Math.random() - 0.5);
        playerHand = Vasco.slice(0, 7);
        var novaImagem = "Vasco/FundoVasco.jpg";
        document.body.style.backgroundImage = `url('${novaImagem}')`;
        break;
      case "Corinthians":
        Corinthians.sort(() => Math.random() - 0.5);
        playerHand = Corinthians.slice(0, 7);
        var novaImagem = "Corinthians/Corinthiansfundo.webp";
        document.body.style.backgroundImage = `url('${novaImagem}')`;
        break;

      // Adicione mais casos conforme necessário para outros times
    }

    switch (opponentTeam) {
      case "Fluminense":
        Fluminense.sort(() => Math.random() - 0.5);
        computerHand = Fluminense.slice(0, 7);
        break;
      case "Flamengo":
        Flamengo.sort(() => Math.random() - 0.5);
        computerHand = Flamengo.slice(0, 7);
        break;
      case "Botafogo":
        Botafogo.sort(() => Math.random() - 0.5);
        computerHand = Botafogo.slice(0, 7);
        break;
      case "Vasco":
        Vasco.sort(() => Math.random() - 0.5);
        computerHand = Vasco.slice(0, 7);
        break;
        case "Corinthians":
          Corinthians.sort(() => Math.random() - 0.5);
          computerHand = Corinthians.slice(0, 7);
          break;  
      // Adicione mais casos conforme necessário para outros times
    }
  }
  // Atualizar a interface do usuário
  updateHandUI();
  updateScoreUI();
}

function updateHandUI() {
  const playerHandElement = document.getElementById("player-hand");
  const computerHandElement = document.getElementById("computer-hand");

  playerHandElement.innerHTML = "<h2>Seu Deck</h2>";
  computerHandElement.innerHTML = "<h2>Deck do Computador</h2>";

  playerHand.forEach((card, index) => {
    const cardElement = createCardElement(card, index);
    playerHandElement.appendChild(cardElement);
  });

  computerHand.forEach((card, index) => {
    const cardElement = createCardElement(card, index, true);
    computerHandElement.appendChild(cardElement);
  });
}

function createCardElement(
  card,
  index,
  isComputer = false,
  showFront = true,
  startWithBack = false
) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  if (isComputer) {
    cardElement.classList.add("computer-card");
    if (showFront && !startWithBack) {
      const backElement = document.createElement("img");
      backElement.src = card.back;
      cardElement.appendChild(backElement);
    } else {
      const frontElement = document.createElement("img");
      frontElement.src = card.front;
      cardElement.appendChild(frontElement);
    }
  } else {
    if (showFront) {
      const frontElement = document.createElement("img");
      frontElement.src = card.front;
      cardElement.appendChild(frontElement);
    } else {
      const backElement = document.createElement("img");
      backElement.src = card.back;
      cardElement.appendChild(backElement);
    }
    cardElement.dataset.index = index;
    cardElement.onclick = () => selectCard(index);
  }

  return cardElement;
}

function selectCard(index) {
  // Adiciona a seleção ao card atual
  const selectedCard = document.querySelector(
    `#player-hand .card[data-index="${index}"]`
  );

  if (selectedCard.classList.contains("selected")) {
    // Se já estiver selecionado, desmarque a seleção
    selectedCard.classList.remove("selected");
    selectedCardIndex = null;
    document.getElementById("playButton").disabled = true;
  } else {
    // Remova a seleção do card anterior (se houver)
    const previousSelectedCard = document.querySelector(
      `#player-hand .card.selected`
    );
    if (previousSelectedCard) {
      previousSelectedCard.classList.remove("selected");
    }

    // Adiciona a seleção ao card atual
    selectedCard.classList.add("selected");
    selectedCardIndex = index;
    if (selectedAttribute !== null) {
      document.getElementById("playButton").disabled = false;
    }
  }

  document.getElementById("result").textContent = "";
}

function updateSelectedAttribute(attribute) {
  selectedAttribute = attribute;

  // Remove a classe 'selected' de todos os botões
  const buttons = document.querySelectorAll("#attribute-buttons button");
  buttons.forEach((button) => button.classList.remove("selected"));

  // Adiciona a classe 'selected' apenas ao botão clicado
  const selectedButton = event.target;
  selectedButton.classList.add("selected");
  if (selectedCardIndex !== null) {
    document.getElementById("playButton").disabled = false;
  }
}

function updatePlayedCardsUI() {
  const playedCardsPlayerElement = document.getElementById(
    "played-cards-player"
  );
  const playedCardsComputerElement = document.getElementById(
    "played-cards-computer"
  );

  playedCardsPlayerElement.innerHTML = "<h2>Cartas Jogadas (Player)</h2>";
  playedCardsComputerElement.innerHTML = "<h2>Cartas Jogadas (Computador)</h2>";

  playedCardsPlayer.forEach((card, index) => {
    const cardElement = createCardElement(card, index, false, true);
    playedCardsPlayerElement.appendChild(cardElement);
  });

  playedCardsComputer.forEach((card, index) => {
    // Adiciona o novo parâmetro startWithBack
    const cardElement = createCardElement(
      card,
      index,
      true,
      true,
      index !== null
    );
    playedCardsComputerElement.appendChild(cardElement);
  });

  document.getElementById("played-cards-computer").style.display = "flex";
  document.getElementById("played-cards-player").style.display = "flex";
}

function play() {
  if (selectedCardIndex !== null && selectedAttribute !== null) {
    const playerCard = playerHand.splice(selectedCardIndex, 1)[0];
    const computerCard = computerHand.pop();

    // Adicione a lógica para determinar qual lista deve ser atualizada
    playedCardsPlayer.push(playerCard);
    playedCardsComputer.push(computerCard);

    updateHandUI();
    updatePlayedCardsUI();

    const playerAttributeValue = playerCard[selectedAttribute];
    const computerAttributeValue = computerCard[selectedAttribute];

    const resultElement = document.getElementById("result");
    const scoreElement = document.getElementById("score");

    let roundResult = "";
    if (playerAttributeValue > computerAttributeValue) {
      roundResult = "Você ganhou a rodada!";
      playerScore++;
    } else if (playerAttributeValue < computerAttributeValue) {
      roundResult = "Você perdeu a rodada!";
      computerScore++;
    } else {
      roundResult = "Empate!";
    }

    resultElement.textContent = roundResult;
    resultElement.style.opacity = 1; // Exibe o resultado com uma animação

    setTimeout(() => {
      resultElement.style.opacity = 0; // Oculta o resultado após alguns segundos
    }, 2000);

    document.getElementById("playButton").disabled = true;

    updateScoreUI();

    // Desabilitar o botão de jogar e exibir o botão de nova rodada (F5)
    document.getElementById("playButton").disabled = true;

    // Verificar se o jogo acabou

    if (playerHand.length === 0 || computerHand.length === 0) {
      document.getElementById("computer-hand").style.display = "none";
      document.getElementById("player-hand").style.display = "none";
      endGame();
    }
  }
}

function createUsedCardElement(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("used-card");

  if (isComputer) {
    cardElement.classList.add("used-computer-card");
    const frontElement = document.createElement("img");
    frontElement.src = card.front;
    cardElement.appendChild(frontElement);
  } else {
    //Front DEIXAR ESSE
    const frontElement = document.createElement("img");
    frontElement.src = card.front;
    cardElement.appendChild(frontElement);
    cardElement.dataset.index = index;
  }

  /*
  const attributesHTML = Object.entries(card).map(([key, value]) => `<strong>${key}:</strong> ${value}`).join('<br>');
  cardElement.innerHTML += `<div>${attributesHTML}</div>`;
  */
  return usedcardElement;
}

function updateScoreUI() {
  document.getElementById("playerScore").textContent = playerScore;
  document.getElementById("computerScore").textContent = computerScore;
}

function endGame() {
  CreateButtonFinal();
  const resultElement = document.getElementById("result");
  resultElement.textContent = "Fim de Jogo!";
  document.getElementById("playButton").disabled = true;
}

function reiniciarjogo() {
  window.location.href =
    "jogo.html?player=" + playerTeam + "&opponent=" + opponentTeam;
}

document.addEventListener("DOMContentLoaded", () => {
  startGame();
});

function mostrarOcultarElemento() {
  var meuElemento = document.getElementById("resultadohtml");
  meuElemento.style.display = "block";
}

function earnMoneyTeam(opponentTeam) {
  if (playerScore > computerScore) {
    switch (opponentTeam) {
      case "Fluminense":
        earnMoney(100);
      case "Flamengo":
        earnMoney(100);
      case "Botafogo":
        earnMoney(100);
      case "Vasco":
        earnMoney(100);
      case "Corinthians":
        earnMoney(100);  
      // Adicione mais casos conforme necessário para outros times
    }
  }
}

function CreateButtonFinal() {
  const newButton = document.createElement("button");

  // Adicionar texto ao botão
  newButton.textContent = "Ver resultado";

  // Adicionar um identificador ao botão (opcional)
  newButton.id = "myButton";

  // Adicionar um manipulador de eventos ao botão (opcional)
  newButton.addEventListener("click", function () {
    mostrarOcultarElemento();
    criarParagrafo(playerTeam, opponentTeam);
  });

  // Obter a div existente com o id "attribute-buttons"
  const attributeButtonsDiv = document.getElementById("ButtonFinal");

  // Adicionar o botão à div existente
  attributeButtonsDiv.appendChild(newButton);
}

function criarParagrafo(playerTeam, opponentTeam) {
  // Cria um novo elemento <p>
  var novoParagrafo = document.createElement("p");

  switch (playerTeam) {
    case "Fluminense":
      console.log(FluminenseINFO[0]);
      console.log(FluminenseINFO[1]);
      console.log(FluminenseINFO[2]);
      console.log(FluminenseINFO[3]);
      break;
    case "Flamengo":
      console.log(FlamengoINFO[0]);
      console.log(FlamengoINFO[1]);
      console.log(FlamengoINFO[2]);
      console.log(FlamengoINFO[3]);
      break;
    case "Botafogo":
      console.log(BotafogoINFO[0]);
      console.log(BotafogoINFO[1]);
      console.log(BotafogoINFO[2]);
      console.log(BotafogoINFO[3]);
      break;
    case "Vasco":
      console.log(VascoINFO[0]);
      console.log(VascoINFO[1]);
      console.log(VascoINFO[2]);
      console.log(VascoINFO[3]);
      break;
    case "Corinthians":
      console.log(CorinthiansINFO[0]);
      console.log(CorinthiansINFO[1]);
      console.log(CorinthiansINFO[2]);
      console.log(CorinthiansINFO[3]);
      break;  
    // Adicione mais casos conforme necessário para outros times
  }

  switch (opponentTeam) {
    case "Fluminense":
      console.log(FluminenseINFO[0]);
      console.log(FluminenseINFO[1]);
      console.log(FluminenseINFO[2]);
      console.log(FluminenseINFO[3]);
      break;
    case "Flamengo":
      console.log(FlamengoINFO[0]);
      console.log(FlamengoINFO[1]);
      console.log(FlamengoINFO[2]);
      console.log(FlamengoINFO[3]);
      break;
    case "Botafogo":
      console.log(BotafogoINFO[0]);
      console.log(BotafogoINFO[1]);
      console.log(BotafogoINFO[2]);
      console.log(BotafogoINFO[3]);
      break;
    case "Vasco":
      console.log(VascoINFO[0]);
      console.log(VascoINFO[1]);
      console.log(VascoINFO[2]);
      console.log(VascoINFO[3]);
      break;
    case "Corinthians":
      console.log(CorinthiansINFO[0]);
      console.log(CorinthiansINFO[1]);
      console.log(CorinthiansINFO[2]);
      console.log(CorinthiansINFO[3]);
      break;  
    // Adicione mais casos conforme necessário para outros times
  }

  // Adiciona texto ao parágrafo
  novoParagrafo.textContent = "Este é um novo parágrafo criado com JavaScript!";

  // Obtém o elemento com o ID "container"
  var container = document.getElementById("container");

  // Adiciona o parágrafo ao container
  container.appendChild(novoParagrafo);
}

document.addEventListener("DOMContentLoaded", () => {
  criarParagrafo(playerTeam, opponentTeam);
});
