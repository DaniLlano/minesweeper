document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let width = 10
    let squares = []
    let bombAmount = 20

    // create board
    function createBoard() {

        //get shuffled game array with random bombs

        // make an array with the bombAmount && fill it with strings "bomb"
        const bombsArray = Array(bombAmount).fill('bomb')
        // create an empty array for the remain squares
        const emptyArray = Array(width*width - bombAmount).fill('valid')
        // join the arrays
        const gameArray = bombsArray.concat(emptyArray)
        // and shuffle
        const shuffledArray = gameArray.sort(() => Math.random() -0.4)
        console.log(shuffledArray)
        

        for (let i = 0; i < width*width; i++) {
            // create divs
            const square = document.createElement('div')
            // set every div with an unique id
            square.setAttribute('div', i)
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
                console.log(squares)
            }
        }



    }
    createBoard()

    // click on square actions
    function click(square) {
        if (square.classList.contains('bomb')) {
            alert('game over')
        }
    }


})