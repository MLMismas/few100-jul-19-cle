import { getRandomInt } from "./utils";

let squares: NodeList;
let message: HTMLElement;

export function runApp() {
    let secretSquareId: number;
    const promise = fetch('http://localhost:3000/game');
    console.log('making your request');
    promise.then((response) => {
        response.json().then(x => {
            secretSquareId = x.secret;
            setup();
        })
    })

    function setup() {
        squares = document.querySelectorAll('.square');
        message = document.getElementById('message');
        message.innerText = 'Play the Game!';
        //const secretSquareId = getRandomInt(1, 9); // TODO: actually make this random

        squares.forEach((square, index) => {
            const that = square as HTMLElement;
            that.classList.remove('winner', 'loser');
            that.removeAttribute('data-secret');
            if (index + 1 === secretSquareId) {
                that.dataset.secret = "true";
            } else {
                //that.dataset.secret = "false";
            }
            square.addEventListener('click', handleClick)
        })
    }
}


function handleClick(evt) {
    // evt - mouse event, this - square it happened to
    console.log({ evt, this: this });

    const that = this as HTMLElement;
    if (that.dataset.secret) {
        that.classList.add('winner');

        message.innerText = "You Win! (click here to play again)";
        message.addEventListener('click', runApp);

        squares.forEach((square: HTMLElement) => {
            if (!square.classList.contains('winner')) {
                square.classList.remove('loser');
                square.classList.add('loser');
            }
            square.removeEventListener('click', handleClick);
        })
    } else {
        that.classList.add('loser');
        that.removeEventListener('click', handleClick);
    }
}