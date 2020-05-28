document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const scoreCard = document.querySelector('.score')
  const scoreStatus = document.querySelector('.scoreTitle')
  let width = 10
  let bombCount = 20
  let flagCount = 0
  let squareCount = 80
  let totalScore = 0
  let allSquares = []

  // create board
  function createBoard() {
    // creating bombs
    for(let i = 0; i < bombCount; i++) {
      const bomb = document.createElement('div')
      bomb.setAttribute('type', 'bomb')
      bomb.setAttribute('flag', false)
      bomb.setAttribute('status', 'hidden')
      bomb.addEventListener('click', clickBomb)
      bomb.classList.add('unchecked')
      allSquares.push(bomb)
    }
    // creating normal squares
    for(let i = 20; i < width*width; i++) {
      const normalSquare  = document.createElement('div')
      normalSquare.setAttribute('type', 'square')
      normalSquare.setAttribute('status', 'hidden')
      normalSquare.setAttribute('flag', false)
      normalSquare.classList.add('unchecked')
      normalSquare.addEventListener('click', clickSquare)
      allSquares.push(normalSquare)
    }
    allSquares.sort(() => Math.random() - 0.5) // shuffle all squares array
    for(let i = 0; i < width*width; i++) {
      allSquares[i].setAttribute('id', i)
      allSquares[i].oncontextmenu = function(e) {
        e.preventDefault()
        addFlag(allSquares[i])
      }
    }
    allSquares.forEach(square => grid.appendChild(square))
    scoreCard.innerHTML = totalScore
  }
  createBoard()

  function addFlag(square) {
    if(flagCount === bombCount) {
      alert('max number of flags reached')
    } else if (allSquares[square.id].getAttribute('flag') === 'false') {
        allSquares[square.id].setAttribute('flag', true)
        allSquares[square.id].innerHTML = '🚩'
        flagCount += 1
    } else {
      allSquares[square.id].setAttribute('flag', false)
      allSquares[square.id].innerHTML = ''
      flagCount -= 1
    }
  }

  // label safe squares with numbers
  function countBombInSquareSpace() {
    for(let i = 0; i < width*width; i++) {
      square = allSquares[i]
      let totalBombs = 0
      if(square.getAttribute('type') === 'square') {
        if(i < 90 && allSquares[i + 10].getAttribute('type') === 'bomb') totalBombs += 1 // bottom
        if((i % 10 !== 9) && (i < 90) && allSquares[i + 11].getAttribute('type') === 'bomb') totalBombs += 1 // bottom right
        if((i % 10 !== 9) && allSquares[i + 1].getAttribute('type') === 'bomb') totalBombs += 1 // right
        if((i % 10 !== 9) && (i > 9) && allSquares[i - 9].getAttribute('type') === 'bomb') totalBombs += 1  // top right
        if((i > 9) && allSquares[i - 10].getAttribute('type') === 'bomb') totalBombs += 1 // top
        if((i > 9) && (i % 10 !== 0) && allSquares[i - 11].getAttribute('type') === 'bomb') totalBombs += 1 // top left
        if((i % 10 !== 0) && allSquares[i - 1].getAttribute('type') === 'bomb') totalBombs += 1  // left
        if((i % 10 !== 0) && (i < 90) && allSquares[i + 9].getAttribute('type') === 'bomb') totalBombs += 1 // bottom left
        square.setAttribute('bombsAroundMe', totalBombs)
      }
    }
  }
  countBombInSquareSpace()


  function clickBomb() {
    allSquares[this.id].innerHTML = '💣'
    scoreCard.innerHTML = ''
    scoreStatus.innerHTML = 'Game Over'
  }

  function checkSquare(id) {
    let square = allSquares[id]
    let squareType = allSquares[id].getAttribute('type')
    let squareStatus = allSquares[id].getAttribute('status')
    let bombsAroundMe = parseInt(allSquares[id].getAttribute('bombsAroundMe'))
    if(squareType !== 'bomb') {
      if(squareStatus === 'hidden') {
        totalScore += bombsAroundMe // incrementing total score
        square.setAttribute('status', 'traversed')
        square.innerHTML = square.getAttribute('bombsAroundMe')
        square.classList.add('checked')
        if(bombsAroundMe === 0) {
          if(id < 90) checkSquare(id + 10) // bottom
          if((id % 10 !== 9) && (id < 90)) checkSquare(id + 11) // bottom right
          if(id % 10 !== 9)  checkSquare(id + 1) // right
          if((id % 10 !== 9) && (id > 9)) checkSquare(id - 9) // top right
          if(id > 9) checkSquare(id - 10) // top
          if((id > 9) && (id % 10 !== 0)) checkSquare(id - 11) // top left
          if(id % 10 !== 0) checkSquare(id - 1) // left
          if((id % 10 !== 0) && (id < 90)) checkSquare(id + 9)// bottom left
        }
      }
    }
    scoreCard.innerHTML = totalScore
  }

  function clickSquare() {
    squareId = this.id
    checkSquare(parseInt(squareId))
  }

  function checkWin() {
    let total = 0
    let result
    allSquares.forEach(square => {
      if((square.getAttribute('type') === 'bomb') && (square.getAttribute('flag') === 'true')) total += 1
    })
    if(total === 20) {
      flagTotal = 0
      scoreCard.innerHTML = ''
      scoreStatus.innerHTML = 'Game Won'
    }
  }

  window.setInterval(function() {
    checkWin()
  })

})
