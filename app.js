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
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5)
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
    }
    createBoard()


})