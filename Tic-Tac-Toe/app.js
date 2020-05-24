document.addEventListener('DOMContentLoaded', () => {
  const turnAlert = document.querySelector('.turnAlert')
  const pieces = document.querySelector('.pieces')
  const checkBoard = document.querySelector('.checkBoard')
  const champion = document.querySelector('.champion')
  champion.innerHTML = '?'
  let squares = []
  let draggedClass
  const checkStyles = ['squareCrossStyle', 'squareCircleStyle']
  const checkCoords = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // zig zags
                      ]

  function populateCheckBoard() {
    for (let i = 0; i < 9; i++) {
      square = document.createElement('div')
      square.classList.add('squareStyle')
      square.setAttribute('id', i)
      square.setAttribute('marked', 'undefined')
      square.addEventListener('dragover', dragOver)
      square.addEventListener('dragenter', dragEnter)
      square.addEventListener('dragleave', dragLeave)
      square.addEventListener('drop', dragDrop)
      checkBoard.appendChild(square)
      squares.push(square)
    }
  }
  populateCheckBoard()

  function populatePieces() {
    cross = document.createElement('div')
    cross.style.backgroundImage = 'url(images/cross.png)'
    cross.classList.add('cross')
    circle = document.createElement('div')
    circle.style.backgroundImage = 'url(images/circle.png)'
    circle.classList.add('circle')
    circle.setAttribute('draggable', true)
    cross.setAttribute('draggable', true)
    circle.addEventListener('dragstart', dragStart)
    circle.addEventListener('dragend', dragEnd)
    cross.addEventListener('dragstart', dragStart)
    cross.addEventListener('dragend', dragEnd)
    pieces.appendChild(cross)
    pieces.appendChild(circle)
  }
  populatePieces()

  function dragStart() {
    draggedClass = this.classList[0]
  }

  function dragEnd() {
    let allSquares = checkBoard.children
    const has3 = checkCoords.some(coords => {
      let markedPiece = allSquares[coords[0]].attributes.marked.value
      if (markedPiece === 'undefined') return false
      return coords.every(coord => {
        return allSquares[coord].attributes.marked.value === markedPiece
      })
    })

    if (has3) {
      console.log(this.classList.value + " won")
      champion.innerHTML = this.classList.value
    }
  }

  function dragOver(e) {
    e.preventDefault()
  }

  function dragEnter(e) {
    e.preventDefault()
    square = document.getElementById(this.id)
    const hasCrossMarked = square.classList.value.includes('squareCrossStyle')
    const hasCircleMarked = square.classList.value.includes('squareCircleStyle')
    if (!hasCrossMarked && !hasCircleMarked) {
      square.classList.add('dragEnterSquare')
    }
  }

  function dragLeave(e) {
    e.preventDefault()
    square = document.getElementById(this.id)
    square.classList.remove('dragEnterSquare')
  }

  function dragDrop() {
    square = document.getElementById(this.id)
    square.classList.remove('dragEnterSquare')
    if (draggedClass === 'cross') {
      square.style.backgroundImage = 'url(images/cross.png)'
      square.classList.add('squareCrossStyle')
      square.setAttribute('marked', 'cross')
    } else {
      square.style.backgroundImage = 'url(images/circle.png)'
      square.classList.add('squareCircleStyle')
      square.setAttribute('marked', 'circle')
    }

  }

})
