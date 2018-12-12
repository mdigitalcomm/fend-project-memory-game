/*Main Game functions*/
const game = {
	 moveN: 0,
	 ui: {
		 card: document.getElementsByClassName('card'),
		 deck: document.getElementsByClassName('deck'),
		 open: document.getElementsByClassName('card open'),
		 match: document.getElementsByClassName('match'),
		 container: document.querySelector('.container'),
		 restart: document.querySelector('.restart'),
		 starN: document.querySelector('.stars').children,
		 displayTime: document.getElementsByClassName('time')[0]
	 }
 }

reset = () => {
	const cards = Array.prototype.slice.call(game.ui.card)
	game.moveN = 0;
	stars();
	resetTimer();
	printMove();
	unflipAll();
	createNewCards();
}

// Shuffle function from http://stackoverflow.com/a/2450976
shuffle = array => {
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
unflipAll = () => {
	for (let i=0; i<16; i++) {
		game.ui.card[i].classList.remove('match', 'open', 'show', 'shake','enlarge');
	}
	// Add container animation effect
	game.ui.container.classList.remove('enlarge');
	void game.ui.container.offsetWidth;
	game.ui.container.classList.add('enlarge');

}

flipAll = () => {
	for (let i=0; i<16; i++) {
		game.ui.card[i].classList.add('match');
	}
}

createNewCards = () => {
	let newDeck = document.createElement('div');
	let cards = Array.prototype.slice.call(game.ui.card)
	shuffle(cards);
	//   - loop through each card and create its HTML
	cards.map(card => {
		let newCard = card.outerHTML;
		newDeck.insertAdjacentHTML('beforeend', newCard);
		//   - add all cards' HTML to the page
		game.ui.deck[0].innerHTML = newDeck.innerHTML;
	});
}

//- Set up event listener for a card, if clicked, display the card's symbol
flipCard = (evt) => {
	evt.target.classList.add('open');
	evt.target.classList.add('show');
}


// If 2 cards are open, check to see if the two cards match
matchCard = () => {
	if (game.ui.open.length === 2) {

		//if the cards do match, lock the cards in the open position
		if (game.ui.open[0].innerHTML === game.ui.open[1].innerHTML) {
			setTimeout(lock, 200);
			animate('enlarge');
		//  if the cards do not match, remove the cards from the list and hide the card's symbol
		} else {
			animate('shake');
			setTimeout(unflip, 300);

		}
		game.moveN++;
	}
}


//Keep the animation effects when the game board is reshuffled
animate = (e) => {
	for (let i=0; i<game.ui.open.length; i++) {
	game.ui.open[i].classList.remove(e);
	void game.ui.open[i].offsetWidth;
	game.ui.open[i].classList.add(e);
	}
}

//Lock cards when they match
lock = () => {
		while (game.ui.open.length>0) {
			game.ui.open[0].classList.add('match');
			game.ui.open[0].classList.remove('show', 'open');
		}
}

//Unflip cards when they don't match
unflip = () => {
	while (game.ui.open.length>0) {
		game.ui.open[0].classList.remove('show', 'open');
	}
}

//Display number of moves
printMove = () => {
	const moves = document.querySelector('.moves');
	if (game.moveN <= 1) {
		moves.innerText = `${game.moveN} move`;
	} else {
		moves.innerText = `${game.moveN} moves`;
	}
}

//Set stars according to number of moves
stars = () => {
	const fullStar = "<i class= 'fa fa-star'>";
	const halfStar = "<i class= 'fa fa-star-half-o'>";
	const emStar = "<i class='fa fa-star-o'>";
	if (game.moveN >= 0) {
		for (let i=0; i<3; i++) {
			game.ui.starN[i].innerHTML = fullStar
		}
		if (game.moveN > 13) {
			// 2.5 stars
			game.ui.starN[2].innerHTML = halfStar;
			//2 stars
			if (game.moveN > 20) {
				game.ui.starN[2].innerHTML = emStar;
				//1.5 stars
				if (game.moveN > 30) {
					game.ui.starN[1].innerHTML = halfStar;
					if (game.moveN > 40) {
						game.ui.starN[1].innerHTML = emStar;
					}
				}
			}
		}
	}
}

/* Timer functions */
//Display a timer on the screen

let timerVariables = {
  minutes: 0,
  seconds: 0,
  t: null,
  timerOn: 0
}

timer = () => {
	game.ui.displayTime.textContent = (timerVariables.minutes > 9 ? timerVariables.minutes : `0${timerVariables.minutes}`) + ":" + (timerVariables.seconds > 9 ? timerVariables.seconds : `0${timerVariables.seconds}`);
	timerVariables.seconds++;
	secToMin();
	timerVariables.t =	setTimeout(() => { timer(); }, 1000);

}

//Turn seconds to minutes
secToMin = () => {
	if (timerVariables.seconds >= 60) {
		timerVariables.seconds = 0;
		timerVariables.minutes++;
	}
}

startTimer = () => {
	if (!timerVariables.timerOn) {
		timerVariables.timerOn = 1;
		timer();
	}
}

stopTimer = () => {
	clearTimeout(timerVariables.t);
	timerVariables.timerOn = 0;
}

resetTimer = () => {
	timerVariables.seconds = 0;
	timerVariables.minutes = 0;
	game.ui.displayTime.textContent = "00:00";
}

/* Modal functions */
// If all cards have matched, display a message with the final score in a modal
const modal = {
	modalOn: 0,
	ui: {
		myModal: document.getElementById('myModal'),
		cross: document.getElementsByClassName('close')[0],
		cancel: document.getElementById('cancel'),
		replay: document.getElementById('replay'),
		showStars: document.getElementsByClassName('showStars')[0],
		starList: document.getElementsByClassName('stars')[0],
		timeUsed: document.getElementsByClassName('timeUsed')[0],
	 	movesText: document.getElementsByClassName('movesText')[0]

	}
}

showModal = () => {
	if (game.ui.match.length === 16) {
		stopTimer();
		printModal();
	}
}

//Set content of the modal
printModal = () => {
	modal.ui.myModal.style.display = "block";
	modal.ui.showStars.innerHTML = modal.ui.starList.innerHTML;
	modal.ui.timeUsed.textContent = game.ui.displayTime.textContent;
	modal.ui.movesText.textContent = `${game.moveN}`;
}

closeModal = () => {
	modal.ui.myModal.style.display = "none";
}

/*Click events of the app*/
//Click replay again to shuffle cards to start a new game
modal.ui.replay.onclick = () => {
	closeModal();
	reset();
}

//Click cancel to close modal
modal.ui.cancel.onclick = () => {
	closeModal();
}

modal.ui.cross.addEventListener('click', closeModal);

game.ui.container.addEventListener('click', function (evt) {
	if (evt.target.tagName === 'LI') {
		setTimeout(flipCard(evt), 0);
		startTimer();
	setTimeout(matchCard, 0);
	setTimeout(printMove, 500);
	setTimeout(stars, 0);
	setTimeout(showModal, 2000);
	}
});

game.ui.restart.addEventListener('click', reset);
window.onload = reset();
