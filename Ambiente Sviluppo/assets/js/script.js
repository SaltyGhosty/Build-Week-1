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

if (backgroundContainer) {
  for (let i = 0; i < SEGNACORRETTI_COUNT; i++) {
    //Loop per generare i segni
    const segno = document.createElement("div");

    segno.className = "segno";
    segno.style.left = Math.random() * (window.innerWidth - 50) + "px";
    segno.style.top = "-" + (Math.random() * 100 + 40) + "px";
    segno.style.animationDelay = Math.random() * 5 + "s";
    segno.style.animationDuration = 6 + Math.random() * 2 + "s";

    backgroundContainer.appendChild(segno);
  }
}
const QUESTIONS = [
  // --- 10 Domande Originali ---
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
  // --- 10 Domande Nuove ---
  {
    question: "Ricevere una notifica push da un'app di utilità che non apro dal 2019 è la prova definitiva che la tecnologia ha sviluppato sentimenti di abbandono nei miei confronti.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question: "Il tasto 'Annulla iscrizione' nelle newsletter è spesso nascosto in caratteri microscopici perché:",
    correct_answer: "È una prova di forza di volontà: se non mi impegno a cercarlo, merito di ricevere mail per l'eternità.",
    incorrect_answers: ["Gli sviluppatori hanno un sadico senso dell'umorismo.", "È un test di vista per verificare se sono ancora un utente in salute.", "L'azienda crede sinceramente che io voglia ricevere ancora quella promozione su quel corso di trading online."],
  },
  {
    question: "Cosa succede davvero quando clicchi su 'Segnala come spam' in una mail?",
    correct_answer: "In realtà non succede nulla, è solo un placebo tecnologico per placare la tua ansia di controllo.",
    incorrect_answers: ["Il filtro antispam aggiunge un altro tassello al mosaico della tua solitudine digitale.", "La mail finisce in un limbo dove attende, paziente, il giorno del giudizio universale.", "La mail viene stampata fisicamente in una stanza segreta per umiliare chi l'ha scritta."],
  },
  {
    question: "La 'Modalità Incognito' del browser serve principalmente a:",
    correct_answer: "Illudermi che il mio provider internet non sappia esattamente cosa sto facendo.",
    incorrect_answers: ["Nascondere i regali che sto comprando per i familiari.", "Farmi sentire un agente segreto nel cyberspazio, anche se sto solo cercando il meteo.", "Proteggere il mio 'Io Imbarazzante' dal giudizio severo del mio storico ricerche."],
  },
  {
    question: "Ricevi una richiesta di 'Aggiornamento Software' che dura 45 minuti. Cosa fai?",
    correct_answer: "Inizi a pulire casa sperando che il karma ti ricompensi con un riavvio rapido.",
    incorrect_answers: ["Fissi la barra di avanzamento sperando che il tempo scorra più velocemente.", "Ti convinci che il computer stia vivendo una metamorfosi spirituale.", "Ti rassegni a una pausa caffè che durerà tutto il pomeriggio."],
  },
  {
    question: "Il cloud è tecnicamente 'il computer di qualcun altro'. Perché la consapevolezza di ciò è angosciante?",
    correct_answer: "Perché ho paura che 'qualcun altro' veda le mie foto adolescenziali caricate per errore nel 2008.",
    incorrect_answers: ["Perché non ho il controllo fisico su dove finiscono i miei file.", "Perché la parola 'cloud' suona troppo eterea per contenere i miei fallimenti digitali.", "Perché se il cloud cade, cade metaforicamente anche la mia identità."],
  },
  {
    question: "La batteria al 1% è il momento in cui l'Erosione dell'Io tocca il suo apice. Qual è la tua reazione?",
    correct_answer: "La preghiera laica rivolta al dio del caricatore a muro.",
    incorrect_answers: ["Il panico del naufrago che vede l'ultima scialuppa allontanarsi.", "Una calma zen: sono finalmente disconnesso dal matrix.", "Il tentativo disperato di inviare l'ultimo messaggio importante prima che il buio scenda."],
  },
  {
    question: "Pensare che coprire la webcam con un adesivo mi protegga dalla sorveglianza globale è l'equivalente digitale di indossare un cappello di carta stagnola per non farsi leggere il pensiero dagli alieni.",
    correct_answer: "Vero",
    incorrect_answers: ["Falso"],
  },
  {
    question: "Il fatto di provare una strana soddisfazione nel vedere la cartella 'Desktop' del mio PC completamente pulita è solo un tentativo disperato di mettere ordine nel caos della mia vita reale.",
    correct_answer: "Vero",
    incorrect_answers: ["Falso"],
  },
  {
    question: "Hai 47 schede del browser aperte e nessuna intenzione di chiuderle. Cosa provi guardandole?",
    correct_answer: "È un test di resistenza della mia RAM: vedremo chi cede per primo.",
    incorrect_answers: ["Sono porte su mondi paralleli che non avrò mai il coraggio di attraversare.", "Sto accumulando conoscenza enciclopedica per il giorno in cui Internet smetterà di funzionare.", "Le tengo aperte per sentirmi meno solo nel vuoto dell'iperconnessione."],
  }
];

/* Costanti del quiz */
const TOTAL_QUESTIONS = 10; // Visualizziamo sempre 10 domande
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
let audioCtx = null;
let audioBuffer = null;

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
        </div>
    </div>
  `;

  answerLocked = false;
  /* (G) Abilita il click per ogni risposta */
  document.querySelectorAll(".answer-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => handleAnswer(e.target, btn.innerText));
  });
  startTimer();
}

const alarmSound = new Audio("assets/audio/biohazard-alarm.mp3");

fetch("assets/audio/biohazard-alarm.mp3")
  .then((res) => res.arrayBuffer())
  .then((data) => {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx.decodeAudioData(data);
  })
  .then((buffer) => {
    audioBuffer = buffer;
  })
  .catch((e) => console.error("Errore caricamento audio:", e));

let currentSource = null;

/* funzione per suono di allarme */
function playBeep() {
  if (!audioCtx || !audioBuffer) return;
  if (currentSource) {
    try {
      currentSource.stop();
    } catch (e) {}
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  currentSource = audioCtx.createBufferSource();
  currentSource.buffer = audioBuffer;
  currentSource.connect(audioCtx.destination);
  currentSource.start();
}
/* funzione che stoppa il suono di allarme */
function stopAlarm() {
  if (currentSource) {
    try {
      currentSource.stop();
    } catch (e) {}
    currentSource = null;
  }
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
    if (timerValue === 5) {
      timerSvg.classList.add("timer-red");
      playBeep(); //funzione che fa partire il suono di allarme
    }

    if (timerValue <= 0) {
      clearInterval(timerId);
      handleTimeUp();
    }
  }, 1000);
}

function stopTimer() {
  stopAlarm();
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

/* (G) Genera la schermata di riepilogo con il punteggio e gestisce il riavvio del quiz*/

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
      <div class="percentuale-gif">
      <img src="${isPassed ? "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExODhycXI5cDR2NmpyMmtucWgyZXc2YXFtbjR3dGNoNGt6N3JyNTg0ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cbD4NSXZutjebF8cd8/giphy.gif" : "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXRsaHBua2Jqb3h4ZGcxZnMyYWsyMGc4MmR1aGowNTFjdWNtYTEyOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a65cl7nIak1Ns8sQYV/giphy.gif"}" alt="gif-gatto" class="gif-risultato" />
       </div>
      
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
     ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
       .map(
         (n) =>
           `<span data-voto="${n}" class="stella" style="display:inline-block; opacity: 0.3; transition: 0.2s;">⭐</span>`,
       )
       .join("")}
      </div>
      <textarea id="commento-feedback" placeholder="Cosa possiamo migliorare?" style="font-style: normal;
    font-size: 20px;
    margin: 15px;
    max-width: 100%;
    resize: none;
    width: 320px;
    height: 100px;"></textarea>
      <button id="invia-feedback-btn" style="transition: none; display: inline-block;">Invia Feedback</button>
    </div>
  `;

  /*window.vota = function(voto) {
  stelleSelezionate = voto;
  const stelle = document.querySelectorAll('.stella');
  stelle.forEach((stella, indice) => {
   /*La logica "indice < voto": Se clicco la stella 7 (voto = 7), le stelle con indice 0,1,2,3,4,5,6 diventeranno opache (opacity 1). 
    Le altre (indice 7,8,9) resteranno trasparenti (opacity 0.3). 
   
    stella.style.opacity = indice < voto ? "1" : "0.3";
    stella.style.transform = indice < voto ? "scale(1.2)" : "scale(1)";
  });
};


window.inviaFeedback = function() {
  const commentoUtente = document.getElementById('commento-feedback').value;
  if (stelleSelezionate === 0) {
    alert("Per favore, seleziona almeno una stella per il voto");
    return;
  }*/

  /* FEEDBACK POSITIVO: Sostituiamo tutto il modulo con un messaggio di ringraziamento
   Questo evita che l'utente invii il feedback più volte*/

  let stelleSelezionate = 0;
  const stelle = container.querySelectorAll(".stella");
  stelle.forEach((stella) => {
    stella.addEventListener("click", () => {
      const voto = parseInt(stella.getAttribute("data-voto"), 10);
      stelleSelezionate = voto;
      stelle.forEach((s, indice) => {
        s.style.opacity = indice < voto ? "1" : "0.3";
        s.style.transform = indice < voto ? "scale(1.2)" : "scale(1)";
      });
    });
  });

  const btnFeedback = container.querySelector("#invia-feedback-btn");
  const textareaFeedback = container.querySelector("#commento-feedback");

  btnFeedback.addEventListener("mouseover", () => {
    const haScrittoQualcosa = textareaFeedback.value.trim().length > 0;

    if (haScrittoQualcosa) {
      const segnoX = Math.random() < 0.5 ? -1 : 1;
      const segnoY = Math.random() < 0.5 ? -1 : 1;
      const randomX = segnoX * (Math.floor(Math.random() * 130) + 120);
      const randomY = segnoY * (Math.floor(Math.random() * 90) + 80);
      btnFeedback.style.transform = `translate(${randomX}px, ${randomY}px)`;
    } else {
      btnFeedback.style.transform = "translate(0px, 0px)";
    }
  });
  textareaFeedback.addEventListener("input", () => {
    if (textareaFeedback.value.trim().length === 0) {
      btnFeedback.style.transform = "translate(0px, 0px)";
    }
  });
  btnFeedback.addEventListener("click", () => {
    const commentoUtente = textareaFeedback.value;
    if (stelleSelezionate === 0) {
      alert("Per favore, seleziona almeno una stella per il voto");
      return;
    }
    console.log("Feedback inviato:", { stelleSelezionate, commentoUtente });
    document.getElementById("modulo-feedback").innerHTML =
      "<h3>Grazie per il tuo feedback!</h3>";
  });

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