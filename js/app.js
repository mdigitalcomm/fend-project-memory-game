/*
 * Create a list that holds all of your cards
 */
let cards = Array.prototype.slice.call(document.getElementsByClassName('card'));
const container = document.querySelector('.container')
const restart = document.querySelector('.restart');
let deck = document.getElementsByClassName('deck');
let open = document.getElementsByClassName('card open');
let match = document.getElementsByClassName('match');
let moveN = 0;

//   - shuffle the list of cards using the provided "shuffle" method below
function reset() {
	shuffle(cards);
	unflipAll();
	createNewCards();
	moveN = 0;
}

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


//Unflip all open cards before reset
function unflipAll() {
	while (match.length>0) {
		match[0].classList.remove('match');
	}
}

function createNewCards() {
	let newDeck = document.createElement('div');

	//   - loop through each card and create its HTML
	for (let i=0; i<cards.length; i++) {
		let newCard = cards[i].outerHTML;
		newDeck.insertAdjacentHTML('beforeend', newCard);	
	}
	//   - add each card's HTML to the page
	deck[0].innerHTML = newDeck.innerHTML;	
}


//- Set up event listener for a card, if clicked, display the card's symbol
function flipCard(evt) {
	evt.target.classList.toggle('open');
	evt.target.classList.toggle('show');
}


// If 2 cards are open, check to see if the two cards match
function matchCard() {
	if (open.length = 2) {
		//if the cards do match, lock the cards in the open position
		if (open[0].innerHTML === open[1].innerHTML) {lock();}
		
		//  if the cards do not match, remove the cards from the list and hide the card's symbol
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

//Display number of moves
function printMove() {
	const moves = document.querySelector('.moves');
	if (moveN <= 1) {
		moves.innerText = `${moveN} move`;
	} else {
		moves.innerText = `${moveN} moves`;
	}

}


// If all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
function congrat() {
	if (match.length === 16) {
	alert(`Congratulations! You used ${moveN} steps to finish!`)
	}
}


container.addEventListener('click', function (evt) {	
	
	if (evt.target.tagName === 'LI') {
		setTimeout(flipCard(evt), 0);
		moveN++;
	}	
	setTimeout(printMove, 0);
	setTimeout(matchCard, 200);
	setTimeout(congrat, 3000);
});

restart.addEventListener('click', reset);
