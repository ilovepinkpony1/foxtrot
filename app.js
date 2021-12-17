import { questions, playlists } from './data.js'

window.addEventListener('load', () => {
  const results = []
  const textWrapper = document.querySelector('.uklon .gameScreen .questionWrapper')
  const answerButtonPositive = document.querySelector('.uklon .gameScreen .answerButtonPositive')
  const answerButtonNegative = document.querySelector('.uklon .gameScreen .answerButtonNegative')
  const answersWrapper = document.querySelector('.uklon .gameScreen .answersWrapper')
  const image = document.querySelector('.uklon .resultScreen img')
  const links = document.querySelectorAll('.uklon .resultScreen .linksWrapper a')

  const startButton = document.querySelector('.uklon .startScreen .answerButton')
  const startScreen = document.querySelector('.uklon .startScreen')
  const gameScreen = document.querySelector('.uklon .gameScreen')
  const resultScreen = document.querySelector('.uklon .resultScreen')

  textWrapper.innerHTML = questions[0].text

  const handlePositiveAnswer = () => {
    results.push(true)
    handleCurrentQuestion()
  }

  const handleNegativeAnswer = () => {
    results.push(false)
    handleCurrentQuestion()
  }

  const handleStartGame = () => {
    startScreen.classList.add('startScreenHidden')

    setTimeout(() => {
      startScreen.remove()

      gameScreen.classList.add('gameScreenDisplay')

      setTimeout(() => {
        gameScreen.classList.add('gameScreenVisible')
      }, 100);
    }, 1000);
  }

  const handleEnd = () => {
    const currentPlaylist = playlists.find(playlist => {
      return results.every((result, index) => {
        return result === playlist.requiredAnswersList[index]
      })
    })


    gameScreen.classList.add('gameScreenHidden')
    image.setAttribute('src', currentPlaylist.imageLink)

    setTimeout(() => {
      gameScreen.remove()
      resultScreen.classList.add('resultScreenDisplay')

      setTimeout(() => {
        resultScreen.classList.add('resultScreenVisible')
        setTimeout(() => {
          links.forEach((link) => {
            link.classList.add('linkVisible')
          })
        }, 1000);
      }, 100);
    }, 1000);
  }

  const handleCurrentQuestion = () => {
    textWrapper.classList.add('questionWrapperHidden')

    const currentQuestion = questions.find(question => {
      if (question.requiredAnswersList.length) {
        return results.every((result, index) => {
          return result === question.requiredAnswersList[index]
        })
      }

      return false
    })

    if (currentQuestion) {
      setTimeout(() => {
        textWrapper.innerHTML = currentQuestion.text
        textWrapper.classList.remove('questionWrapperHidden')
      }, 1000);

    } else {
      handleEnd()
    }
  }

  startButton.addEventListener('click', handleStartGame)
  answerButtonPositive.addEventListener('click', handlePositiveAnswer)
  answerButtonNegative.addEventListener('click', handleNegativeAnswer)
})