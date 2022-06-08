export const renderIntroduction = (APP,INTRO_DIV, TITLE, INTRO_BUTTON, CONTAINER) => {
    INTRO_DIV.classList.add('introduction')
    TITLE.classList.add('intro-title')
    INTRO_BUTTON.classList.add('intro-button')
    CONTAINER.classList.add('container')

    INTRO_BUTTON.addEventListener('click', () => {
        INTRO_BUTTON.classList.add('expansion-1')
        INTRO_BUTTON.innerHTML = ''
        INTRO_BUTTON.style.cursor = 'default'
        INTRO_BUTTON.append(CONTAINER)
        setTimeout(() => {
            CONTAINER.style.display = 'flex'
            setTimeout(() => {
                CONTAINER.style.opacity = '1'
                TITLE.style.display = 'none'
            },1000)
        }, 1000)
    },{ once: true })

    APP.append(INTRO_DIV)
    INTRO_DIV.append(TITLE,INTRO_BUTTON)
}