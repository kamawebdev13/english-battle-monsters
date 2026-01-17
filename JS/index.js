(function () {
    console.log("CARGANDO INDEX SCRIPT...")

    /**FORMULARIO PARA LOGIN/SIGN UP**/

    /* VARIABLES GLOBALES */
    const key = "user-Signed-Up"
    let isHasLoggedIn = false

    /**EVENTO EN BOTON SIGN UP/LOGIN DEL NAV */
    let userBtn = document.getElementById("user-btn")
    userBtn.addEventListener("click", () => {
        if (isHasLoggedIn) {
            logOut()
        } else {

            renderUserForm()
        }
    })

    /**FUNCION RENDERIZADO DE FORMULARIO **/

    const renderUserForm = () => {
        let userForm = document.getElementById("user-form")

        userForm.classList.toggle("open")

        userForm.innerHTML = ` 
            <form id="ul-form" class="ul-form" action="#" method="POST">
                <input type="text" id="user-name" placeholder="Your User Name" maxlength="12" required>
                <input type="password" id="user-password"  placeholder="Your Password" maxlength="8" required>
                <button type="submit" class="btn--rounded">Submit</button>
            </form>
    `
        document.getElementById("ul-form").onsubmit = (e) => {
            e.preventDefault()
            userSignUp()
        }
    }

    /**FUNCION USER SIGN UP**/

    const userSignUp = () => {

        let userName = document.getElementById("user-name").value.trim()
        if (!userName) return

        let userPassword = document.getElementById("user-password").value.trim()
        if (!userPassword) return

        const userData = {
            name: userName,
            pass: userPassword
        }
        /*GUARDAMOS DATA DEL USUARIO*/
        localStorage.setItem(key, JSON.stringify(userData))
        /*ACTUALIZAMOS LA UI */
        let userTextName = document.getElementById("user-text-name")
        userTextName.innerHTML = `${userName}`

        let userBtn = document.getElementById("user-btn")
        userBtn.innerText = "LOG OUT"
        /*CERRRAMOS FORMULARIO*/
        document.getElementById("user-form").classList.remove("open")
        document.getElementById("user-form").innerHTML = ""

        /*LLAMAMOS FUNCION DE EN CASO USUARIO ESA LOGEADO*/
        isLoggedIn()
    }

    /*PARA CUANDO USER ESTE LOGEADO*/
    const isLoggedIn = () => {

        /*RECUPERAMOS VALOR DE LA KEY*/
        const storedData = localStorage.getItem(key)

        if (storedData) {
            isHasLoggedIn = true

            /*RECUPERAMOS DATA DEL USUARIO*/
            const userData = JSON.parse(storedData)

            /*ACTUALIZAMOS UI*/
            document.getElementById("user-text-name").innerHTML = userData.name
            document.getElementById("user-btn").innerText = "LOG OUT"
        } else {
            isHasLoggedIn = false
        }
    }

    /*FUNCIÓN  LOG OUT */
    const logOut = () => {
        localStorage.removeItem(key)
        isHasLoggedIn = false

        /*ACTUALIZAMOS UI*/
        document.getElementById("user-text-name").innerHTML = "UserName"
        document.getElementById("user-btn").innerText = "LOGIN/SIGN UP"
        alert("Sesión cerrada")
    }
    isLoggedIn()


    /*====================END OF LOGIN/SIGN UP ==============================================*/

    /**EVENTO DE SONIDO PARA GRID DE SPRITES */

    const gridCards = document.querySelectorAll(".grid__card")

    const gridAudio = new Audio("./assests/sounds/pop-sound.mp3")
    gridAudio.volume = 0.7

    gridCards.forEach(card => {

        card.addEventListener('mouseenter', () => {
            gridAudio.currentTime = 0
            gridAudio.play().catch(e => { })
        })
    });


 /*====================END OF EVENTO DE SONIDO ==============================================*/


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

        container.classList.remove('no-hover')/*EVITA EVENTOS CON EL CURSOR*/
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
        container.addEventListener('mouseleave', resumeCarrouselNow)
    }

    /*  REANUDAR CARROUSEL DE INMEDIATO AL HACER CLICK FUERA DEL CONTENEDOR DE LAS CARTAS*/
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".game-card") && isPaused) {
            resumeCarrouselNow()
        }
    })

    /*====================END OF CARROUSEL ==============================================*/


    /**RESPONSIVE**/

    /***EVENTO PARA DESPLIEGUE DE MENU BURGER***/

    const menuLinks = document.getElementById("nav-main-links")
    const menuBurger = document.getElementById("menu-burger")

    menuBurger.addEventListener("click", () => {

        menuLinks.classList.toggle("show-main-links")
    })

})()

 /*====================END OF RESPONSIVE ==============================================*/


