/*CARROUSEL PARA LA SECCION GAME CARDS*/

/*DECLARAMOS LAS VARIABLES GLOBALES*/

const gameCardsData = [
    {
        id: 1,
        title: "Prepositions Battle",
        href: "./games.html",
        imageJpg: "./assests/images/prepositions-battle-card.jpg",
        imageWebp: "./assests/images/prepositions-battle-card.webp",
        alt: "prepositions-battle-card"
    },
    {
        id: 2,
        title: "Past Simple Battle",
        href: "./games.html",
        imageJpg: "./assests/images/past-simple-battle-card.jpg",
        imageWebp: "./assests/images/past-simple-battle-card.webp",
        alt: "past-simple-battle-card"
    },
    {
        id: 3,
        title: "Phrasal Verbs",
        href: "./games.html",
        imageJpg: "./assests/images/phrasal-verbs-card.jpg",
        imageWebp: "./assests/images/phrasal-verbs-card.webp",
        alt: "phrasal-verbs-card"
    }
]

/*DUPLICAMOS ARRAY PARA EFECTO INFINITO*/
const displayData = [...gameCardsData, ...gameCardsData, ...gameCardsData]


/*VARIABLES DE MOVIMIENTO*/
let cardPlace = 0
let carrouselInterval
let isPaused = false
const container = document.getElementById('gcgrid-container')

/***FUNCIONES***/

/*RENDERIZAMOS LAS TARJETAS*/
const renderCards = () => {
    if (!container) return
    
    container.innerHTML = displayData.map(card => `
        <a href="${card.href}" 
           title="${card.title}" 
           class="game-card" 
           target="_blank"
           rel="noopener noreferrer">
            <picture>
                <source srcset="${card.imageJpg}" type="image/jpg">
                <img loading="lazy" 
                     src="${card.imageWebp}" 
                     alt="${card.alt}">
            </picture>
        </a>
    `).join('')
    
    
}

/*FUNCION PARA PAUSAR EL CARROUSEL*/
const pauseCarrousel = () => {
    isPaused = true
    clearInterval(carrouselInterval)
   
    container.classList.remove('no-hover')
}

/*FUNCION PARA REANUDAR EL CARRUSEL*/
const resumeCarrouselNow = () => {
    if (!isPaused) return
    
    isPaused = false
    container.classList.add('no-hover') 
    controlCarrousel()
}

/*FUNCIONAMIENTO DEL CARROUSEL*/
const controlCarrousel = () => {
    clearInterval(carrouselInterval)

    container.classList.add('no-hover')

    carrouselInterval = setInterval(() => {
    
        cardPlace -= 1 
        container.style.transform = `translateX(${cardPlace}px)`

       /* SI EL CARROUSEL LLEGA A LA MITAD SE DEVUELVE AL INICIO, EN ESTE CASO PORQUE DUPLICAMOS LOS OBJETOS DEL ARRAY*/
        const cardsHalfSet = container.scrollWidth / 3

        if (Math.abs(cardPlace) >= cardsHalfSet) {
            cardPlace = 0 // 
        }

    }, 20) 
}


/*LLAMAMOS FUNCION PARA RENDERIZAR LAS TARJETAS*/
renderCards()

/*REINICIAMOS CARROUSEL*/
controlCarrousel()
if (container) {
    container.addEventListener('mouseenter', pauseCarrousel)
    container.addEventListener('mouseleave', resumeCarrouselNow)}

/*  REANUDAR CARROUSEL DE INMEDIATO AL HACER CLICK FUERA DEL CONTENEDOR DE LAS CARTAS*/
document.addEventListener("click", (e) => {
    if (!e.target.closest(".game-card") && isPaused) {
        resumeCarrouselNow()
    }
})

