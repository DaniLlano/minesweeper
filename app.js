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
        const gameArray = emptyArray.concat(bombsArray)
        // and shuffle
        const shuffledArray = gameArray.sort(() => Math.random() -0.5)
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
                if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('bomb')) total++
                // if i is larger than 9 && is not at the right edge
                // && the square in the index +1 has a bomb
                if (i > 9 && !isRightEdge && squares[i +1 -width].classList.contains('bomb')) total++
            }
        }



    }
    createBoard()


})