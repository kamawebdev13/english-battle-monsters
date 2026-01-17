(function() {
    console.log("CARGANDO CONFIGURACION (GameData)...")


/* games/pastsimplebattles/config.js */

const GameData = {
    /*DATOS DE IDENTIFICACION*/

    gameId: "english-battle-past-simple",
    rootFolder: "games/pastsimplebattles",
    title: "Past Simple Battle",

    /*DATOS GRAFICOS DEL JUEGO*/

    theme: {
        backgroundImage: "url('games/pastsimplebattles/images/monsters/ps-background.webp')",
    },

    /*INSTRUCCIONES*/

    instructions: {
        title: "How to Play?",
        steps: [
            "You will see a sentence about the past with a missing verb (___).",
            "Choose the correct <strong>Past Simple</strong> form to complete the sentence.",
            "You have <strong>3 options</strong>. Click the correct one.",
            "You have two Levels (Regular & Irregular) and <strong>10 seconds</strong> per question.",
            "If your answer is <strong>correct</strong>, you win points and Pasty grows.",
            "If your answer is <strong>wrong</strong>, you lose points and Pasty gets smaller.",
            "Try to defeat Sucker and get the <strong>highest score</strong>.",
            "At the end of the game, write your <strong>name</strong> to save your score."
        ],
        buttonText: "Play"
    },

    /*CONFIGURACION DE LOS SPRITES/ MONSTRUOS*/
  

    player: {
        name: "Pasty",
        sprites: {
         
            idle: "pasty-angry.webp",
            win: "pasty-happy.webp",
            lose: "pasty-sad.webp"
        }
    },
    enemy: {
        name: "Stinker",
        sprites: {
       
            idle: "stinker-angry.webp",
            win: "stinker-happy.webp",
            lose: "stinker-sad.webp"
        }
    },

    /*NIVELES*/

    levels: {
        /*NIVEL 1: REGULAR VERBS (-ED)*/
        1: {
            time: 10,
            introAudio: 'games/pastsimplebattles/sounds/actions/level-start.mp3',
            questions: [
                {
                    src: "level1-question-01.webp",
                    alt: "boy-playing-football",
                    question: "Yesterday, I ___ football with my friends.",
                    options: ["play", "played", "playing"],
                    correct: "played",
                    sentence: "Yesterday, I played football with my friends.",
                    audio: "level1-question-01.mp3"
                },
                {
                    src: "level1-question-02.webp",
                    alt: "girl-watching-tv",
                    question: "She ___ a movie last night.",
                    options: ["watched", "watches", "watch"],
                    correct: "watched",
                    sentence: "She watched a movie last night.",
                    audio: "level1-question-02.mp3"
                },
                {
                    src: "level1-question-03.webp",
                    alt: "chef-cooking",
                    question: "My dad ___ dinner for us.",
                    options: ["cook", "cooked", "cooks"],
                    correct: "cooked",
                    sentence: "My dad cooked dinner for us.",
                    audio: "level1-question-03.mp3"
                },
                {
                    src: "level1-question-04.webp",
                    alt: "family-visiting-grandma",
                    question: "We ___ our grandmother last Sunday.",
                    options: ["visited", "visit", "visiting"],
                    correct: "visited",
                    sentence: "We visited our grandmother last Sunday.",
                    audio: "level1-question-04.mp3"
                },
                {
                    src: "level1-question-05.webp",
                    alt: "man-cleaning-car",
                    question: "He ___ his car yesterday morning.",
                    options: ["clean", "cleaned", "cleans"],
                    correct: "cleaned",
                    sentence: "He cleaned his car yesterday morning.",
                    audio: "level1-question-05.mp3"
                }
            ]
        },

        /*NIVEL 2: IRREGULAR VERBS*/
        2: {
            time: 10,
            introAudio: 'games/pastsimplebattles/sounds/actions/level-two.mp3',
            questions: [
                {
                    src: "level2-question-01.webp",
                    alt: "girl-going-to-park",
                    question: "I ___ to the park yesterday.",
                    options: ["go", "goed", "went"],
                    correct: "went",
                    sentence: "I went to the park yesterday.",
                    audio: "level2-question-01.mp3"
                },
                {
                    src: "level2-question-02.webp",
                    alt: "boy-eating-pizza",
                    question: "He ___ pizza for lunch.",
                    options: ["ate", "eat", "eated"],
                    correct: "ate",
                    sentence: "He ate pizza for lunch.",
                    audio: "level2-question-02.mp3"
                },
                {
                    src: "level2-question-03.webp",
                    alt: "woman-buying-shirt",
                    question: "She ___ a new t-shirt.",
                    options: ["buyed", "bought", "buy"],
                    correct: "bought",
                    sentence: "She bought a new t-shirt.",
                    audio: "level2-question-03.mp3"
                },
                {
                    src: "level2-question-04.webp",
                    alt: "man-seeing-bird",
                    question: "We ___ a beautiful bird in the tree.",
                    options: ["see", "saw", "seen"],
                    correct: "saw",
                    sentence: "We saw a beautiful bird in the tree.",
                    audio: "level2-question-04.mp3"
                },
                {
                    src: "level2-question-05.webp",
                    alt: "girl-writing-letter",
                    question: "Sarah ___ a letter to her friend.",
                    options: ["write", "writed", "wrote"],
                    correct: "wrote",
                    sentence: "Sarah wrote a letter to her friend.",
                    audio: "level2-question-05.mp3"
                }
            ]
        }
    }
}
window.GameData = GameData;

})();

/*====================END OF CODE======================= */
