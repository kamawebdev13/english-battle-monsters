
/*ESTE ES EL MOTOR DEL JUEGO  Y SE CARGA EN LA PAGINA PRINCIPAL GAMES, ESTE A SU VEZ DESCARGARA LAS PLANTILLAS CONFIG.JS*/

/*VARIABLES GLOBALES DEL JUEGO*/

/*ESTATUS DEL JUEGO*/
let gameState = {
  level: 1,
  status: "wait", /* "wait", "level-start", "question", "ended"*/
  questionIndex: 0,
  activeQuestions: [],
  timerInterval: null,
  timeLeft: 0,
  scores: {
    player: { points: 0, growth: 0 },
    enemy: { points: 0, growth: 0 }
  },
  /*CARGA DE AUDIOS*/
  audio: {
    sfx: {},  /*SONIDOS DE EFECTOS ESPECIALES*/
    level: null,  /*SONIDOS DE CAMBIO DE NIVEL*/
    sentence: null /*SONIDOS DE FRASES COMPLETAS*/
  }
}

/*MODIFICACIONES DURANTE EL JUEGO Y SU DURACION*/

const MOD_CONFIG = {
  baseScale: 1.5, /*SUGERIDO POR IA CHAT GPT*/ 
  growthStep: 0.1,/*SUGERIDO POR IA CHAT GPT: PROMPT: "Como aumento o disminuyo 
  los sprites gradualmente sin romper el layout"*/ 
  maxGrowth: 0.5,
  minGrowth: -0.15,
  feedbackDuration: 1500
}

/* ELEMENTOS DEL DOM*/
let dom = {}

/**ETAPA UNO DEL JUEGO**/
/***FUNCION DE RUTEADO PARA QUE EL MOTOR ENCUENTRE LOS ARCHIVOS Y LOS CARGUE AL JUEGO****/

const getPath = (type, filename) => {
  const root = GameData.rootFolder

  switch (type) {
    case 'bg': return filename
    case 'monster': return `${root}/images/monsters/${filename}`
    case 'q_img': return `${root}/images/questions/${filename}`
    case 'q_audio': return `${root}/sounds/questions/${filename}`
    case 'sfx': return `${root}/sounds/actions/${filename}`
    default: return filename
  }
}
/*====END OF GETPATH()=====*/


/***FUNCION DE INICIALIZACION DEL JUEGO***/

const initGame = () => {

  console.log("GAME IS LOADING:", GameData.title)

  /*SELECCION DE ELEMENTOS DEL DOM*/
  dom = {
    instructions: document.getElementById("game-instructions"),
    gameArea: document.getElementById("game-area"),
    gameBlock: document.getElementById("game-area__block"),
    levelTextOverlay: document.getElementById("level-text"),
    levelTextH3: document.getElementById("level-one-text"),
    timerDisplay: document.getElementById("time"),
    timerBar: document.getElementById("time-filler"),
    btnPlay: document.getElementById("btn-play-game")
  }

  /*CARGA DE GRAFICOS DEL JUEGO*/

  dom.gameArea.style.backgroundImage = GameData.theme.backgroundImage
  dom.gameArea.style.backgroundSize = "cover"
  dom.gameArea.style.backgroundPosition = "center"
  dom.gameArea.style.backgroundRepeat = "no-repeat"
 
 
  /*RENDERIZADO DE LAS INSTRUCCIONES DEL JUEGO*/

  const instrBlock = dom.instructions.querySelector(".instructions__block")
  if (instrBlock) {
    instrBlock.querySelector(".text-h1").innerText = GameData.title
    instrBlock.querySelector(".text-h3").innerText = GameData.instructions.title

    const ul = instrBlock.querySelector(".how-to-play")
    ul.innerHTML = ""
    GameData.instructions.steps.forEach(step => {
      const li = document.createElement("li")
      li.innerHTML = step
      ul.appendChild(li)
    })

    /*TEXTO BOTON DE INICIAR JUEGO*/
    dom.btnPlay.innerText = GameData.instructions.buttonText

    /*EVENTO PARA INICIAR JUEGO*/
    dom.btnPlay.addEventListener("click", handlePlayClick)

    /*RENDERIZADO DE INSTRUCCIONES PARA NUEVO JUEGO*/
    dom.instructions.style.display = "block";
    instrBlock.classList.remove("fade-out");
    instrBlock.style.pointerEvents = "all";
  }
  /*PRE CARGA DE SONIDOS DE EFECTOS ESPECIALES */

  gameState.audio.sfx = {
    click: new Audio(getPath('sfx', 'play-button.mp3')),
    correct: new Audio(getPath('sfx', 'correct.mp3')),
    wrong: new Audio(getPath('sfx', 'wrong.mp3')),
    grow: new Audio(getPath('sfx', 'monster-grow.mp3')),
    shrink: new Audio(getPath('sfx', 'monster-shrink.mp3')),
    win: new Audio(getPath('sfx', 'win-level.mp3')),
    lose: new Audio(getPath('sfx', 'lose-level.mp3')),
    timer: new Audio(getPath('sfx', 'timer-countdown.mp3'))
  }

}
/*=============END OF INITGAME()===================*/


/***FUNCION DE EVENTO EN EL BOTON DE INICIO JUEGO***/

const handlePlayClick = () => {
  /*SONIDO DEL BOTON PLAY*/
  gameState.audio.sfx.click.play().catch(e => { })
  gameState.status = "level-start"

  /*RESET DE  LOS ESTADOS*/
  gameState.level = 1
  gameState.scores.player = { points: 0, growth: 0 }
  gameState.scores.enemy = { points: 0, growth: 0 }

  /*OCULTA LAS INSTRUCCIONES JUEGO*/
  hideInstructions()
}
/*===========END OF HANDLEPLAYCLICK()===============*/


/***INICIO FUNCION OCULTA INSTRUCCIONES DEL JUEGO***/

const hideInstructions = () => {

  // if (gameState.status !== "level-start") return

  const instrBlock = dom.instructions.querySelector(".instructions__block")

  if (instrBlock) {
    instrBlock.style.pointerEvents = "none" /*EVITA CUALQUIER EVENTO CON EL PUNTERO DEL RATON*/
    instrBlock.classList.add("fade-out") /*OCULTA GRADUALMENTE LAS INSTRUCCIONES DEL JUEGO */

    /*TIEMPO DE ESPERA PARA OCULTAR LAS INSTRUCCIONES*/
    setTimeout(() => {
      dom.instructions.style.display = "none"
      startLevel(1) /*LLAMADO DE LA SIG. FUNCION*/
    }, 800)
  } else {
    startLevel(1);
  }
}
/*=====END OF HIDEINSTRUCTIONS()===================*/


/**ETAPA DOS DEL JUEGO**/
/***INICIO FUNCION INICIO DEL PRIMER NIVEL ***/

const startLevel = (levelNum) => {
  const levelConfig = GameData.levels[levelNum] /*COPIA TODOS LOS DATOS DE LOS NIVELES DEL ARCHIVO CONFIG.JS*/

  /*CHEQUEAR SI CONDICION INICIAL SE CUMPLE*/
  if (!levelConfig) {
    finishGame()
    return
  }

  gameState.level = levelNum
  gameState.status = "level-start"
  gameState.activeQuestions = levelConfig.questions /*COPIA PREGUNTAS DEL ARCHIVO CONFIG.JS*/
  gameState.questionIndex = 0

  /*RENDERIZADO TEXTO DE NIVELES*/
  dom.levelTextH3.innerText = `LEVEL ${levelNum}`
  dom.levelTextOverlay.classList.add("level-text--active")

  /*REPRODUCCION AUDIO INICIAL DEL NIVEL*/
  if (levelConfig.introAudio) {
    const audio = new Audio(levelConfig.introAudio)
    audio.volume = 0.7
    audio.play().catch(e => { })
  }

  /*OCULTAMOS TEXTO TRAS UN DELAY*/
  setTimeout(() => {
    dom.levelTextOverlay.classList.remove("level-text--active")
    setupGameArea() /*LLAMADO DE PROX FUNCION DE RENDERIZADO DE SPRITES*/
    nextQuestion()  /*LLAMADO DE PROX FUNCION INICIO RONDA DE PREGUNTAS*/
  }, 2000)
}

/*=====END OF HIDEINSTRUCTIONS()===================*/


/**ETAPA TRES DEL JUEGO**/
/***INICIO FUNCION DE RENDERIZADO DE ÁREA JUEGO Y SPRITES/MONSTRUOS***/

const setupGameArea = () => {
  /*LIMPIAMOS EL AREA DE JUEGO*/
  dom.gameBlock.innerHTML = ""

  /*CREAMOS CONTENEDORES TOP Y BOTTOM*/
  const topDiv = document.createElement("div")
  topDiv.classList.add("top", "visual")
  const bottomDiv = document.createElement("div")
  bottomDiv.classList.add("bottom")

  /*RENDERIZADO DE LOS MONSTRUOS/SPRITES*/
  bottomDiv.innerHTML = `
        <div class="monster player monster--enter">
            <div class="monster-visual">
                <img src="${getPath('monster', GameData.player.sprites.idle)}" id="img-player" alt="${GameData.player.name}">
            </div>
            <div class="btn--rounded monster-info--player">
                <p class="monster-name">${GameData.player.name}</p>
                <p class="monster-points">Points: <span id="score-player">0</span></p>
            </div>
        </div>

        <div class="monster enemy monster--enter">
            <div class="monster-visual">
                <img src="${getPath('monster', GameData.enemy.sprites.idle)}" id="img-enemy" alt="${GameData.enemy.name}">
            </div>
            <div class="btn--rounded monster-info--enemy">
                <p class="monster-name">${GameData.enemy.name}</p>
                <p class="monster-points">Points: <span id="score-enemy">0</span></p>
            </div>
        </div>
    `
  /*AGREGADO DE LOS MONSTRUOS/SPRITES AL CONTENEDOR PADRE*/
  dom.gameBlock.appendChild(topDiv)
  dom.gameBlock.appendChild(bottomDiv)

  /*DECLARAMOS NUEVAS VARIABLES DOM DE LOS SPRITES Y SUS INFO DE PUNTUACION*/
  dom.imgPlayer = document.getElementById("img-player")
  dom.imgEnemy = document.getElementById("img-enemy")
  dom.txtScorePlayer = document.getElementById("score-player")
  dom.txtScoreEnemy = document.getElementById("score-enemy")

  /*ACTUALIZAMOS LA UI DE LOS SPRITES Y SISTEMA PUNTAJE*/
  updateUI()

  /*REMOVEMOS LA ENTRADA DE LOS SPRITES*/
  setTimeout(() => {
    document.querySelectorAll(".monster").forEach(el => {
      el.classList.remove("monster--enter")
      el.classList.add("monster--active")
    })
  }, 100)

}
/*=====END OF SETUPGAMEAREA()===================*/

/**ETAPA CUATRO DEL JUEGO**/
/***INICIO FUNCION DE RONDA DE PREGUNTAS***/

const nextQuestion = () => {
  /*VERIFICAR CONDICION SI QUEDAN PREGUNTAS RESTANTES*/
  if (gameState.questionIndex >= gameState.activeQuestions.length) {
    /*SI NO HAY PREGUNTAS FINALIZAMOS EL NIVEL*/
    endLevel()
    return
  }
  /*CAMBIO DE STATUS DEL JUEGO Y DECLARACION VARIABLES PREGUNTA Y CONTENEDOR*/
  gameState.status = "question"
  const qData = gameState.activeQuestions[gameState.questionIndex]
  const topContainer = dom.gameBlock.querySelector(".top")

  /*REMOVEMOS LA ENTRADA DE LOS SPRITES*/
  topContainer.innerHTML = ""
  topContainer.style.opacity = 0

  /*RENDERIZAMOS BLOQUES DE PREGUNTAS*/
  const qBlock = document.createElement("div")
  qBlock.classList.add("questions", "visual")
  qBlock.innerHTML = `
        <div class="question-image">
            <img src="${getPath('q_img', qData.src)}" alt="${qData.alt}">
        </div>
        <span class="text-h4">QUESTION ${gameState.questionIndex + 1}</span>
        <p class="text-h3" id="q-text">${qData.question}</p>
    `

  /*CREAMOS LOS BOTONES DE RESPUESTAS*/
  const btnContainer = document.createElement("div")
  btnContainer.classList.add("questions-btns", "visual-row")

  /*BARAJAMOS BOTONES DE RESPUESTAS PARA EVITAR USUARIO MEMORICE POSICION*/
  const shuffledOptions = [...qData.options].sort(() => Math.random() - 0.5)

  shuffledOptions.forEach(opt => {
    const btn = document.createElement("button")
    btn.classList.add("btn--rounded")
    btn.innerHTML = `<span class="text-body">${opt}</span>`

    btn.onclick = () => handleAnswer(opt, qData, btn, btnContainer)
    btnContainer.appendChild(btn)
  })

  /*CREAMOS CONTENEDOR DE FEEDBACK*/
  const feedbackDiv = document.createElement("div")
  feedbackDiv.classList.add("question-feedback")
  feedbackDiv.id = "feedback-box"

  topContainer.appendChild(qBlock)
  topContainer.appendChild(btnContainer)
  topContainer.appendChild(feedbackDiv)

  /*ANIMACION DE ENTRADA DE PREGUNTAS*/
  requestAnimationFrame(() => {
    topContainer.style.opacity = 1
    topContainer.style.transform = "translateY(0)"
  })

  /*INICIO DE CONTADOR BARRA DE TIEMPO*/
  startTimer(GameData.levels[gameState.level].time)
}

/*=====END OF NEXTQUESTION()===================*/


/**ETAPA CINCO DEL JUEGO**/
/***INICIO FUNCION DE MANEJO DE PREGUNTAS Y BARRA DE TIEMPO***/

const handleAnswer = (selected, qData, clickedBtn, container) => {
  if (gameState.status !== "question") return

  /*CUANDO USUARIO ESCOGE UNO DE LOS BOTONES DE RESPUESTA LA BARRA DE TIEMPO SE PAUSA*/
  gameState.status = "answering"
  clearInterval(gameState.timerInterval)
  gameState.audio.sfx.timer.pause()

  /*VALIDAMOS LA OPCION DE RESPUESTA ESCOGIDA POR USUARIO*/
  const isCorrect = selected === qData.correct
  const qText = document.getElementById("q-text")
  const feedback = document.getElementById("feedback-box")

  /*DESACTIVAMOS LOS BOTONES*/
  Array.from(container.children).forEach(b => b.disabled = true)

  if (isCorrect) {
    /*CONDICION RESPUESTA CORRECTA*/
    gameState.audio.sfx.correct.play()  /*SE REPRODUCE EL AUDIO*/
    clickedBtn.classList.add("btn-correct")
    qText.innerText = qData.sentence/*MOSTRAMOS LA ORACION COMPLETA*/
    qText.classList.add("answer-correct")

    /*ACTUALIZAMOS EL ESTADO DE LOS SPRITES*/
    updateMonster("player", "win")
    updateMonster("enemy", "lose")

    /*SE REPRODUCE EL AUDIO DE LA ORACION*/
    if (qData.audio) {
      setTimeout(() => {
        const sAudio = new Audio(getPath('q_audio', qData.audio))
        sAudio.volume = 0.7
        sAudio.play().catch(e => { })
      }, 500)
    }

  } else {
    /*CONDICION RESPUESTA INCORRECTA*/
    gameState.audio.sfx.wrong.play()
    clickedBtn.classList.add("btn-wrong")

    /*MOSTRAMOS LA OPCION CORRECTA*/
    Array.from(container.children).forEach(b => {
      if (b.innerText === qData.correct) b.classList.add("btn-correct")
    })

    qText.innerText = qData.sentence
    qText.classList.add("answer-wrong")

    /*MOSTRAMOS EL FEEDBACK*/
    feedback.innerText = "WRONG!"
    feedback.classList.add("question-feedback", "wrong")
    feedback.style.display = "block"

    /*ACTUALIZAMOS EL ESTADO DE LOS SPRITES*/
    updateMonster("player", "lose")
    updateMonster("enemy", "win")

    console.log("FEEDBACK:", feedback.innerText, feedback.style.display)
  }

  /*AVANZAMOS AL SIGUIENTE NIVEL*/
  setTimeout(() => {
    resetMonstersVisuals() /*SE RESTAURA LOS SPRITES INICIALES*/
    gameState.questionIndex++
    nextQuestion()
  }, MOD_CONFIG.feedbackDuration)
}

/*=====END OF HANDLEANSWER()===================*/


/***INICIO FUNCION DE BARRA DEL TIEMPO ***/
const startTimer = (seconds) => {
  gameState.timeLeft = seconds
  dom.timerDisplay.innerText = seconds
  dom.timerBar.style.height = "100%"

  gameState.timerInterval = setInterval(() => {
    gameState.timeLeft--
    dom.timerDisplay.innerText = gameState.timeLeft

    /*PORCENTAJE DE LA BARRA*/
    const pct = (gameState.timeLeft / seconds) * 100
    dom.timerBar.style.height = `${pct}%`

    /*SONIDO DE ADVERTENCIA SI QUEDAN TRES SEG*/
    if (gameState.timeLeft === 3) {
      gameState.audio.sfx.timer.currentTime = 0
      gameState.audio.sfx.timer.play().catch(e => { })
    }

    if (gameState.timeLeft <= 0) {
      handleTimeOver()
    }
  }, 1000)
}
/*=====END OF STARTTIMER()===================*/

/***INICIO FUNCION DE PENALIZACION CUANDO TIEMPO SE TERMINA Y USUARION NO RESPONDE ***/
const handleTimeOver = () => {
  clearInterval(gameState.timerInterval)
  gameState.audio.sfx.timer.pause()

  /*ACTUALIZACION DE ESTADO DE LOS SPRITES*/
  updateMonster("player", "lose")
  updateMonster("enemy", "win")

  const feedback = document.getElementById("feedback-box")
  if (feedback) {
    feedback.innerText = "TIME OVER!"
    feedback.classList.add("question-feedback", "time-over")
    feedback.style.display = "block"
  }

  setTimeout(() => {
    resetMonstersVisuals()
    gameState.questionIndex++
    nextQuestion()
  }, 1500)
}

/*=====END OF HANDLETIMEOVER()===================*/

/**ETAPA SEIS DEL JUEGO**/
/***INICIO FUNCION DE ACTUALIZACION DE ESTADOS DE LOS SPRITES/MONSTRUOS***/

const updateMonster = (who, mood) => {
  /*LOGICA DE LOS PARAM: WHO: 'PLAYER' | 'ENEMY'*/
  /*LOGICA DE LOS PARAM  MOOD: 'WIN' | 'LOSE'*/

  /*DECLARAMOS LAS VARIABLES DE PUNTOS, IMAGENES Y ACCESO DE LA DATA DE PLANTILLA CONFIG.JS*/
  const targetObj = gameState.scores[who]
  const targetImg = who === 'player' ? dom.imgPlayer : dom.imgEnemy
  const configData = who === 'player' ? GameData.player : GameData.enemy

  /*LOGICA DE PUNTOS*/
  const pointsChange = mood === 'win' ? 1 : -1
  targetObj.points += pointsChange

  /*LOGICA DE CRECIMIENTO DE LOS SPRITES SEGUN PUNTAJE*/
  const growthChange = mood === 'win' ? MOD_CONFIG.growthStep : -MOD_CONFIG.growthStep
  targetObj.growth += growthChange
  /*LIMITAMOS CRECIMIENTO*/
  targetObj.growth = Math.max(MOD_CONFIG.minGrowth, Math.min(targetObj.growth, MOD_CONFIG.maxGrowth))

  /*CARGADO DE IMAGENES PARA SPRITES*/
  targetImg.src = getPath('monster', configData.sprites[mood])

  /*CARGADO DE EFECTOS DE SONIDO SI SE PIERDE O GANA*/
  const sound = mood === 'win' ? gameState.audio.sfx.grow : gameState.audio.sfx.shrink
  sound.currentTime = 0
  sound.play().catch(e => { })

  /*ACTUALIZAMOS LA UI DE LOS SPRITES Y SISTEMA PUNTAJE*/
  updateUI()
}
/*=====END OF UPDATEMONSTER()===================*/

/*RESETEO DE LOS SPRITES ORIGINALES*/
const resetMonstersVisuals = () => {
  dom.imgPlayer.src = getPath('monster', GameData.player.sprites.idle);
  dom.imgEnemy.src = getPath('monster', GameData.enemy.sprites.idle);
};

/***INICIO DE FUNCION UI DE LOS SPRITES Y SISTEMA PUNTAJE ***/

const updateUI = () => {
  /*ACTUALIZMOS TEXTOS DE LOS PUNTOS*/
  dom.txtScorePlayer.innerText = gameState.scores.player.points
  dom.txtScoreEnemy.innerText = gameState.scores.enemy.points

  /*ACTUALIZAMOS EL TAMAÑO DE LOS SPRITES*/
  dom.imgPlayer.style.transform = `scale(${MOD_CONFIG.baseScale + gameState.scores.player.growth})`
  dom.imgEnemy.style.transform = `scale(${MOD_CONFIG.baseScale + gameState.scores.enemy.growth})`
}
/*=====END OF UPDATEUI()===================*/

/**ETAPA SIETE DEL JUEGO**/
/***INICIO FUNCION DE FIN DE NIVEL Y DEL JUEGO***/

const endLevel = () => {
  clearInterval(gameState.timerInterval)
  const won = gameState.scores.player.points > gameState.scores.enemy.points

  const topDiv = dom.gameBlock.querySelector(".top")
  topDiv.innerHTML = "" /*LIMPIAMOS CONTENEDOR DE PREGUNTAS*/

  const endBlock = document.createElement("div")
  endBlock.className = "end-level"

  /*LOGICA PARA COMPROBAR SI HAY MAS NIVELES*/
  const nextLevel = gameState.level + 1
  const hasNextLevel = GameData.levels[nextLevel] !== undefined

  if (hasNextLevel) {
    /*FIN DEL PRIMER NIVEL*/
    if (won) gameState.audio.sfx.win.play()
    else gameState.audio.sfx.lose.play()

    endBlock.innerHTML = `
            <h2 class="text-h2">${won ? "GOOD JOB!" : "LEVEL COMPLETED"}</h2>
            <p class="text-h3">Score: ${gameState.scores.player.points}</p>
            <button class="btn--rounded" id="btn-next">Next Level</button>
        `
    topDiv.appendChild(endBlock)

    document.getElementById("btn-next").onclick = () => {
      startLevel(nextLevel)
    }

  } else {
    /*FIN DEL JUEGO */
    finishGame()
  }
}
/*=====END OF ENDLEVEL()===================*/


/***INICIO FUNCION DE FIN DEL JUEGO***/

const finishGame = () => {
  clearInterval(gameState.timerInterval) /*DETENEMOS BARRA DE TIEMPO*/
  const won = gameState.scores.player.points > gameState.scores.enemy.points/*DECLARAMOS EL GANADOR*/
  const topDiv = dom.gameBlock.querySelector(".top")
  topDiv.innerHTML = ""/*LIMPIAMOS CONTENEDOR DE PREGUNTAS*/

  /*CARGAMOS EFECTO DE SONIDOS PARA GANADOR O PERDEDOR*/
  if (won) gameState.audio.sfx.win.play()
  else gameState.audio.sfx.lose.play()

  /*ACTUALIZAMOS LOS SPRITES DE ACUERDO AL PUNTAJE*/
  dom.imgPlayer.src = getPath('monster', won ? GameData.player.sprites.win : GameData.player.sprites.lose)
  dom.imgEnemy.src = getPath('monster', !won ? GameData.enemy.sprites.win : GameData.enemy.sprites.lose)

  const endBlock = document.createElement("div")
  endBlock.className = "end-level end-game"

  /* RENDERIZAMOS EL BLOQUE DE FINAL DE JUEGO Y GUARDADO DE PUNTAJES */
  endBlock.innerHTML = `
        <h2 class="text-h2">${won ? "VICTORY!" : "GAME OVER"}</h2>
        <p class="text-h3">Total Score: ${gameState.scores.player.points}</p>
        <button class="btn--rounded" id="btn-save">Save Score</button>
        <button class="btn--rounded" id="btn-menu">Exit</button>
    `

  topDiv.appendChild(endBlock)

  document.getElementById("btn-menu").onclick = () => location.reload()/*BOTON REGRESO AL MENU*/
  document.getElementById("btn-save").onclick = showScoreForm /*BOTON PARA FORMULARIO DE GUARDADO PUNTOS*/
}

/*=====END OF FINISHGAME()===================*/

/**ETAPA SIETE DEL JUEGO**/
/***INICIO FUNCION DE FORMULARIO TABLERO DE PUNTAJES***/

const showScoreForm = () => {
  const topDiv = dom.gameBlock.querySelector(".top")
  /* RENDERIZAMOS FORMULARIO TABLERO DE PUNTAJES */
  const scoresform = `
        <div class="score-board">
            <h2 class="text-h2">Hall of Fame</h2>
            <p>Game: ${GameData.title}</p>
            <form id="score-form" class="score-form">
                <input type="text" id="player-name" placeholder="Your Name" maxlength="12" required>
                <p>Score: <strong>${gameState.scores.player.points}</strong></p>
                <button type="submit" class="btn--rounded">Submit</button>
            </form>
            <div id="high-scores-list"></div>
        </div>
    `

  topDiv.innerHTML = scoresform
  loadHighScores() /*CARGAMOS TABLERO VACIO O CON PUNTAJES EXIST.*/

  document.getElementById("score-form").onsubmit = (e) => {
    e.preventDefault()
    saveScore()
  }
}
/*=====END OF SHOWSCOREFORM()===================*/

/***INICIO FUNCION DE TABLERO DE PUNTAJES***/
const loadHighScores = () => {
  const key = GameData.gameId /*CLAVE ÚNICA DEL JUEGO*/
  const saved = JSON.parse(localStorage.getItem(key)) || []
  const listDiv = document.getElementById("high-scores-list")

  /*ORDENAMOS Y GUARDAMOS LOS CINCO PRIMEROS PUNTAJES MAS ALTOS*/
  saved.sort((a, b) => b.score - a.score)
  const top5 = saved.slice(0, 5)
  /*RENDERIZAMOS EL TABLERO DE PUNTAJE*/
  let scoreTable = `<table class="score-table">
        <thead><tr><th>#</th><th>Name</th><th>Score</th></tr></thead>
        <tbody>`

  top5.forEach((s, i) => {
    scoreTable += `<tr><td>${i + 1}</td><td>${s.name}</td><td>${s.score}</td></tr>`
  })
  scoreTable += `</tbody></table>`
  if (top5.length > 0) listDiv.innerHTML = scoreTable
}

/*=====END OF LOADHIGHSCORES()===================*/

/***INICIO FUNCION DE GUARDADO DE PUNTAJE***/
const saveScore = () => {
  const name = document.getElementById("player-name").value.trim()
  if (!name) return

  const key = GameData.gameId
  const saved = JSON.parse(localStorage.getItem(key)) || []

  saved.push({
    name: name,
    score: gameState.scores.player.points,
    date: new Date().toISOString()
  })

  localStorage.setItem(key, JSON.stringify(saved))

  /*RACARGAMOS TABLERO DE PUNTAJES*/
  loadHighScores()
  document.getElementById("score-form").style.display = "none"/*OCULTAMOS EL FORMULARIO*/

  /*BOTON DE SALIDA*/
  const exitBtn = document.createElement("button")
  exitBtn.className = "btn--rounded"
  exitBtn.innerText = "Back to Menu"
  exitBtn.onclick = () => location.reload()
  document.querySelector(".score-board").appendChild(exitBtn)
}

/*=====END OF SAVESCORE()===================*/