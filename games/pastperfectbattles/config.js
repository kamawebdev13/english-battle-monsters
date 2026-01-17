(function() {
    console.log("CARGANDO CONFIGURACION (GameData)...")

/* games/pastperfectbattles/config.js */

const GameData = {
    /*DATOS DE IDENTIFICACION*/

    gameId: "english-battle-past-perfect",
    rootFolder: "games/pastperfectbattles",
    title: "Past Perfect Battle",

    /*DATOS GRAFICOS DEL JUEGO*/

    theme: {
        backgroundImage: "url('games/pastperfectbattles/images/monsters/pp-background.webp')",
    },

    /*INSTRUCCIONES*/

    instructions: {
        title: "How to Play?",
        steps: [
            "You will see a sentence about the past with a missing verb (___).",
            "Choose the correct <strong>Past Perfect</strong> form (had + past participle).",
            "You have <strong>3 options</strong>. Click the correct one.",
            "You have two Levels and <strong>10 seconds</strong> per question.",
            "If your answer is <strong>correct</strong>, you win points and Pasty grows.",
            "If your answer is <strong>wrong</strong>, you lose points and Pasty gets smaller.",
            "Try to defeat Stinker and get the <strong>highest score</strong>.",
            "At the end of the game, write your <strong>name</strong> to save your score."
        ],
        buttonText: "Play"
    },

    /*CONFIGURACION DE LOS SPRITES / MONSTRUOS*/

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
        /*NIVEL 1: AFFIRMATIVE SENTENCES*/
        1: {
            time: 10,
            introAudio: 'games/pastperfectbattles/sounds/actions/level-start.mp3',
            questions: [
                {
                    src: "level1-question-01.webp",
                    alt: "finished-homework",
                    question: "When I arrived, he ___ his homework.",
                    options: ["has finished", "had finished", "finished"],
                    correct: "had finished",
                    sentence: "When I arrived, he had finished his homework.",
                    audio: "level1-question-01.mp3"
                },
                {
                    src: "level1-question-02.webp",
                    alt: "eating-already",
                    question: "They ___ dinner before the movie started.",
                    options: ["had eaten", "have eaten", "ate"],
                    correct: "had eaten",
                    sentence: "They had eaten dinner before the movie started.",
                    audio: "level1-question-02.mp3"
                },
                {
                    src: "level1-question-03.webp",
                    alt: "left-house",
                    question: "The bus ___ when I got to the station.",
                    options: ["leave", "had left", "has left"],
                    correct: "had left",
                    sentence: "The bus had left when I got to the station.",
                    audio: "level1-question-03.mp3"
                },
                {
                    src: "level1-question-04.webp",
                    alt: "seen-movie",
                    question: "She told me she ___ that film before.",
                    options: ["had seen", "saw", "has seen"],
                    correct: "had seen",
                    sentence: "She told me she had seen that film before.",
                    audio: "level1-question-04.mp3"
                },
                {
                    src: "level1-question-05.webp",
                    alt: "lost-keys",
                    question: "I couldn't enter because I ___ my keys.",
                    options: ["lose", "had lost", "lost"],
                    correct: "had lost",
                    sentence: "I couldn't enter because I had lost my keys.",
                    audio: "level1-question-05.mp3"
                }
            ]
        },

        /*NIVEL 2: NEGATIVE & QUESTIONS*/
        2: {
            time: 10,
            introAudio: 'games/pastperfectbattles/sounds/actions/level-two.mp3',
            questions: [
                {
                    src: "level2-question-01.webp",
                    alt: "not-visited",
                    question: "We ___ that museum until last year.",
                    options: ["hadn't visited", "haven't visited", "didn't visited"],
                    correct: "hadn't visited",
                    sentence: "We hadn't visited that museum until last year.",
                    audio: "level2-question-01.mp3"
                },
                {
                    src: "level2-question-02.webp",
                    alt: "question-meeting",
                    question: "___ you met him before the party?",
                    options: ["Did", "Had", "Have"],
                    correct: "Had",
                    sentence: "Had you met him before the party?",
                    audio: "level2-question-02.mp3"
                },
                {
                    src: "level2-question-03.webp",
                    alt: "not-studied",
                    question: "She failed because she ___ enough.",
                    options: ["hadn't studied", "hasn't studied", "didn't study"],
                    correct: "hadn't studied",
                    sentence: "She failed because she hadn't studied enough.",
                    audio: "level2-question-03.mp3"
                },
                {
                    src: "level2-question-04.webp",
                    alt: "already-gone",
                    question: "By the time I called, he ___ out.",
                    options: ["had gone", "has gone", "went"],
                    correct: "had gone",
                    sentence: "By the time I called, he had gone out.",
                    audio: "level2-question-04.mp3"
                },
                {
                    src: "level2-question-05.webp",
                    alt: "forgotten-name",
                    question: "I realized I ___ her name.",
                    options: ["forget", "had forgotten", "forgot"],
                    correct: "had forgotten",
                    sentence: "I realized I had forgotten her name.",
                    audio: "level2-question-05.mp3"
                }
            ]
        }
    }
}
window.GameData = GameData

})();