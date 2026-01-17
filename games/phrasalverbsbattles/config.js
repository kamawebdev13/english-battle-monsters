(function() {
    console.log("CARGANDO CONFIGURACION (GameData)...")


/* games/phrasalverbsbattles/config.js */

const GameData = {
    /*DATOS DE IDENTIFICACION*/

    gameId: "english-battle-phrasal-verbs",
    rootFolder: "games/phrasalverbsbattles",
    title: "Phrasal Verbs Battle",

    /*DATOS GRAFICOS DEL JUEGO*/

    theme: {
        backgroundImage: "url('games/phrasalverbsbattles/images/monsters/pv-background.webp')",
    },

    /*INSTRUCCIONES*/

    instructions: {
        title: "How to Play?",
        steps: [
            "You will see a sentence with a missing part of a Phrasal Verb.",
            "Choose the correct <strong>particle</strong> (preposition or adverb) to complete it.",
            "You have <strong>3 options</strong>. Click the correct one.",
            "You have two Levels and <strong>10 seconds</strong> per question.",
            "If your answer is <strong>correct</strong>, you win points and Phrasy grows.",
            "If your answer is <strong>wrong</strong>, you lose points and Phrasy gets smaller.",
            "Try to defeat Sucker and get the <strong>highest score</strong>.",
            "At the end of the game, write your <strong>name</strong> to save your score."
        ],
        buttonText: "Play"
    },

    /*CONFIGURACION DE LOS SPRITES/ MONSTRUOS*/

    player: {
        name: "Phrasy",
        sprites: {
            idle: "phrasy-angry.webp",
            win: "phrasy-happy.webp",
            lose: "phrasy-sad.webp"
        }
    },
    enemy: {
        name: "Sucker",
        sprites: {
            idle: "sucker-angry.webp",
            win: "sucker-happy.webp",
            lose: "sucker-sad.webp"
        }
    },

    /*NIVELES*/

    levels: {
        /*NIVEL 1: DAILY ROUTINES & COMMON ACTIONS*/
        1: {
            time: 10,
            introAudio: 'games/phrasalverbsbattles/sounds/actions/level-start.mp3',
            questions: [
                {
                    src: "level1-question-01.webp",
                    alt: "boy-waking-up",
                    question: "I wake ___ at 7:00 AM every day.",
                    options: ["on", "up", "in"],
                    correct: "up",
                    sentence: "I wake up at 7:00 AM every day.",
                    audio: "level1-question-01.mp3"
                },
                {
                    src: "level1-question-02.webp",
                    alt: "hand-turning-on-light",
                    question: "Please, turn ___ the light. It's dark.",
                    options: ["on", "off", "up"],
                    correct: "on",
                    sentence: "Please, turn on the light. It's dark.",
                    audio: "level1-question-02.mp3"
                },
                {
                    src: "level1-question-03.webp",
                    alt: "girl-putting-on-coat",
                    question: "It is cold outside. Put ___ your coat.",
                    options: ["in", "at", "on"],
                    correct: "on",
                    sentence: "It is cold outside. Put on your coat.",
                    audio: "level1-question-03.mp3"
                },
                {
                    src: "level1-question-04.webp",
                    alt: "student-sitting-down",
                    question: "Please, sit ___ and open your books.",
                    options: ["down", "up", "over"],
                    correct: "down",
                    sentence: "Please, sit down and open your books.",
                    audio: "level1-question-04.mp3"
                },
                {
                    src: "level1-question-05.webp",
                    alt: "man-standing-up",
                    question: "Everyone stood ___ when the teacher entered.",
                    options: ["down", "up", "on"],
                    correct: "up",
                    sentence: "Everyone stood up when the teacher entered.",
                    audio: "level1-question-05.mp3"
                }
            ]
        },

        /*NIVEL 2: ACTIONS & SEARCHING*/
        2: {
            time: 10,
            introAudio: 'games/phrasalverbsbattles/sounds/actions/level-two.mp3',
            questions: [
                {
                    src: "level2-question-01.webp",
                    alt: "girl-looking-for-keys",
                    question: "I can't find my keys. I am looking ___ them.",
                    options: ["after", "at", "for"],
                    correct: "for",
                    sentence: "I can't find my keys. I am looking for them.",
                    audio: "level2-question-01.mp3"
                },
                {
                    src: "level2-question-02.webp",
                    alt: "man-giving-up",
                    question: "This puzzle is too hard. I give ___.",
                    options: ["up", "in", "on"],
                    correct: "up",
                    sentence: "This puzzle is too hard. I give up.",
                    audio: "level2-question-02.mp3"
                },
                {
                    src: "level2-question-03.webp",
                    alt: "woman-trying-on-dress",
                    question: "Can I try ___ this dress?",
                    options: ["on", "in", "up"],
                    correct: "on",
                    sentence: "Can I try on this dress?",
                    audio: "level2-question-03.mp3"
                },
                {
                    src: "level2-question-04.webp",
                    alt: "boy-turning-off-tv",
                    question: "Turn ___ the TV and go to sleep.",
                    options: ["on", "off", "out"],
                    correct: "off",
                    sentence: "Turn off the TV and go to sleep.",
                    audio: "level2-question-04.mp3"
                },
                {
                    src: "level2-question-05.webp",
                    alt: "filling-out-form",
                    question: "Please, fill ___ this form with your name.",
                    options: ["out", "up", "over"],
                    correct: "out",
                    sentence: "Please, fill out this form with your name.",
                    audio: "level2-question-05.mp3"
                }
            ]
        }
    }
}

window.GameData = GameData;

})();

/*====================END OF CODE======================= */
