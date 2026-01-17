
(function() {
    console.log("CARGANDO CONFIGURACION (GameData)...");

/* games/prepositionsbattles/config.js*/
/*ESTE JS ES LA PLANTILLA BASE Y PUEDE EDITARSE PARA CADA JUEGO*/ 

/*DECLARAMOS UNA VARIABLE OBJETO QUE CONTIENE TODA LA DATA DEL JUEGO*/

const GameData = {
    /*DATOS DE IDENTIFICACION*/

    gameId: "english-battle-vol1",
    rootFolder: "games/prepositionsbattles",
    title: "Prepositions Battle",

    /*DATOS GRAFICOS DEL JUEGO*/

    theme: {
        backgroundImage: "url('games/prepositionsbattles/images/monsters/pb-background.webp')",

    },

    /*INSTRUCCIONES*/

    instructions: {
        title: "How to Play?",
        steps: [
            "You will see a sentence with a missing word (___).",
            "Choose the correct <strong>preposition</strong> to complete the sentence.",
            "You have <strong>3 options</strong>. Click the correct one.",
            "You have two Levels and <strong>10 seconds</strong> to answer each question.",
            "If your answer is <strong>correct</strong>, you win points and your monster grows.",
            "If your answer is <strong>wrong</strong>, you lose points and your monster gets smaller.",
            "Try to get the <strong>highest score</strong>.",
            "At the end of the game, write your <strong>name</strong> to save your score."
        ],
        buttonText: "Play"
    },

    /*CONFIGURACION DE LOS SPRITES/ MONSTRUOS*/

    player: {
        name: "Prepo",
        sprites: {
            idle: "prepo-angry.webp",
            win: "prepo-happy.webp",
            lose: "prepo-sad.webp"
        }
    },
    enemy: {
        name: "Meaner",
        sprites: {
            idle: "meanerprepo-angry.webp",
            win: "meanerprepo-happy.webp",
            lose: "meanerprepo-sad.webp"
        }
    },

    /*NIVELES*/

    levels: {
        1: {
            time: 10,
            introAudio: 'games/prepositionsbattles/sounds/actions/level-start.mp3',
            questions: [
                {
                    src: "level1-question-01.webp",
                    alt: "office",
                    question: "The book is ___ the table.",
                    options: ["in", "on", "at"],
                    correct: "on",
                    sentence: "The book is on the table.",
                    audio: "level1-question-01.mp3"
                },
                {
                    src: "level1-question-02.webp",
                    alt: "woman-walking-in-Madrid",
                    question: "She lives ___ Madrid.",
                    options: ["in", "on", "at"],
                    correct: "in",
                    sentence: "She lives in Madrid.",
                    audio: "level1-question-02.mp3"
                },
                {
                    src: "level1-question-03.webp",
                    alt: "woman-checking-her-watch",
                    question: "We meet ___ 5 o'clock.",
                    options: ["in", "on", "at"],
                    correct: "at",
                    sentence: "We meet at 5 o'clock.",
                    audio: "level1-question-03.mp3"
                },
                {
                    src: "level1-question-04.webp",
                    alt: "cat-sitting-in-a-box",
                    question: "The cat is ___ the box.",
                    options: ["in", "on", "into"],
                    correct: "in",
                    sentence: "The cat is in the box",
                    audio: "level1-question-04.mp3"

                },
                {
                    src: "level1-question-05.webp",
                    alt: "man-putting-his-phone-into-his-pocket",
                    question: "He put the phone ___ his pocket.",
                    options: ["in", "into", "on"],
                    correct: "into",
                    sentence: "He put the phone into his pocket",
                    audio: "level1-question-05.mp3"

                }
            ]

        },

        2: {
            time: 10,
            introAudio: 'games/prepositionsbattles/sounds/actions/level-two.mp3',
            questions: [
                {
                    src: "level2-question-01.webp",
                    alt: "people-waiting-bus-stop",
                    question: "They are waiting ___ the bus stop.",
                    options: ["at", "in", "on"],
                    correct: "at",
                    sentence: "They are waiting at the bus stop.",
                    audio: "level2-question-01.mp3"
                },
                {
                    src: "level2-question-02.webp",
                    alt: "keys-table-morning",
                    question: "I left my keys ___ the table this morning.",
                    options: ["on", "in", "at"],
                    correct: "on",
                    sentence: "I left my keys on the table this morning.",
                    audio: "level2-question-02.mp3"
                },
                {
                    src: "level2-question-03.webp",
                    alt: "man-arriving-airport",
                    question: "He arrived ___ the airport early.",
                    options: ["at", "in", "to"],
                    correct: "at",
                    sentence: "He arrived at the airport early.",
                    audio: "level2-question-03.mp3"
                },
                {
                    src: "level2-question-04.webp",
                    alt: "children-playing-garden",
                    question: "The children are playing ___ the garden.",
                    options: ["in", "at", "on"],
                    correct: "in",
                    sentence: "The children are playing in the garden.",
                    audio: "level2-question-04.mp3"
                },
                {
                    src: "level2-question-05.webp",
                    alt: "picture-wall-living-room",
                    question: "There is a picture hanging ___ the wall.",
                    options: ["on", "in", "at"],
                    correct: "on",
                    sentence: "There is a picture hanging on the wall.",
                    audio: "level2-question-05.mp3"
                }
            ]


        }
    }
}

window.GameData = GameData

})();

/*====================END OF CODE======================= */
