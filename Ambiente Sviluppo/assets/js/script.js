/*
  REGOLE
  - Codice in JavaScript moderno: solo const/let, mai var.
  - DOM: usa querySelector / querySelectorAll.
  - Eventi: usa addEventListener (mai onclick inline nell'HTML).
  - Pattern: stato → render → eventi.
*/

/*
  Array di domande.
  Ogni question è un object con:
   - question: testo della domanda
   - correct_answer: la risposta corretta (string)
   - incorrect_answers: array di risposte sbagliate (string[])
*/

const SEGNACORRETTI_COUNT = 100; //Quanti segni generare
const backgroundContainer = document.getElementById("container"); //Contenitore segni

for (let i = 0; i < SEGNACORRETTI_COUNT; i++) {
  //Loop per generare i segni
  const segno = document.createElement("div");

  segno.className = "segno";
  segno.style.left = Math.random() * (window.innerWidth - 50) + "px";
  segno.style.top = "-" + (Math.random() * 100 + 40) + "px";
  segno.style.animationDelay = Math.random() * 5 + "s";
  segno.style.animationDuration = 6 + Math.random() * 2 + "s";

  container.appendChild(segno);
}

const QUESTIONS = [
  {
    question: "Cliccare su 'Accetto i termini' senza leggerli è la mia firma su un patto col diavolo digitale in cambio di comodità.",
    correct_answer: "Vero",
    incorrect_answers: ["Falso"],
  },
  {
    question: "Il sistema che mi obbliga a cambiare password ogni mese lo fa esclusivamente perché ha a cuore la mia salute mentale e il mio benessere interiore.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question: "Il sito ti avvisa: 'La password deve essere diversa dalla precedente'. Qual è la tua strategia di sopravvivenza?",
    correct_answer: "Cambio il carattere speciale da ! a ? (la domanda riflette il mio stato d'animo).",
    incorrect_answers: [
      "Aggiungo un '1' alla fine della precedente.",
      "Inizio a guardare oggetti nella stanza in cerca di ispirazione filosofica.",
      "Abbandono il tentativo e decido che non ho davvero bisogno di quell'account.",
    ],
  },
  {
    question: "Hai cliccato su 'Password dimenticata'. Qual è lo stadio emotivo predominante?",
    correct_answer: "Negazione ('L'avevo scritta da qualche parte, lo giuro!')",
    incorrect_answers: [
      "Rabbia ('Ma come, l'ho creata ieri!')",
      "Accettazione ('Il mio Io digitale è morto, sono libero')",
      "Speranza ('Forse stavolta l'email di recupero arriva davvero')",
    ],
  },
  {
    question: "Domanda di sicurezza: 'Nome del tuo primo animale domestico'. Perché questa domanda è un attacco alla tua privacy?",
    correct_answer: "Perché il mio criceto non aveva un nome, era solo 'Criceto', e questo mi fa sentire poco originale.",
    incorrect_answers: [
      "Perché rivela dettagli intimi della mia infanzia che non voglio condividere con un server.",
      "Perché la risposta è troppo ovvia per gli hacker e troppo complessa per il mio Io attuale.",
      "Perché mi costringe a ricordare quanto ero felice prima di diventare un adulto che dimentica le password.",
    ],
  },
  {
    question: "L'autenticazione a due fattori ti chiede un codice inviato sul telefono. Il telefono è in un'altra stanza. Cosa fai?",
    correct_answer: "Cerchi di indovinare il codice (probabilità di successo: 0,0001%).",
    incorrect_answers: [
      "Ti alzi e lo prendi, sentendoti un atleta impegnato in una maratona.",
      "Rimani seduto fissando il vuoto, rassegnato alla sconfitta digitale.",
      "Decidi che quel servizio non ti serve più, la tua vita era più semplice senza.",
    ],
  },
  {
    question: "Usi la stessa password per il conto in banca e per l'app delle ricette. Qual è il rischio psicologico principale?",
    correct_answer: "Nessuno, tanto nessuno hackererebbe un conto in banca vuoto.",
    incorrect_answers: [
      "Che gli hacker rubino la mia segreta ricetta del tiramisù.",
      "Che il sistema bancario mi giudichi per le mie abitudini alimentari compulsive.",
      "La fine della distinzione tra 'Io Produttivo' e 'Io Edonista'.",
    ],
  },
  {
    question: "Il Password Manager ti promette la salvezza. Perché è ironico?",
    correct_answer: "Tutte le precedenti.",
    incorrect_answers: [
      "Perché devo ricordare una Master Password, che finirò inevitabilmente per dimenticare.",
      "Perché mi fido di un software più di quanto mi fidi della mia stessa memoria.",
      "Perché è solo un altro account di cui devo gestire la password.",
    ],
  },
  {
    question: "Il test CAPTCHA che mi chiede di identificare i semafori è stato progettato per premiare la mia intelligenza superiore rispetto alle macchine.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question: "Qual è la definizione di 'Password Perfetta' secondo la psicologia dell'Erosione dell'Io?",
    correct_answer: "Non esiste, l'unica password perfetta è quella che non serve a nulla perché abbiamo smesso di accedere.",
    incorrect_answers: [
      "Una che contiene il nome di un ex, perché è indelebile.",
      "Una che non ricordi, ma che il computer ricorda per te.",
      "Una che è un'imprecazione mascherata da cifre.",
    ],
  },
];

/* Costanti del quiz */
const TOTAL_QUESTIONS = QUESTIONS.length;
const PASS_THRESHOLD = 60; // percentuale minima per "Promosso"
const FEEDBACK_DELAY = 1500; // ms di attesa dopo risposta prima di avanzare
const TIMER_DURATION = 20; // secondi per ogni domanda

/* Stato globale */
let currentScreen = "welcome"; // "welcome" | "quiz" | "results"
let currentQuestion = 0;
let score = 0;
let timerId = null;
let timerValue = TIMER_DURATION;
let answerLocked = false;
let shuffledQuestions = [];

/* SCRIVI QUI LE TUE FUNZIONI:
   - render() che chiama renderWelcome / renderQuiz / renderResults in base a currentScreen
   - renderWelcome() per la schermata iniziale con button Inizia
   - renderQuiz() per la domanda corrente con i button risposta + counter + timer
   - renderResults() per la schermata finale con percentuale + barre + verdetto
   - startTimer() / stopTimer() per il countdown
   - handleAnswer(button, answer) per il click su una risposta
   - handleTimeUp() per il tempo scaduto
   - advance() per andare alla domanda successiva o ai risultati
*/
function render() {
  const app = document.getElementById("app");
  switch (currentScreen) {
    case "welcome":
      renderWelcome(app);
      break;
    case "quiz":
      renderQuiz(app);
      break;
    case "results":
      renderResults(app);
      break;
  }
}

function renderWelcome(container) {
  container.innerHTML = `
    <div class="welcome">
      <h1>Benvenuto al tuo esame</h1>
      <p>Una serie di 10 domande sul mondo dell'informatica e del web. Per ogni domanda hai 20 secondi di tempo.</p>
      
      <ul>
        <li>Ogni domanda è a tempo e può ricevere una sola risposta.</li>
        <li>Una volta cliccata una risposta, la domanda è chiusa.</li>
        <li>Il quiz dura circa 3 minuti</li>
      </ul>
      
      <button type="button" id="start-btn">Inizia</button>
    </div>
  `;
  document.getElementById("start-btn").addEventListener("click", startQuiz);
}

function startQuiz() {
  currentScreen = "quiz";
  currentQuestion = 0;
  score = 0;
  shuffledQuestions = [...QUESTIONS].sort(() => Math.random() - 0.5);
  render();
}

function renderQuiz(container) {
  const domanda = shuffledQuestions[currentQuestion];
  const risposte = [domanda.correct_answer, ...domanda.incorrect_answers].sort(
    () => Math.random() - 0.5,
  );

  container.innerHTML = `
    <div class='quiz'>
      <div class='quiz-header'>
        <span class='question-counter'>Domanda ${currentQuestion + 1} / ${TOTAL_QUESTIONS}</span>
        <svg viewBox= "0 0 100 100" class="timer-svg" id= "timer-display">
        <circle class="timer-bg" cx="50" cy="50" r="45" />
        <circle class="timer-progress" cx="50" cy="50" r="45" 
        stroke-dasharray="282.74" stroke-dashoffset="0" />
        <text x="50" y="55" text-anchor="middle" class="timer-text">20s</text>
        </svg>
      </div>
      <h2 class='question-text'>${domanda.question}</h2>
      <div class="answers-grid">
        ${risposte.map((ans) => `<button class="answer-btn" type="button">${ans}</button>`).join("")}
    
  `;


  answerLocked = false;
  /* (G) Abilita il click per ogni risposta */
  document.querySelectorAll(".answer-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => handleAnswer(e.target, btn.innerText));
  });
  startTimer();
}

function startTimer() {
  const timerSvg = document.getElementById("timer-display");
  timerValue = TIMER_DURATION;

  timerSvg.classList.remove("timer-red");

  const progressCircle = timerSvg.querySelector(".timer-progress");
  const textElement = timerSvg.querySelector(".timer-text");
  const circumference = 2 * Math.PI * 45; // 282.74
  progressCircle.style.strokeDashoffset = "0";
  textElement.textContent = timerValue + "s";

  if (timerId)
    clearInterval(
      timerId,
    ); /* G) Reset del timer precedente e avvia uno nuovo */

  timerId = setInterval(() => {
    timerValue--;
    textElement.textContent = timerValue + "s";

    const offset = circumference * (1 - timerValue / TIMER_DURATION);
    progressCircle.style.strokeDashoffset = offset;

    /* (G) Cambio colore in rosso se mancano 5 secondi o meno */
    if (timerValue <= 5) {
      timerSvg.classList.add("timer-red");
    }

    if (timerValue <= 0) {
      clearInterval(timerId);
      handleTimeUp();
    }
  }, 1000);
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function handleTimeUp() {
  if (answerLocked) return;
  answerLocked = true;
  stopTimer();

  const correctAnswer = shuffledQuestions[currentQuestion].correct_answer;
  document.querySelectorAll(".answer-btn").forEach((btn) => {
    btn.disabled = true;
    if (btn.innerText === correctAnswer) {
      btn.classList.add("correct");
    }
  });
  setTimeout(() => advance(), FEEDBACK_DELAY);
}

/* (G) Verifica se la risposta è corretta aggiornando il punteggio*/
function handleAnswer(button, answer) {
  if (answerLocked) return;
  answerLocked = true;
  stopTimer();

  const correctAnswer = shuffledQuestions[currentQuestion].correct_answer;
  if (answer === correctAnswer) {
    button.classList.add("correct");

    score++;
  } else {
    button.classList.add("wrong");
    document.querySelectorAll(".answer-btn").forEach((btn) => {
      if (btn.innerText === correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }
  document.querySelectorAll(".answer-btn").forEach((btn) => {
    btn.disabled = true;
  });
  setTimeout(() => {
    advance();
  }, FEEDBACK_DELAY);
}

/* (G) Funzione per passare alla prossima domanda gestendo l'avanzamento logico del quiz */
function advance() {
  currentQuestion++;
  if (currentQuestion >= TOTAL_QUESTIONS) {
    currentScreen = "results";
  } else {
    currentScreen = "quiz";
  }
  render();
}


/* (G) Genera la schermata di riepilogo con il punteggio e gestisce il riavvio del quiz */
function renderResults(container) {
  const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);
  const isPassed = percentage >= PASS_THRESHOLD;
  const wrongAnswer = TOTAL_QUESTIONS - score;
  const incorrectPercentage = (wrongAnswer / TOTAL_QUESTIONS) * 100;


  container.innerHTML = `
    <div class="results">
      <h1 class="titoloResults">Risultati</h1>
      <p>Hai completato il quiz.</p>

      <h2 class="titoloPercentuale">${percentage}%</h2>
      
      <h2 class="${isPassed ? "testo-promosso" : "testo-bocciato"}">
        ${isPassed ? "Promosso!" : "Bocciato"}
      </h2>
      
      <div class="resultBar">
        <div style="font-weight: bold; color:#666A7B;">Corrette</div>
        <div class="progressBarC">
          <div class="progressBarT" id="bar-c" style="width: 0%"></div>
        </div>
        <div class="numeriBarra">${score}/${TOTAL_QUESTIONS}</div>
      </div>
      
      <div class="resultBar">
        <div style="font-weight: bold; color:#666A7B;">Sbagliate</div>
        <div class="progressBarD">
          <div class="progressBarF" id="bar-f" style="width: 0%"></div>
        </div>
        <div class="numeriBarra">${wrongAnswer}/${TOTAL_QUESTIONS}</div>
      </div>
      <button type="button" id="restart-btn">Ricomincia</button>
    </div>
     
    
    <div class="result" id="modulo-feedback" style="padding: 20px; display: flex; flex-direction: column; align-items:center;">
    <h3>Com'è andato il quiz?</h3>
    <div class="stelle" style="font-size: 24px; cursor: pointer">
     ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => 
      `<span onclick="vota(${n})" class="stella" style="display:inline-block; transition: 0.2s;">⭐</span>`).join('')}
  
      </div>
      <textarea id="commento-feedback" placeholder="Cosa possiamo migliorare?" style="margin: 15px;"></textarea>
      <button onclick="inviaFeedback()">Invia Feedback</button>
    </div>
  `;
  
let stelleSelezionate = 0;

window.vota = function(voto) {
  stelleSelezionate = voto;
  const stelle = document.querySelectorAll('.stella');
  stelle.forEach((stella, indice) => {
    stella.style.opacity = indice < voto ? "1" : "0.3";
    stella.style.transform = indice < voto ? "scale(1.2)" : "scale(1)";
  });
};


window.inviaFeedback = function() {
  const commentoUtente = document.getElementById('commento-feedback').value;
  if (stelleSelezionate === 0) {
    alert("Per favore, seleziona almeno una stella per il voto");
    return;
  }
  console.log("Feedback inviato:", { stelleSelezionate, commentoUtente });
  document.getElementById('modulo-feedback').innerHTML = "<h3>Grazie per il tuo feedback!</h3>";

};


  /* (G) Il browser attende 100ms per mostrare lo stato iniziale (0%), 
  così che l'animazione di riempimento sia visibile invece di apparire istantanea */
  setTimeout(() => {
    document.getElementById("bar-c").style.width = percentage + "%";
    document.getElementById("bar-f").style.width = incorrectPercentage + "%";
  }, 100);

  // Listener per il bottone di riavvio
  document.getElementById("restart-btn").addEventListener("click", () => {
    currentScreen = "welcome";
    render();
  });
}

render();