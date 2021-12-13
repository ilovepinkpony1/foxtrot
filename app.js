import { questions, playlists } from './data.js'

window.addEventListener('load', () => {
  const results = []
  const textWrapper = document.querySelector('.uklon .questionWrapper')
  const answerButtonPositive = document.querySelector('.uklon .answerButtonPositive')
  const answerButtonNegative = document.querySelector('.uklon .answerButtonNegative')
  const answersWrapper = document.querySelector('.uklon .answersWrapper')
  const image = document.querySelector('.uklon .imageWrapper img')
  const links = document.querySelectorAll('.uklon .linksWrapper a')

  textWrapper.innerHTML = questions[0].text

  const handlePositiveAnswer = () => {
    results.push(true)
    handleCurrentQuestion()
  }

  const handleNegativeAnswer = () => {
    results.push(false)
    handleCurrentQuestion()
  }

  const handleEnd = () => {
    answersWrapper.classList.add('answersWrapperHidden')
    const currentPlaylist = playlists.find(playlist => {
      return results.every((result, index) => {
        return result === playlist.requiredAnswersList[index]
      })
    })

    console.log(currentPlaylist);

    links.forEach(link => {
      link.classList.add('linkVisible')
    })
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

  answerButtonPositive.addEventListener('click', handlePositiveAnswer)
  answerButtonNegative.addEventListener('click', handleNegativeAnswer)
})