import { Stage, createWordHolder } from './modules/stages.js'
import { CreateLetters, getWord } from './modules/letters.js'

function deleteChildren (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

function deleteElements () {
  // clear local storage
  window.localStorage.clear()

  // delete the word holder
  deleteChildren(document.getElementById('word-holder'))

  // delete the letter buttons
  deleteChildren(document.getElementById('letters'))
}

function restart () {
  deleteElements()

  stage.changeStage(0)

  const word = getWord()

  createWordHolder(word)

  CreateLetters(word)
}

const stage = new Stage()

const savedStage = window.localStorage.getItem('stage')

if (savedStage !== null) {
  stage.changeStage(parseInt(savedStage))
}

const savedWord = window.localStorage.getItem('word')

let word = ''

if (savedWord !== null) {
  word = savedWord
} else {
  word = getWord()
}

createWordHolder(word)

CreateLetters(word)

const page2 = document.getElementById('page2')

const btn = document.getElementById('btn')

// Click "End Game"
btn.addEventListener('click', function handleClick () {
  if (page2.hidden) {
    page2.style.display = 'block'

    btn.textContent = 'End Game'

    page2.hidden = false

    const savedStatus = window.localStorage.getItem('status')

    if (savedStatus !== null && savedStatus) {
      restart()
      window.localStorage.setItem('status', false)
    }
  } else {
    page2.hidden = true

    page2.style.display = 'none'

    btn.textContent = 'Lets Play'

    restart()
  }
})

export { stage, restart }
