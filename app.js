document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let width = 10
    let bombAmount = 20
    let flags = 0
    let squares = []
    let isGameOver = false

    // create board
    function createBoard() {

        //get shuffled game array with random bombs

        // make an array with the bombAmount && fill it with strings "bomb"
        const bombsArray = Array(bombAmount).fill('bomb')
        // create an empty array for the remain squares
        const emptyArray = Array(width*width - bombAmount).fill('valid')
        // join the arrays
        const gameArray = emptyArray.concat(bombsArray)
        // and shuffle
        const shuffledArray = gameArray.sort(() => Math.random() -0.5)
        

        for (let i = 0; i < width*width; i++) {
            // create divs
            const square = document.createElement('div')
            // set every div with an unique id
            square.setAttribute('id', i)
            // add a class with the random string value
            square.classList.add(shuffledArray[i])
            // let's put the divs inside grid
            grid.appendChild(square)
            // push the squares inside the array
            squares.push(square)

            // normal click
            square.addEventListener('click', function(e) {
                click(square)
            })

            //ctrl and left click
            square.oncontextmenu = function(e) {
                e.preventDefault()
                addFlag(square)
            }
        }

        // add numbers
        for (let i = 0; i < squares.length; i++) {
            let total = 0
            // if the number is divisible by the width and the remainder is 0
            const isLeftEdge = (i % width === 0)
            // if its divisible by the width and the remainder is 9
            const isRightEdge = (i % width === -1)

            // if the square contains a class of 'valid'
            if (squares[i].classList.contains('valid')) {
                // if i is bigger than 0 && is not at the left edge && has a bomb at the left
                // add 1 to total
                if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('bomb')) total++
                // if i is larger than 9 && is not at the right edge
                // && the square in the index +1 has a bomb, add 1 to total
                if (i > 9 && !isRightEdge && squares[i +1 -width].classList.contains('bomb')) total++
                // if i is larger than 10 && the square above it has a bomb, add 1 to total
                if (i > 10 && squares[i -width].classList.contains('bomb')) total++
                // if i is bigger than 11 && is not at the left edge && the square directly to the left
                // && one up, add 1 to total
                if (i > 11 && !isLeftEdge && squares[i -1 -width].classList.contains('bomb')) total++
                // if i is smaller than 98 && is not at the right edge
                // && the square at the right has a bomb, add 1 to total
                if (i < 98 && !isRightEdge && squares[i +1].classList.contains('bomb')) total++
                // if i is smaller than 90 && is not at the left edge &&
                // the square at the left and above has a bomb, add 1 to total
                if (i < 90 && !isLeftEdge && squares[i -1 +width].classList.contains('bomb')) total++
                // if i is smaller than 88 && is not at the right edge &&
                // the square at the right and above has a bomb, add q to total
                if (i < 88 && !isRightEdge && squares[i +1 +width].classList.contains('bomb')) total++
                // if i is smaller than 89 && the square above contains a bomb, add 1 to total
                if (i < 89 && squares[i +width].classList.contains('bomb')) total++

                // get the square we're checking and set attributes with the total
                squares[i].setAttribute('data', total)
            }
        }



    }
    createBoard()


    // add flag with right click
    function addFlag(square) {
        if (isGameOver) return
        if (!square.classList.contains('checked') && flags < bombAmount) {
            if (!square.classList.contains('flag')) {
                square.classList.add('flag')
                square.innerHTML = '🚩'
                flags++
                checkForWin()
            } else {
                square.classList.remove('flag')
                square.innerHTML = ''
                flags--
            }
        }
    }



    // click on square actions
    function click(square) {
        let currentId = square.id
        if (isGameOver) return
        if (square.classList.contains('checked') || square.classList.contains('flag')) return
        if (square.classList.contains('bomb')) {
            gameOver(square)
        } else {
            let total = square.getAttribute('data')
            if (total != 0) {
                square.classList.add('checked')
                square.innerHTML = total
                return
            }
            checkSquare(square, currentId)
        }
        square.classList.add('checked')
    }

    // check neighboring squares once square is clicked
    function checkSquare(square, currentId) {
        const isLeftEdge = (currentId % width === 0)
        const isRightEdge = (currentId % width === width -1)

        setTimeout(() => {
            if (currentId > 0 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 9 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1 -width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 10) {
                const newId = squares[parseInt(currentId -width)].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 11 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1 -width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 98 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 90 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1 +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 88 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1 +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 89) {
                const newId = squares[parseInt(currentId) +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
        }, 10)
    }

    //game over
    function gameOver(square) {
        console.log('game over')
        isGameOver = true
        
        // show all the bombs
        squares.forEach(square => {
            if (square.classList.contains('bomb')) {
                square.innerHTML = '💣'
            }
        })
    }

    //check for win
    function checkForWin() {
        let matches = 0
        for (let i = 0; i < squares.length; i++) {
            if(squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
                matches++
            }
            if (matches === bombAmount) {
                console.log('You win!')
                isGameOver = true
            }
        }
    }


})