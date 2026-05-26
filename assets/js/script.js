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
const QUESTIONS = [
  {
    question: "Cosa significa l'acronimo CPU?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    question:
      "In Java, quale keyword si usa per impedire che una variabile venga modificata?",
    correct_answer: "final",
    incorrect_answers: ["static", "private", "public"],
  },
  {
    question: "Il logo di Snapchat è una campana.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question:
      "I puntatori sono stati introdotti in C++ e non c'erano nel linguaggio C originale.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question:
      "Qual è il formato immagine più usato per i loghi nel database di Wikimedia?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    question: "Cosa significa l'acronimo CSS?",
    correct_answer: "Cascading Style Sheets",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheets",
      "Computer Style Sheets",
    ],
  },
  {
    question: "Qual è il nome in codice del sistema operativo Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    question: "Qual era il limite originale di caratteri di un Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    question: "Linux è stato creato come alternativa a Windows XP.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question:
      "Quale linguaggio di programmazione condivide il nome con un'isola dell'Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
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
  render();
}

function renderQuiz(container) {
  const domanda = QUESTIONS[currentQuestion];
  const risposte = [domanda.correct_answer, ...domanda.incorrect_answers].sort(() => Math.random() - 0.5);
  
  container.innerHTML = `
    <div class='quiz'>
      <div class='quiz-header'>
        <span class='question-counter'>Domanda ${currentQuestion + 1} / ${TOTAL_QUESTIONS}</span>
        <span class='question-timer' id='timer-display'>20s</span>
      </div>
      <h2 class='question-text'>${domanda.question}</h2>
      <div class="answers-grid">
        ${risposte.map(ans => `<button class="answer-btn" type="button">${ans}</button>`).join('')}
      </div>
    </div>
  `;
  /* (G) Abilita il click per ogni risposta */
  document.querySelectorAll('.answer-btn').forEach((btn) => {
    btn.addEventListener('click', () => handleAnswer(btn.innerText));
  });
  startTimer();
}


function startTimer() {
  /* (G) Reset del timer */
  const timerElement = document.getElementById("timer-display");
  timerValue = TIMER_DURATION;
  
  /* (G) Reset colore timer all'inizio di ogni domanda */
  timerElement.classList.remove('timer-red');
  
  if (timerId) clearInterval(timerId); /* G) Reset del timer precedente e avvia uno nuovo */

  timerId = setInterval(() => {
    timerValue--;
    timerElement.textContent = timerValue + 's';

    /* (G) Cambio colore in rosso se mancano 5 secondi o meno */
    if (timerValue <= 5) {
        timerElement.classList.add('timer-red');
    }

    if (timerValue <= 0) {
      clearInterval(timerId);
      handleAnswer(null);
    }
  }, 1000);
}

/* (G) Verifica se la risposta è corretta aggiornando il punteggio*/
function handleAnswer(answer) {
  clearInterval(timerId);
  if (answer === QUESTIONS[currentQuestion].correct_answer) {
    score++;
  }
  advance();
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
  const percentage = (score / TOTAL_QUESTIONS) * 100;
  const isPassed = percentage >= PASS_THRESHOLD;
  
  container.innerHTML = `
    <div class="results">
      <h1>Risultati</h1>
      <p>Hai risposto correttamente a <strong>${score}</strong> su ${TOTAL_QUESTIONS} domande.</p>
      <h2>${isPassed ? "Promosso!" : "Bocciato"}</h2>
      <p>Percentuale: ${percentage}%</p>
      <button type="button" id="restart-btn">Ricomincia</button>
    </div>
  `;
  
  document.getElementById("restart-btn").addEventListener("click", () => {
    currentScreen = "welcome";
    render();
  });
}

render();

/* (G) Verifica se la risposta è corretta aggiornando il punteggio*/
function handleAnswer(answer) {
  clearInterval(timerId);
  if (answer === QUESTIONS[currentQuestion].correct_answer) {
    score++;
  }
  advance();
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
  const percentage = (score / TOTAL_QUESTIONS) * 100;
  const isPassed = percentage >= PASS_THRESHOLD;
  
  container.innerHTML = `
    <div class="results">
      <h1>Risultati</h1>
      <p>Hai risposto correttamente a <strong>${score}</strong> su ${TOTAL_QUESTIONS} domande.</p>
      <h2>${isPassed ? "Promosso!" : "Bocciato"}</h2>
      <p>Percentuale: ${percentage}%</p>
      <button type="button" class="restart-btn" id="restart-btn">Ricomincia</button>
    </div>
  `;
  
  document.getElementById("restart-btn").addEventListener("click", () => {
    currentScreen = "welcome";
    render();
  });
}

render();