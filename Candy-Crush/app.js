document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const width = 8
  const squares = []
  let score = 0

  const candyColors = [
    'url(images/red-candy.png)',
    'url(images/yellow-candy.png)',
    'url(images/orange-candy.png)',
    'url(images/purple-candy.png)',
    'url(images/green-candy.png)',
    'url(images/blue-candy.png)'
  ]

  // create board
  function createBoard() {
    for (let i = 0; i< width * width; i++) {
      const square = document.createElement('div')
      square.setAttribute('draggable', true)
      square.setAttribute('id', i)
      let randomColor = Math.floor(Math.random() * candyColors.length)
      square.style.backgroundImage = candyColors[randomColor]
      grid.appendChild(square)
      squares.push(square)

    }
  }
  createBoard()

  // drag the candies
  squares.forEach(square => square.addEventListener('dragstart', dragStart))
  squares.forEach(square => square.addEventListener('dragenter', dragEnter))
  squares.forEach(square => square.addEventListener('dragover', dragOver))
  squares.forEach(square => square.addEventListener('dragend', dragEnd))
  squares.forEach(square => square.addEventListener('dragleave', dragLeave))
  squares.forEach(square => square.addEventListener('drop', dragDrop))

  let colorBeingDragged
  let colorBeingReplaced
  let squareIdBeingDragged
  let squareIdBeingReplaced

  function dragStart() {
    colorBeingDragged = this.style.backgroundImage
    squareIdBeingDragged = parseInt(this.id)
  }

  function dragOver(e) {
    e.preventDefault()
  }

  function dragEnter(e) {
    e.preventDefault()
  }

  function dragLeave() {
  }

  function dragDrop() {
    colorBeingReplaced = this.style.backgroundImage
    squareIdBeingReplaced = parseInt(this.id)
    this.style.backgroundImage = colorBeingDragged
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
  }

  function dragEnd() {

    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged + 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + width
    ]
    let validMove = validMoves.includes(squareIdBeingReplaced)

    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    } else {
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    }
  }

  // checking for matches in row
  function checkRowForThreeOrFour() {
    for (let row = 0; row < 8; row++ ) {
      rowIncrement = row * 8
      for (let col = 0; col < 5; col++) {
        anchorColor1 = squares[rowIncrement + col].style.backgroundImage
        anchorColor2 = squares[rowIncrement + col + 1].style.backgroundImage

        let idList4 = [
          rowIncrement + col,
          rowIncrement + col + 1,
          rowIncrement + col + 2,
          rowIncrement + col + 3,
        ]
        let idList3Left = idList4.slice(0, 3)
        let idList3Right = idList4.slice(1, 4)

        if (anchorColor1 !== '' && anchorColor2 !== '') {
          const has4 = idList4.every(id => squares[id].style.backgroundImage === anchorColor1)
          const has3Left = idList3Left.every(id => squares[id].style.backgroundImage === anchorColor1)
          const has3Right = idList3Right.every(id => squares[id].style.backgroundImage === anchorColor2)
          if (has4) {
            idList4.forEach(id => {
              squares[id].style.backgroundImage = ''
              scoreDisplay.innerHTML = score
            })
            score += 4
          }

          if (has3Left) {
            idList3Left.forEach(id => {
              squares[id].style.backgroundImage = ''
              scoreDisplay.innerHTML = score
            })
            score += 3
          }

          if (has3Right) {
            idList3Right.forEach(id => {
              squares[id].style.backgroundImage = ''
              scoreDisplay.innerHTML = score
            })
            score += 3
          }
        }
      }
    }
  }

  function checkColumnForThreeOrFour() {
    for (let idx = 0; idx < 40; idx++ ) {
      anchorColor1 = squares[idx].style.backgroundImage
      anchorColor2 = squares[idx + 8].style.backgroundImage

      let idList4 = [idx, idx + 8, idx + 16, idx + 24]
      let idList3Left = idList4.slice(0, 3)
      let idList3Right = idList4.slice(1, 4)

      if (anchorColor1 !== '' && anchorColor2 !== '') {
        const has4 = idList4.every(id => squares[id].style.backgroundImage === anchorColor1)
        const has3Left = idList3Left.every(id => squares[id].style.backgroundImage === anchorColor1)
        const has3Right = idList3Right.every(id => squares[id].style.backgroundImage === anchorColor2)
        if (has4) {
          idList4.forEach(id => {
            squares[id].style.backgroundImage = ''
            scoreDisplay.innerHTML = score
          })
          score += 4
        }

        if (has3Left) {
          idList3Left.forEach(id => {
            squares[id].style.backgroundImage = ''
            scoreDisplay.innerHTML = score
          })
          score += 3
        }

        if (has3Right) {
          idList3Right.forEach(id => {
            squares[id].style.backgroundImage = ''
            scoreDisplay.innerHTML = score
          })
          score += 3
        }
      }
    }
  }

  function moveCandiesDown() {
    for (let idx = 63; idx >= 8; idx--) {
      if (squares[idx].style.backgroundImage === '' && squares[idx - 8].style.backgroundImage !== '') {
        squares[idx].style.backgroundImage = squares[idx - 8].style.backgroundImage
        squares[idx - 8].style.backgroundImage = ''
      }
    }
  }

  function generateNewCandies() {
    for (let idx = 7; idx >= 0; idx--) {
      if (squares[idx].style.backgroundImage === '') {
        squares[idx].style.backgroundImage = candyColors[Math.floor(Math.random() * candyColors.length)]
      }
    }
  }


  window.setInterval(function(){
    checkRowForThreeOrFour()
    checkColumnForThreeOrFour()
    generateNewCandies()
    moveCandiesDown()
  }, 100)
})
