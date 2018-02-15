/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName('card');
let cards = Array.prototype.slice.call(card);
const container = document.querySelector('.container')
const restart = document.querySelector('.restart');
let deck = document.getElementsByClassName('deck');
let open = document.getElementsByClassName('card open');
let match = document.getElementsByClassName('match');
let moveN = 0;

//   - shuffle the list of cards using the provided "shuffle" method below
function reset() {
	moveN = 0;
	stars();
	unflipAll();
	shuffle(cards);
	createNewCards();	
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
	for (let i=0; i<16; i++) {
		card[i].classList.remove('match', 'open', 'show', 'shake', 'bump');
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
	if (open.length >= 2) {

		//if the cards do match, lock the cards in the open position
		if (open[0].innerHTML === open[1].innerHTML) {
			animate('bump');
			setTimeout(lock, 500);
			
		}
		
		//  if the cards do not match, remove the cards from the list and hide the card's symbol
		else {
			animate('shake');
			setTimeout(unflip, 500);
			
		}
		moveN++;
	} 
}

function animate(e) {
	for (let i=0; i<2; i++) {
	open[i].classList.remove(e);
	void open[i].offsetWidth;
	open[i].classList.add(e);
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

//Set stars according to number of moves
let starN = document.querySelector('.stars').children;
function stars () {
	const fullStar = "<i class= 'fa fa-star'>";
	const halfStar = "<i class= 'fa fa-star-half-o'>";
	const emStar = "<i class='fa fa-star-o'>";
	if (moveN >= 0) {
		for (let i=0; i<3; i++) {
			starN[i].innerHTML = fullStar
		}
		if (moveN > 10) {
			// 2.5 stars
			starN[2].innerHTML = halfStar;
			if (moveN > 13) {
				starN[2].innerHTML = emStar;
				if (moveN > 16) {
					starN[1].innerHTML = halfStar;
					if (moveN > 20) {
						starN[1].innerHTML = emStar;
					}
				}
			}
		}
	}	
}

// If all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
function congrat() {
	if (match.length === 16) {
		if(confirm(`Congratulations! You used ${moveN} steps to finish! Would you like to have another one?`)) {
			reset();
		} 
	}
}


container.addEventListener('click', function (evt) {		
	if (evt.target.tagName === 'LI') {
		setTimeout(flipCard(evt), 0);
	}	
	setTimeout(matchCard, 0);
	setTimeout(printMove, 500);
	setTimeout(stars, 0);
	setTimeout(congrat, 3000);
});

restart.addEventListener('click', reset);
