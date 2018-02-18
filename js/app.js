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
	printMove();
	stopTimer();
	resetTimer();
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
		card[i].classList.remove('match', 'open', 'show', 'shake');
	}
}

function flipAll() {
	for (let i=0; i<16; i++) {
		card[i].classList.add('match');
	}
}

function createNewCards() {
	let newDeck = document.createElement('div');

	//   - loop through each card and create its HTML
	for (let i=0; i<cards.length; i++) {
		let newCard = cards[i].outerHTML;
		newDeck.insertAdjacentHTML('beforeend', newCard);	
	}
	//   - add all cards' HTML to the page
	deck[0].innerHTML = newDeck.innerHTML;	
}


//- Set up event listener for a card, if clicked, display the card's symbol
function flipCard(evt) {
	evt.target.classList.toggle('open');
	evt.target.classList.toggle('show');
}


// If 2 cards are open, check to see if the two cards match
function matchCard() {
	if (open.length === 2) {

		//if the cards do match, lock the cards in the open position
		if (open[0].innerHTML === open[1].innerHTML) {	
			setTimeout(lock, 200);
			animate('enlarge');
		//  if the cards do not match, remove the cards from the list and hide the card's symbol
		} else {
			animate('shake');
			setTimeout(unflip, 300);	

		}
		moveN++;				
	}
}


//Keep the animation effects when the game board is reshuffled
function animate(e) {
	for (let i=0; i<2; i++) {
	open[i].classList.remove(e);
	void open[i].offsetWidth;
	open[i].classList.add(e);
	}
}

//Lock cards when they match
function lock() {	 	
		while (open.length>0) {
			open[0].classList.add('match');
			open[0].classList.remove('show', 'open');
		}		
}

//Unflip cards when they don't match
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
		if (moveN > 13) {
			// 2.5 stars
			starN[2].innerHTML = halfStar;
			//2 stars
			if (moveN > 20) {
				starN[2].innerHTML = emStar;
				//1.5 stars
				if (moveN > 30) {
					starN[1].innerHTML = halfStar;
					if (moveN > 40) {
						starN[1].innerHTML = emStar;
					}
				}
			}
		}
	}	
}


//Display timer
let displayTime = document.getElementsByClassName('time')[0];
let minutes = 0, seconds = 0;
let t;
let timerOn = 0;
function timer() {
	displayTime.textContent = (minutes > 9 ? minutes : `0${minutes}`) + ":" + (seconds > 9 ? seconds : `0${seconds}`);
	seconds++;
	secToMin();
	t =	setTimeout(function() { timer(); }, 1000);
	
}

//Turn seconds to minutes
function secToMin() {
	if (seconds >= 60) {
		seconds = 0;
		minutes++;	
	}
}

function startTimer() {
	if (!timerOn) {
		timerOn = 1;
		timer();
	}
}

function stopTimer() {
	clearTimeout(t);
	timerOn = 0;
}

function resetTimer() {
	seconds = 0;
	minutes = 0;
	displayTime.textContent = "00:00";
}

// If all cards have matched, display a message with the final score in a modal
const modal = document.getElementById('myModal'),
	cancel = document.getElementById('cancel'),
	replay = document.getElementById('replay');

let span = document.getElementsByClassName('close')[0],
	modalOn = 0,
	showStars = document.getElementsByClassName('showStars')[0],
	starList = document.getElementsByClassName('stars')[0],
	timeUsed = document.getElementsByClassName('timeUsed')[0],
 	movesText = document.getElementsByClassName('movesText')[0];

function showModal() {
	if (match.length === 16) {
		stopTimer();
		printModal();
	}
}

//Set content of the modal
function printModal() {
	modal.style.display = "block";
	showStars.innerHTML = starList.innerHTML;
		timeUsed.textContent = displayTime.textContent;
		movesText.textContent = `${moveN}`;
}

function closeModal() {
	modal.style.display = "none";
}

//Close modal when click on the modal screen
window.onclick = function(e) {
	if (e.target == modal) {
		closeModal();
	}
}

//Click replay again to shuffle cards to start a new game
replay.onclick = function() {
	closeModal();
	reset();
}

//Click cancel to close modal
cancel.onclick = function() {
	closeModal();
} 

container.addEventListener('click', function (evt) {		
	if (evt.target.tagName === 'LI') {
		setTimeout(flipCard(evt), 0);
		startTimer();
		
	setTimeout(matchCard, 0);
	setTimeout(printMove, 500);
	setTimeout(stars, 0);
	setTimeout(showModal, 2000);
	}
});

restart.addEventListener('click', reset);
span.addEventListener('click', closeModal);

