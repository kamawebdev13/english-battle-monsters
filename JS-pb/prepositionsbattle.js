

/*VARIABLES GENERAL DEL JUEGO*/

/*STATUS DEL JUEGO*/
let currentLevel = 1
let gameStatus = "wait"
let status = ["wait", "level-start", "question", "transition", "ended"]/*solo referencia*/
let isClickable = true
let scores = []
const STORAGE_KEY = "prepoBattleScores"

/* VARIABLE ARRAY OBJETO CON LAS PREGUNTAS Y DATOS COMPLEMENTARIOS DE NIVEL UNO*/
const questionsLevelOne = [
  {
    src: "prepositions-battles/images/questions/office-coffee-interior-design__01.webp",
    alt: "office-coffee-interior-design",
    question: "The book is ___ the table.",
    options: ["in", "on", "at"],
    correct: "on",
    sentence: "The book is on the table."

  },
  {
    src: "prepositions-battles/images/questions/woman-walking-in-Madrid__02.webp",
    alt: "woman-walking-in-Madrid",
    question: "She lives ___ Madrid.",
    options: ["in", "on", "at"],
    correct: "in",
    sentence: "She lives in Madrid."
  },
  {
    src: "prepositions-battles/images/questions/woman-checking-her-watch__03.webp",
    alt: "woman-checking-her-watch",
    question: "We meet ___ 5 o'clock.",
    options: ["in", "on", "at"],
    correct: "at",
    sentence: "We meet at 5 o'clock."
  },
  {
    src: "prepositions-battles/images/questions/cat-sitting-in-a-box__04.webp",
    alt: "cat-sitting-in-a-box",
    question: "The cat is ___ the box.",
    options: ["in", "on", "into"],
    correct: "in",
    sentence: "The cat is in the box"

  },
  {
    src: "prepositions-battles/images/questions/man-putting-his-phone-into-his-pocket__05.webp",
    alt: "man-putting-his-phone-into-his-pocket",
    question: "He put the phone ___ his pocket.",
    options: ["in", "into", "on"],
    correct: "into",
    sentence: "He put the phone into his pocket"

  }
]

const questionsLevelTwo = [
  {
    src: "prepositions-battles/images/questions/level2-question-01.webp",
    alt: "people-waiting-bus-stop",
    question: "They are waiting ___ the bus stop.",
    options: ["at", "in", "on"],
    correct: "at",
    sentence: "They are waiting at the bus stop."
  },
  {
    src: "prepositions-battles/images/questions/level2-question-02.webp",
    alt: "keys-table-morning",
    question: "I left my keys ___ the table this morning.",
    options: ["on", "in", "at"],
    correct: "on",
    sentence: "I left my keys on the table this morning."
  },
  {
    src: "prepositions-battles/images/questions/level2-question-03.webp",
    alt: "man-arriving-airport",
    question: "He arrived ___ the airport early.",
    options: ["at", "in", "to"],
    correct: "at",
    sentence: "He arrived at the airport early."
  },
  {
    src: "prepositions-battles/images/questions/level2-question-04.webp",
    alt: "children-playing-garden",
    question: "The children are playing ___ the garden.",
    options: ["in", "at", "on"],
    correct: "in",
    sentence: "The children are playing in the garden."
  },
  {
    src: "prepositions-battles/images/questions/level2-question-05.webp",
    alt: "picture-wall-living-room",
    question: "There is a picture hanging ___ the wall.",
    options: ["on", "in", "at"],
    correct: "on",
    sentence: "There is a picture hanging on the wall."
  }
]
/*VARIABLES CONFIGURACION DE NIVELES UNO Y DOS*/
const levelConfigs = {
  1: {
    questions: questionsLevelOne,
    timePerQuestion: 10,
    sentenceAudios: [
      'prepositions-battles/sounds/questions/question-01.mp3',
      'prepositions-battles/sounds/questions/question-02.mp3',
      'prepositions-battles/sounds/questions/question-03.mp3',
      'prepositions-battles/sounds/questions/question-04.mp3',
      'prepositions-battles/sounds/questions/question-05.mp3'
    ]
  },
  2: {
    questions: questionsLevelTwo,
    timePerQuestion: 8,
    sentenceAudios: [
      'prepositions-battles/sounds/questions/level2-question-01.mp3',
      'prepositions-battles/sounds/questions/level2-question-02.mp3',
      'prepositions-battles/sounds/questions/level2-question-03.mp3',
      'prepositions-battles/sounds/questions/level2-question-04.mp3',
      'prepositions-battles/sounds/questions/level2-question-05.mp3'
    ]
  }
}

/*CONTROL DE LAS PREGUNTAS*/
let currentQuestionIndex = 0
const totalQuestions = 5
let currentQuestion
let hasAnswered = false
let correctAnswer
let correctAnswerText
let activeQuestions = []

/*FEEDBACK*/
let showingFeedback = false
const feedbackDuration = 1500
let feedbackBlock

/*CONTROL DEL TIEMPO*/
let timePerQuestion = 10
let timeLeft
let timerInterval
let timePercentage = 100

/*MONSTERS PUNTOS*/
let prepoPoints = 0
let meanerPrepoPoints = 0

/*MONSTERS PUNTOS TEXTOS*/
let prepoPointsText
let meanerPrepoPointsText

/*MONSTERS CRECIMIENTO*/
const BASE_SCALE = 1.5
let prepoGrowth = 0
let meanerGrowth = 0

/*SONIDOS*/
let soundPlayButton
let soundLevelStart
let soundCorrect
let soundWrong
let soundMonsterGrow
let soundMonsterShrink
let soundWinLevel
let soundLoseLevel
let soundCorrectSentence
let soundTimerCountdown
let sentenceAudioPaths
let sentenceSounds
let levelVoiceAudios = {}


/*DOM VARIABLES*/
let btnPlayGame
let instructionsContainer
let levelText
let gameArea
let gameAreaBlock
let containerTopQuestions
let timeBarBlock
let levelOneEnded = false



/*BARRA DEL TIEMPO*/
let timeCounter
let timeFiller

/* MONSTERS INFO*/
let prepoMonster
let meanerPrepoMonster
let prepoInfo
let meanerPrepoInfo
const prepoName = "Prepo"
const meanerPrepoName = "Meaner"

/*MONSTERS SPRITES*/
let imagePrepoMonster
let imageMeanerPrepoMonster

/*DATOS DE PREGUNTAS*/
let questionText
let questionImage
let questionImageAlt
let answersButtons
let questionBlock


/*RESPONSIVE */
let isMobile = false
let isTablet = false

/*FUNCIONES*/
/*FUNCION CARGAR NIVELES*/
const loadLevel = (levelNumber) => {
  const config = levelConfigs[levelNumber]
  if (!config) return

  activeQuestions = config.questions
  sentenceAudioPaths = config.sentenceAudios
  timePerQuestion = config.timePerQuestion

  sentenceSounds = sentenceAudioPaths.map(src => {
    const audio = new Audio(src)
    audio.preload = "auto"
    audio.volume = 0.6
    return audio
  })

  currentQuestionIndex = 0
}

/*FUNCION PARA RESETEAR JUEGO*/
const resetGameState = () => {

  gameStatus = "wait"
  prepoPoints = 0
  meanerPrepoPoints = 0
  prepoGrowth = 0
  meanerGrowth = 0
  hasAnswered = false
  showingFeedback = false
  currentQuestionIndex = 0
  timeLeft = timePerQuestion
  timePercentage = 100
  isClickable = true

}
/*FIN FUNCION PARA RESETEAR JUEGO*/

/*INICIO FUNCION PARA INICIAR JUEGO*/

const initGame = () => {
  /*CAPTURA DEL DOM DE LOS ELEMENTOS DEL JUEGO*/
  window.addEventListener('DOMContentLoaded', () => {

    /*BUTTON PLAY*/
    btnPlayGame = document.getElementById("btn-play-game")

    /*GAME INSTRUCTIONS CONTAINER*/
    instructionsContainer = document.getElementById("game-instructions")

    /*GAME LEVEL TEXT*/
    levelText = document.getElementById("level-one-text")

    /*GAME AREA */
    gameArea = document.getElementById("game-area")

    /*GAME AREA BLOCK*/
    gameAreaBlock = document.getElementById("game-area__block")

    /*CONTADOR DE TIEMPO*/
    timeCounter = document.getElementById("time")

    /*BARRA INTERIOR DE CONTADOR TIEMPO*/
    timeFiller = document.getElementById("time-filler")

    /*BARRA VERTICAL DE CONTADOR TIEMPO*/
    timeBarBlock = document.getElementById("time-bar__block")

    /*FUNCION PARA ACTUALIZACION DE LOS PUNTOS DE LOS MONSTRUOS EN EL ELEMENTO INFO*/
    const updateMonsterInfo = () => {

      if (!prepoPointsText || !meanerPrepoPointsText) return
      prepoPointsText.textContent = prepoPoints
      meanerPrepoPointsText.textContent = meanerPrepoPoints
    }
    /*INICIALIZACION DE LOS ARCHIVOS DE SONIDOS DEL JUEGO*/

    /*SONIDO DEL BOTON AL INCIAR EL JUEGO*/
    soundPlayButton = new Audio('prepositions-battles/sounds/actions/play-button.mp3');
    soundPlayButton.volume = 0.7
    soundPlayButton.preload = "auto"

    /*SONIDO AL INICIAR EL NIVEL*/
    soundLevelStart = new Audio('prepositions-battles/sounds/actions/level-start.mp3');
    soundLevelStart.volume = 0.7
    soundLevelStart.preload = "auto"

    /* SONIDO PREGUNTA CORRECTA*/
    soundCorrect = new Audio('prepositions-battles/sounds/actions/correct.mp3');
    soundCorrect.volume = 0.6;
    soundCorrect.preload = "auto";
    /* SONIDO PREGUNTA INCORRECTA*/
    soundWrong = new Audio('prepositions-battles/sounds/actions/wrong.mp3');
    soundWrong.volume = 0.6;
    soundWrong.preload = "auto";
    /*SONIDO DE MONSTRUO CRECE*/
    soundMonsterGrow = new Audio('prepositions-battles/sounds/actions/monster-grow.mp3');
    soundMonsterGrow.volume = 0.6;
    soundMonsterGrow.preload = "auto";
    /*SONIDO DE MONSTRUO SE REDUCE*/
    soundMonsterShrink = new Audio('prepositions-battles/sounds/actions/monster-shrink.mp3');
    soundMonsterShrink.volume = 0.6;
    soundMonsterShrink.preload = "auto";
    /*SONIDO NIVEL GANADOR*/
    soundWinLevel = new Audio('prepositions-battles/sounds/actions/win-level.mp3');
    soundWinLevel.volume = 0.7;
    soundWinLevel.preload = "auto";
    /*SONIDO NIVEL PERDEDOR*/
    soundLoseLevel = new Audio('prepositions-battles/sounds/actions/lose-level.mp3');
    soundLoseLevel.volume = 0.7;
    soundLoseLevel.preload = "auto";
    /*SONIDO DE LA BARRA DEL TIEMPO*/
    soundTimerCountdown = new Audio('prepositions-battles/sounds/actions/timer-countdown.mp3');
    soundTimerCountdown.volume = 0.5;
    soundTimerCountdown.preload = "auto";
    /*SONIDO DE RESPUESTAS CORRECTAS*/

    sentenceAudioPaths = [
      'prepositions-battles/sounds/questions/question-01.mp3',
      'prepositions-battles/sounds/questions/question-02.mp3',
      'prepositions-battles/sounds/questions/question-03.mp3',
      'prepositions-battles/sounds/questions/question-04.mp3',
      'prepositions-battles/sounds/questions/question-05.mp3'
    ];

    /*CARGARMOS SONIDO  DE RESPUESTAS CORRECTAS*/
    sentenceSounds = sentenceAudioPaths.map(src => {
      const audio = new Audio(src)
      audio.preload = "auto"
      audio.volume = 0.6
      return audio
    })
    /*OBTENER SCORES DE PARTIDAS*/
    const savedScores = localStorage.getItem(STORAGE_KEY)

    if (savedScores) {
      scores = JSON.parse(savedScores)
    } else {
      scores = []
    }

    resetGameState() /*LLAMADO DE RESETEO JUEGO*/

    /*INTERACCION DE LOS ELEMENTOS DEL JUEGO*/

    /*INICIO FUNCION PARA LLAMADO DEL BOTON PLAY*/
    const handlePlayClick = async (e) => {
      e.preventDefault()
      if (gameStatus !== "wait") return

      /* DESBLOQUEO DE AUDIO UNA SOLA VEZ*/
      try {
        await soundPlayButton.play()
        soundPlayButton.pause()
        soundPlayButton.currentTime = 0
      } catch (e) {
        console.warn("Audio no puede reproducirse", e)
      }
      /* INICIALIZACIÓN DE LEVEL AUDIOS UNA SOLA VEZ*/
      levelVoiceAudios = {
        1: new Audio('prepositions-battles/sounds/actions/level-start.mp3'),
        2: new Audio('prepositions-battles/sounds/actions/level-two.mp3')
      }

      /*SONIDO DEL BOTON*/
      soundPlayButton.currentTime = 0
      soundPlayButton.play()

      gameStatus = "level-start" //STATUS DEL JUEGO
      isClickable = false // EVITA PROBLEMAS CON PUNTERO

      /*OCULTA INSTRUCCIONES DEL JUEGO*/
      hideInstructions()
    }

    btnPlayGame.addEventListener("click", handlePlayClick)/*ACTIVA BOTON Y FUNCION LLAMADO DEL BOTON PLAY*/
    /*FIN FUNCION PARA LLAMADO DEL BOTON PLAY*/

    /*INICIO FUNCION OCULTA INSTRUCCIONES DEL JUEGO*/
    const hideInstructions = () => {

      if (gameStatus !== "level-start") return

      instructionsContainer.style.pointerEvents = "none" /*EVITA CUALQUIER EVENTO CON EL PUNTERO DEL RATON*/
      instructionsContainer.classList.add("fade-out") /*OCULTA GRADUALMENTE LAS INSTRUCCIONES DEL JUEGO */

      setTimeout(() => {
        instructionsContainer.style.display = "none" /*TIEMPO DE ESPERA PARA OCULTAR LAS INSTRUCCIONES*/
        showLevelText() /*LLAMADO DE LA SIG. FUNCION*/
      }, 800)
    }
    /*FIN FUNCION OCULTA INSTRUCCIONES DEL JUEGO*/

    /* INICIO FUNCION MUESTRA TEXTO Y SONIDO DEL NIVEL UNO Y DOS */

    const showLevelText = () => {
      if (gameStatus !== "level-start") return

      levelText.style.pointerEvents = "none"
      levelText.textContent = `LEVEL ${currentLevel}`
      gameAreaBlock.classList.toggle("level-2", currentLevel === 2)
      levelText.parentElement.classList.add("level-text--active")

      const levelAudio = levelVoiceAudios[currentLevel]
      if (levelAudio) {
        levelAudio.currentTime = 0
        levelAudio.play()
      }

      setTimeout(() => {
        levelText.parentElement.classList.remove("level-text--active")
      }, 1200)

      setTimeout(() => {
        loadLevel(currentLevel) /*CARGADO NIVEL UNO DEL JUEGO*/
        startLevelOne()/*LLAMADO DE LA SIG FUNCION*/

        gameStatus = "question"
        questionsRound()

      }, 1600)

    }
    /* FIN FUNCION MUESTRA TEXTO Y SONIDO DEL NIVEL UNO */

    /* INICIO FUNCION COMIENZO NIVEL UNO*/

    const startLevelOne = () => {

      if (gameStatus !== "level-start") return
      levelOneEnded = false

      gameAreaBlock.innerHTML = "" /*LIMPIAR AREA DEL JUEGO*/

      containerTopQuestions = document.createElement("div") /*CREA CONTAINER DE LAS PREGUNTAS*/
      containerTopQuestions.classList.add("top", "visual") /*AGREGA ESTILO AL CONTAINER DE LAS PREGUNTAS*/

      const containerBottomMonsters = document.createElement("div") /*CREA CONTAINER DE LOS MONSTRUOS*/
      containerBottomMonsters.classList.add("bottom") /*AGREGA ESTILO AL CONTAINER DE LOS MONSTRUOS*/

      /*AGREGAMOS LOS ELEMENTOS CONTAINERS PREGUNTAS Y MONSTRUOS EN EL GAME AREA BLOCK*/
      gameAreaBlock.appendChild(containerTopQuestions)
      gameAreaBlock.appendChild(containerBottomMonsters)

      /*CREAMOS BLOQUE MONSTRUO DEL JUGADOR, CONTENEDOR PARA SU SPRITE Y SU ELEMENTO IMAGE*/
      prepoMonster = document.createElement("div")
      prepoMonster.classList.add("monster", "player")

      const monsterVisual = document.createElement("div")
      monsterVisual.classList.add("monster-visual")

      imagePrepoMonster = document.createElement("img")
      imagePrepoMonster.src = "prepositions-battles/images/monsters/webp/prepo-battle.webp"
      imagePrepoMonster.alt = "Player monster"

      /*CREAMOS BLOQUE MONSTRUO ENEMIGO Y CONTENEDOR PARA SU SPRITE Y SU ELEMENTO IMAGE*/
      meanerPrepoMonster = document.createElement("div")
      meanerPrepoMonster.classList.add("monster", "enemy")

      const meanerVisual = document.createElement("div")
      meanerVisual.classList.add("monster-visual")

      imageMeanerPrepoMonster = document.createElement("img")
      imageMeanerPrepoMonster.src = "prepositions-battles/images/monsters/webp/meanerprepo-battle.webp"
      imageMeanerPrepoMonster.alt = "Enemy monster"
      /*TAMAÑO INICIAL DE LOS SPRITES Y FUNCION CONTROL DE TAMAÑO*/
      prepoGrowth = 0
      meanerGrowth = 0
      applyMonsterScale()

      /*INFO MONSTRUO DEL JUGADOR*/
      prepoInfo = document.createElement("div")
      prepoInfo.classList.add("btn--rounded", "monster-info--player")

      /*INFO MONSTRUO ENEMIGO */
      meanerPrepoInfo = document.createElement("div")
      meanerPrepoInfo.classList.add("btn--rounded", "monster-info--enemy")

      /*INFO MONSTRUO DEL JUGADOR AÑADIDO AL HTML */
      prepoInfo.innerHTML = `
      <p class="monster-name">${prepoName}</p>
      <p class="monster-points">Points: <span id="prepo-points">${prepoPoints}</span></p>
     `
      /*INFO MONSTRUO ENEMIGO AÑADIDO AL HTML */
      meanerPrepoInfo.innerHTML = `
      <p class="monster-name">${meanerPrepoName}</p>
       <p class="monster-points">Points: <span id="meaner-points">${meanerPrepoPoints}</span></p>
      `
      /*AGREGAMOS LOS ESTILOS PARA ENTRADA MONSTRUOS AL GAME AREA*/
      prepoMonster.classList.add("monster--enter")
      meanerPrepoMonster.classList.add("monster--enter")

      /*AGREGAMOS TODOS LOS ELEMENTOS A BLOQUE DE MONSTRUOS*/
      /*PLAYER*/
      monsterVisual.appendChild(imagePrepoMonster)
      prepoMonster.appendChild(monsterVisual)
      prepoMonster.appendChild(prepoInfo)
      /*ENEMY*/
      meanerVisual.appendChild(imageMeanerPrepoMonster)
      meanerPrepoMonster.appendChild(meanerVisual)
      meanerPrepoMonster.appendChild(meanerPrepoInfo)

      /*AGREGAMOS BLOQUE MONSTRUOS A CONTAINER BOTTOM*/
      containerBottomMonsters.appendChild(prepoMonster)
      containerBottomMonsters.appendChild(meanerPrepoMonster)
      /*ACTUALIZACION DE LOS PUNTOS DE LOS MONSTRUOS EN EL ELEMENTO INFO*/
      prepoPointsText = prepoMonster.querySelector("#prepo-points")
      meanerPrepoPointsText = meanerPrepoMonster.querySelector("#meaner-points")

      /* AÑADIMOS UN BREVE DELAY PARA DISPARAR ANIMACION DE LOS MONSTRUOS*/
      setTimeout(() => {
        prepoMonster.classList.remove("monster--enter")
        prepoMonster.classList.add("monster--active")

        meanerPrepoMonster.classList.remove("monster--enter")
        meanerPrepoMonster.classList.add("monster--active")

      }, 60)

      setTimeout(() => {
        gameStatus = "question" /* CAMBIO DE STATUS EMPIEZA RONDA DE PREGUNTAS*/
        questionsRound() /*LLAMADO DE LA SIG. FUNCION*/
      }, 600)

    }
    /* FIN FUNCION INICIO DE NIVEL UNO*/

    /* INICIO FUNCION RONDA DE PREGUNTAS*/

    const questionsRound = () => {

      if (gameStatus !== "question") return

      /* LIMPIAMOS TODO PARA INICIAR BARRA CONTADOR DEL TIEMPO */

      clearInterval(timerInterval)

      timeLeft = timePerQuestion
      timePercentage = 100
      timeCounter.textContent = timeLeft
      timeFiller.style.height = "100%"


      /* BLOQUE PREGUNTAS*/
      /*OBTENEMOS DATOS DEL ARRAY OBJETO Y LO ASIGNAMOS A BLOQUE PREGUNTAS*/
      currentQuestion = activeQuestions[currentQuestionIndex]

      questionText = currentQuestion.question
      questionImage = currentQuestion.src
      questionImageAlt = currentQuestion.alt
      answersButtons = currentQuestion.options
      correctAnswer = currentQuestion.correct
      correctAnswerText = currentQuestion.sentence

      /*TRANSICION ENTRE PREGUNTAS*/
      containerTopQuestions.style.opacity = "0";
      containerTopQuestions.style.transform = "translateY(6px)";

      containerTopQuestions.innerHTML = "" /*LIMPIAMOS CONTENEDOR TOP*/

      hasAnswered = false
      isClickable = true

      /*RENDERIZAR BLOQUE PREGUNTA EN GAME AREA*/
      questionBlock = document.createElement("div")
      questionBlock.classList.add("questions", "visual")

      questionBlock.innerHTML = `
            <div class="question-image">
              <img src="${questionImage}" alt="${questionImageAlt}">
            </div>
            <span class="text-h4">QUESTION ${currentQuestionIndex + 1}</span>
            <p class="text-h3">${questionText}</p>
            `
      /*BlOQUE DE BOTONES DE OPCIONES DE RESPUESTA*/
      const buttonsContainer = document.createElement("div")
      buttonsContainer.classList.add("questions-btns", "visual-row")
      buttonsContainer.style.pointerEvents = "auto"

      const shuffledOptions = shuffleBtnOptions(currentQuestion.options)

      shuffledOptions.forEach(optionText => { /* FUNCIÓN SHUFFLE BOTONES DE OPCIONES DE RESPUESTAS 
        PARA EVITAR PATRON PREDICTIVO*/

        /*RENDERIZAR BLOQUE OPCIONES DE RESPUESTA  EN GAME AREA*/
        const btn = document.createElement("button")
        btn.type = "button"
        btn.classList.add("btn--rounded")

        btn.innerHTML = `<span class="text-body">${optionText}</span>`

        /*EVENTO PARA SELECCIONAR RESPUESTA*/
        btn.addEventListener("click", () => {
          if (gameStatus !== "question") return
          if (hasAnswered) return
          /*BLOQUE DE CLICKS*/
          hasAnswered = true
          isClickable = false
          buttonsContainer.style.pointerEvents = "none"

          /*SE DETIENE CONTADOR Y SOMIDO AL SELECCIONAR RESPUESTA*/
          clearInterval(timerInterval)
          soundTimerCountdown.pause()
          soundTimerCountdown.currentTime = 0

          /*DECLARAMOS VARIABLES DE RESPUESTAS CORRECTAS*/
          const selectedAnswer = optionText
          const isCorrect = selectedAnswer === correctAnswer
          const questionParagraph = questionBlock.querySelector(".text-h3")

          /* RESPUESTA CORRECTA */
          if (isCorrect) {
            questionParagraph.textContent = correctAnswerText
            questionParagraph.classList.add("answer-correct")

            /* CAMBIAMOS COLOR FONDO BOTÓN CORRECTO*/
            btn.classList.add("btn-correct")

            /*DESACTIVAMOS LOS BOTONES MIENTRAS*/
            const allButtons = buttonsContainer.querySelectorAll(".btn--rounded")
            allButtons.forEach(button => {
              button.disabled = true
            })

            updatePrepoState("happy")
            updateMeanerState("sad")

            /*SONIDO DE CORRECT*/
            soundCorrect.currentTime = 0
            soundCorrect.play().catch(() => { }) //SOLUCION DADO POR IA

            /* SONIDO DE FRASE CORRECTA*/
            setTimeout(() => {
              /* REPRODUCIMOS SONIDO DE FRASE CORRECTA*/
              const sentenceAudio = sentenceSounds[currentQuestionIndex]
              if (sentenceAudio) {
                sentenceAudio.currentTime = 0
                sentenceAudio.play().catch(() => { })
              }
            }, 600)


          }

          /* RESPUESTA INCORRECTA */
          if (!isCorrect) {
            feedbackBlock.textContent = "WRONG!"
            feedbackBlock.className = "question-feedback wrong"
            feedbackBlock.style.display = "block"

            questionParagraph.textContent = correctAnswerText
            questionParagraph.classList.add("answer-wrong")
            /* CAMBIAMOS COLOR FONDO BOTÓN CORRECTO E INCORRECTO*/
            const allButtons = buttonsContainer.querySelectorAll(".btn--rounded")

            allButtons.forEach(button => {
              const text = button.textContent.trim()

              if (text === correctAnswer) {
                button.classList.add("btn-correct")
              }

              if (text === selectedAnswer) {
                button.classList.add("btn-wrong")
              }
            })


            updatePrepoState("sad")
            updateMeanerState("happy")
            /*SONIDO DE INCORRECT*/
            soundWrong.currentTime = 0
            soundWrong.play()
          }

          /* ESPERAR Y SIGUIENTE FINAL DEL NIVEL */
          setTimeout(() => {
            feedbackBlock.textContent = ""
            feedbackBlock.className = "question-feedback"
            feedbackBlock.style.display = "none"
            questionParagraph.classList.remove("answer-correct", "answer-wrong")

            /* RESETEO SPRITES */
            imagePrepoMonster.src = "prepositions-battles/images/monsters/webp/prepo-battle.webp"
            imageMeanerPrepoMonster.src = "prepositions-battles/images/monsters/webp/meanerprepo-battle.webp"

            currentQuestionIndex++
            hasAnswered = false
            isClickable = true

            if (currentQuestionIndex < totalQuestions) {
              gameStatus = "question"
              questionsRound()
            } else {
              gameStatus = "ended"
              const finalDelay = 800 // DELAY PARA ENTRAR EL BLOQUE FINAL DE NIVEL
              setTimeout(() => {
                if (currentLevel === 1) {
                  endLevelOne()
                } else if (currentLevel === 2) {
                  endLevelTwo()
                }
              }, finalDelay)
            }

          }, feedbackDuration)
        })
        buttonsContainer.appendChild(btn)
      });

      /*AGREGAMOS BLOQUE PREGUNTA AL CONTAINER TOP*/
      containerTopQuestions.appendChild(questionBlock)
      /*AGREGAMOS BLOQUE DE OPCIONES DE RESPUESTA AL CONTAINER TOP*/
      containerTopQuestions.appendChild(buttonsContainer)
      /*AGREGAMOS BLOQUE DE FEEDBACK AL CONTAINER TOP*/
      containerTopQuestions.appendChild(feedbackBlock)

      /* EFECTOS TRANSICION ENTRE PREGUNTAS */
      requestAnimationFrame(() => {
        containerTopQuestions.style.opacity = "1";
        containerTopQuestions.style.transform = "translateY(0)";
      });
      /* LLAMAMOS FUNCION QUE CONTROLA BARRA CONTADOR DEL TIEMPO */
      startTimer()
    }
    /* FIN FUNCION RONDA DE PREGUNTAS*/

    /*INICIO FUNCION PARA CONTROL TAMAÑO DE LOS MONSTRUOS*/ // /*EN ESTA PARTE UTILICE CHAT GPT PARA DAR
    // CON LA SOLUCIÓN PARA GENERAR EL CRECIMIENTO DE LOS MONSTRUOS, EL PROMPT FUE: "COMO HAGO CRECER LOS SPRITES
    // SIN ROMPER EL CONTENEDOR"
    function applyMonsterScale() {
      imagePrepoMonster.style.transform =
        `scale(${BASE_SCALE + prepoGrowth})`

      imageMeanerPrepoMonster.style.transform =
        `scale(${BASE_SCALE + meanerGrowth})`
    }
    /*FIN FUNCION PARA CONTROL TAMAÑO DE LOS MONSTRUOS*/

    /* INICIO FUNCION ACTUALIZAR ESTADO DE MONSTRUO PLAYER*/

    const updatePrepoState = (state) => {
      if (state === "happy") {
        prepoPoints++
        prepoGrowth += 0.1
        imagePrepoMonster.src = "prepositions-battles/images/monsters/webp/prepo-win.webp"
        soundMonsterGrow.currentTime = 0
        soundMonsterGrow.play()
      }

      if (state === "sad") {
        prepoPoints--
        prepoGrowth -= 0.1
        imagePrepoMonster.src = "prepositions-battles/images/monsters/webp/prepo-lose.webp"
        soundMonsterShrink.currentTime = 0
        soundMonsterShrink.play()
      }

      prepoGrowth = Math.max(-0.15, Math.min(prepoGrowth, 0.4))
      applyMonsterScale()
      updateMonsterInfo()
    }
    /* FIN FUNCION ACTUALIZAR ESTADO DE MONSTRUO PLAYER*/

    /* INICIO FUNCION ACTUALIZAR ESTADO DE MONSTRUO ENEMIGO*/

    const updateMeanerState = (state) => {
      if (state === "happy") {
        meanerPrepoPoints++
        meanerGrowth += 0.2
        imageMeanerPrepoMonster.src =
          "prepositions-battles/images/monsters/webp/meanerprepo-win.webp"
        soundMonsterGrow.currentTime = 0
        soundMonsterGrow.play()
      }

      if (state === "sad") {
        meanerPrepoPoints--
        meanerGrowth -= 0.1
        imageMeanerPrepoMonster.src =
          "prepositions-battles/images/monsters/webp/meanerprepo-lose.webp"
        soundMonsterShrink.currentTime = 0
        soundMonsterShrink.play()
      }

      meanerGrowth = Math.max(-0.15, Math.min(meanerGrowth, 0.8))
      applyMonsterScale()
      updateMonsterInfo()

      console.log("MEANER:", state, meanerGrowth)
    }
    /* FIN FUNCION ACTUALIZAR ESTADO DE MONSTRUO ENEMIGO*/

    /*INICIA FUNCION SHUFFLE BOTONES DE OPCIONES DE RESPUESTAS PARA EVITAR PATRON PREDICTIVO*/

    const shuffleBtnOptions = (options) => {
      const copyOptions = [...options]
      const newOptions = []
      while (copyOptions.length) {
        let index = Math.floor(Math.random() * copyOptions.length)
        newOptions.push(copyOptions[index])
        copyOptions.splice(index, 1)
      }
      return newOptions

    }
    /*FIN FUNCION SHUFFLE BOTONES DE OPCIONES DE RESPUESTAS*/

    /* BLOQUE FEEDBACK*/
    feedbackBlock = document.createElement("div")
    feedbackBlock.classList.add("question-feedback")

    /*  INICIA FUNCION QUE CONTROLA BARRA CONTADOR DEL TIEMPO */

    function startTimer() {
      if (gameStatus !== "question") return

      timerInterval = setInterval(() => {
        /*RESTAMOS EL TIEMPO RESTANTE */
        timeLeft--
        /*SONIDO ALERTA DE TIEMPO RESTANTE */
        if (timeLeft === 3) {
          soundTimerCountdown.currentTime = 0
          soundTimerCountdown.play()
        }

        if (timeLeft === 0) {
          /*ACTUALIZAMOS TEXTO DEL CONTADOR TIEMPO A CERO*/
          timeLeft = 0
          timeCounter.textContent = timeLeft
          /*ACTUALIZAMOS ALTURA DE BARRA DEL CONTADOR TIEMPO A CERO */
          timeFiller.style.height = "0%"

          /*DETENEMOS CONTADOR */
          clearInterval(timerInterval)
          /*DETENEMOS SONIDO */
          soundTimerCountdown.pause()
          soundTimerCountdown.currentTime = 0

          gameStatus = "transition" /*CAMBIA STATUS DEL JUEGO*/

          /*ACTUALIZAMOS PUNTOS A LOS MONSTRUOS*/
          updatePrepoState("sad")
          updateMeanerState("happy")
          /*RENDERIZAMOS MENSAJE TIME OVER */
          feedbackBlock.textContent = "TIME OVER"
          feedbackBlock.classList.add("time-over")

          setTimeout(() => {
            feedbackBlock.textContent = ""
            feedbackBlock.classList.remove("time-over")

            /*RESETEO DE LOS SPRITE*/
            imagePrepoMonster.src = "prepositions-battles/images/monsters/webp/prepo-battle.webp"
            imageMeanerPrepoMonster.src = "prepositions-battles/images/monsters/webp/meanerprepo-battle.webp"


            currentQuestionIndex++

            if (currentQuestionIndex < totalQuestions) {
              gameStatus = "question"
              questionsRound()
            } else {
              gameStatus = "ended"
              endLevelOne() /*LALMADO DE FUNCION FIN DE NIVEL UNO*/

            }
          }, 1500)

          return
        }
        /*ACTUALIZAMOS TEXTO DEL CONTADOR TIEMPO*/
        timeCounter.textContent = timeLeft
        /*ACTUALIZAMOS BARRA DEL CONTADOR TIEMPO */
        timePercentage = (timeLeft / timePerQuestion) * 100
        /*ACTUALIZAMOS ALTURA DE BARRA DEL CONTADOR TIEMPO */
        timeFiller.style.height = timePercentage + "%"


      }, 1000)

    }
    /*FIN FUNCION QUE CONTROLA BARRA CONTADOR DEL TIEMPO */

    /*FUNCION PARA FINALIZAR NIVEL UNO Y PASAR AL SIGUIENTE*/

    const endLevelOne = () => {
      if (gameStatus !== "ended") return
      if (levelOneEnded) return

      levelOneEnded = true

      clearInterval(timerInterval)
      isClickable = false
      soundTimerCountdown.pause()
      soundTimerCountdown.currentTime = 0

      containerTopQuestions.innerHTML = ""

      const playerWon = prepoPoints > meanerPrepoPoints

      const endBlock = document.createElement("div")
      endBlock.classList.add("end-level")

      if (playerWon) {
        soundWinLevel.currentTime = 0
        soundWinLevel.play()

        imagePrepoMonster.src = "prepositions-battles/images/monsters/webp/prepo-win.webp"
        imageMeanerPrepoMonster.src = "prepositions-battles/images/monsters/webp/meanerprepo-lose.webp"

        endBlock.innerHTML = `
      <h2 class="text-h2">YOU WIN</h2>
      <p class="text-h3">Level One Completed</p>
      <button class="btn--rounded" id="next-level">Next Level</button>
    `
      } else {
        soundLoseLevel.currentTime = 0
        soundLoseLevel.play()

        imagePrepoMonster.src = "prepositions-battles/images/monsters/webp/prepo-lose.webp"
        imageMeanerPrepoMonster.src = "prepositions-battles/images/monsters/webp/meanerprepo-win.webp"

        endBlock.innerHTML = `
      <h2 class="text-h2">YOU LOSE</h2>
      <p class="text-h3">Level One Completed</p>
      <button class="btn--rounded" id="next-level">Next Level</button>
    `
      }

      containerTopQuestions.appendChild(endBlock)
      /*BOTON DEL PROXIMO NIVEL*/
      const nextBtn = endBlock.querySelector("#next-level")
      nextBtn.addEventListener("click", () => {
        currentLevel = 2
        gameStatus = "level-start"
        gameAreaBlock.innerHTML = ""
        showLevelText()
      })


    }
    /*FIN FUNCION PARA FINALIZAR NIVEL UNO Y PASAR AL SIGUIENTE NIVEL*/

    /*INICIO FUNCION NIVEL DOS */

    const endLevelTwo = () => {
      if (gameStatus !== "ended") return

      clearInterval(timerInterval)
      isClickable = false
      soundTimerCountdown.pause()
      soundTimerCountdown.currentTime = 0

      containerTopQuestions.innerHTML = ""

      const playerWon = prepoPoints > meanerPrepoPoints

      const endBlock = document.createElement("div")
      endBlock.classList.add("end-level", "end-game")

      if (playerWon) {
        soundWinLevel.currentTime = 0
        soundWinLevel.play()

        imagePrepoMonster.src = "prepositions-battles/images/monsters/webp/prepo-win.webp"
        imageMeanerPrepoMonster.src = "prepositions-battles/images/monsters/webp/meanerprepo-lose.webp"

        endBlock.innerHTML = `
      <h2 class="text-h2">GAME COMPLETED</h2>
      <p class="text-h3">You won the battle!</p>
      <p class="text-h4">Final Score: ${prepoPoints}</p>
      <button class="btn--rounded" id="end-game-btn">Finish</button>
    `
      } else {
        soundLoseLevel.currentTime = 0
        soundLoseLevel.play()

        imagePrepoMonster.src = "prepositions-battles/images/monsters/webp/prepo-lose.webp"
        imageMeanerPrepoMonster.src = "prepositions-battles/images/monsters/webp/meanerprepo-win.webp"

        endBlock.innerHTML = `
      <h2 class="text-h2">GAME OVER</h2>
      <p class="text-h3">Better luck next time</p>
      <p class="text-h4">Final Score: ${prepoPoints}</p>
      <button class="btn--rounded" id="end-game-btn">Finish</button>
    `
      }

      containerTopQuestions.appendChild(endBlock)

      document
        .getElementById("end-game-btn")
        .addEventListener("click", () => {

          endBlock.style.display = "none"

          /*SCORE DEL JUGADOR*/
          let scoreBoard = document.createElement("div")
          scoreBoard.classList.add("score-board")

          scoreBoard.innerHTML = `
          <h2 class="text-h2">Save your score</h2>
          <form id="score-form" class="score-form">
          <label class="text-h4" for="player-name">
            Your name
          </label>
          <input 
          type="text"
          id="player-name"
          name="playerName"
          placeholder="Enter your name"
          maxlength="15"
          required
          />
          <p class="text-h4">
          Final score: <strong>${prepoPoints}</strong>
          </p>

          <button type="submit" class="btn--rounded">
          Save score
          </button>
          </form>
      `
          containerTopQuestions.appendChild(scoreBoard)

          const form = document.getElementById("score-form")

          form.addEventListener("submit", (e) => {
            /*EVITAR RECARGAR LA PÁGINA*/
            e.preventDefault()

            /*LEER INPUT*/
            const input = document.getElementById("player-name")
            const playerName = input.value.trim()

            /* VALIDAR */
            if (playerName.length === 0) {
              alert("Name is empty!")
              return
            }

            /*CREAR SCORE*/
            const userScore = {
              name: playerName,
              score: prepoPoints
            }
            /*GUARDAR SCORE EN ARRAY*/
            scores.push(userScore)

            /*ORDENAR SCORES (MAYOR A MENOR)*/
            scores.sort((a, b) => b.score - a.score)

            /*GUARDAR SCORES DE PARTIDA*/

            localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))

            /*LIMPIAR FORM*/
            input.value = ""

            /*LIMPIAR UI*/
            containerTopQuestions.innerHTML = ""

            /*RENDERIZADO SCOREBOARD*/
            const scoresFinal = document.createElement("div")
            scoresFinal.classList.add("score-final")

            let rows = scores.map((s, index) => {
              return `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${s.name}</td>
                    <td>${s.score}</td>
                  </tr>
              `
            }).join("")

            scoresFinal.innerHTML = `
                  <h2 class="text-h2">Score Board</h2>
                  <table class="score-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Points</th>
                      </tr>
                    </thead>
                  <tbody>
                      ${rows}
                  </tbody>
                </table>
                `
            document.body.appendChild(scoresFinal)


          })
        })

    }
    /*FIN FUNCION NIVEL DOS FIN DEL JUEGO*/
  }, { once: true })

}

initGame()



