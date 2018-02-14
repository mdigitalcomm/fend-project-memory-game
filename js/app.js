/*
 * Create a list that holds all of your cards
 */
// let array = [...document.getElementsByClassName('card')];

// Display the cards on the page
//   - shuffle the list of cards using the provided "shuffle" method below


//   - loop through each card and create its HTML


//   - add each card's HTML to the page


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  + increment the move counter and display it on the page (put this functionality in another function that you call from this one)

*/


let deck = document.querySelector('.deck');
let open = document.getElementsByClassName('card open');
let match = document.getElementsByClassName('match');
let moveN = 0;

function flipCard(evt) {
	evt.target.classList.toggle('open');
	evt.target.classList.toggle('show');

}


/*  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/ 


function matchCard() {
	if (open.length >= 2) {
		if (open[0].innerHTML === open[1].innerHTML) {lock();}
		else {unflip();}	
	}
}

function lock() {	 	
	while (open.length>0) {
		open[0].classList.add('match');
		open[0].classList.remove('show', 'open');
	}	
}

function unflip() {
	while (open.length>0) {
		open[0].classList.remove('show', 'open');
	}
}

function printMove() {
	const moves = document.querySelector('.moves');
	if (moveN <= 1) {
		moves.innerText = `${moveN} move`;
	} else {
		moves.innerText = `${moveN} moves`;
	}

}

function congrat() {
	if (match.length === 16) {
	alert(`Congratulations! You used ${moveN} steps to finish!`)
	}
}

deck.addEventListener('click', function (evt) {	
	
	if (evt.target.tagName === 'LI') {
		setTimeout(flipCard(evt), 0);
		moveN++;
	}	
	setTimeout(printMove, 0);
	setTimeout(matchCard, 200);
	setTimeout(congrat, 3000);
});


 

