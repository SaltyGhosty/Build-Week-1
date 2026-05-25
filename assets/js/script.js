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
      <h1>Benvenuto al tuo esame!</h1>
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

render();

function startQuiz() {
  currentScreen = "quiz";
  currentQuestion = 0;
  score = 0;
  render();
  startTimer();
}

function renderQuiz(container) {
  const domanda = QUESTIONS[currentQuestion];
  const risposte = [domanda.correct_answer, ...domanda.incorrect_answers];
  risposte.sort(() => Math.random() * 2);
  container.innerHTML = `
    <div class='quiz'>
      <div class='quiz-header'>
        <span class='question-counter'>Domanda ${currentQuestion} / ${TOTAL_QUESTIONS}</span>
      </div>
      <h2 class='question-text'>${domanda.question}</h2>
      <div class="answers">
        <button class="answer-btn" type="button">${domanda.correct_answer}</button>
      </div>
    </div>

`;
}

// document.querySelectorAll('.answer-btn').forEach((btn) => {
//   btn.addEventListener('click') => {
//     return ${domanda.correct_answer};
//   });
// };

function startTimer() {
  const timerElement = document.createElement("span");
  timerElement.className = "question-timer";
  app.appendChild(timerElement);

  let timeLeft = 20;

  timerElement.textContent = timeLeft;

  const timerId = setInterval(() => {
    timeLeft--;

    timerElement.textContent = timeLeft + "s";

    if (timeLeft <= 0) {
      clearInterval(timerId);
      timerElement.textContent = "Tempo Scaduto";
    }
  }, 1000);
}
