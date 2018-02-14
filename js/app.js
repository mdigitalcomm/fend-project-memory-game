/*
 * Create a list that holds all of your cards
 */
let array = [...document.getElementsByClassName('card')];

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
 * - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*/


let deck = document.querySelector('.deck');
let open = document.getElementsByClassName('open');
let match = document.getElementsByClassName('match');
let move = 0;

function flipCard(evt) {
	evt.target.classList.toggle('open');
	evt.target.classList.toggle('show');

}


/*  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*/ 

function matchCard() {
	if (open.length === 2) {
		if (open[0].innerHTML === open[1].innerHTML) {lock();}
		else {unflip();}	
	}
	setTimeout(matchCard, 2000);
}

function lock() {	 	
	for (i=0; i<2; i++) {
		open[i].classList.add('match');
		open[i].classList.remove('show');
	}	
	open[0].classList.remove('open');
	open[0].classList.remove('open');
}

function unflip() {
	for (let i=0; i<2; i++) {
		open[i].classList.remove('show');	
 	}
 	open[0].classList.remove('open');
 	open[0].classList.remove('open');

}

function congrat() {
	if (match.length === 16) {
	alert(`Congratulations!You've used x steps!`)
	}
}


deck.addEventListener('click', function () {
	deck.addEventListener('click', flipCard);
	matchCard();
});

deck.addEventListener('click', congrat);


 
/*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
