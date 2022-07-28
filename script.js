// Selected elements 
const score0El = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.getElementsByClassName('player')[0];
const player1El = document.getElementsByClassName('player')[1];

const disceEl = document.getElementsByClassName('dice')[0];
const btnNew = document.getElementsByClassName('btn')[0];
const btnRoll = document.getElementsByClassName('btn')[1];
const btnHold = document.getElementsByClassName('btn')[2];

let scores, currentScore, activePlayer, playing;

// Setting the selected elements to default
const init = function(){    
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;   

    score0El.textContent = 0;
    score1EL.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    disceEl.classList.add('hidden');

    player0El.classList.remove(`player--winner`);
    player1El.classList.remove(`player--winner`);

    player0El.classList.add(`player--active`); 
    player1El.classList.remove(`player--active`);    
};

init();

const switchPlayer = function(){
    // Switch players
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// Rolloing dice functionality
btnRoll.addEventListener('click', function(){
    if (playing){
        // Generate a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;  

        // Display results
        disceEl.classList.remove('hidden');
        disceEl.src = `dice-${dice}.png`;

        // Check for rolled 1, if ture, switch to next player
        if(dice !== 1){
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else{
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click', function(){
    if(playing){
        // Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // Check if platyers score is >= 100
        if(scores[activePlayer] >= 100){
            playing = false
            document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
            document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
        }
        else{
        // Switch to the next player
        switchPlayer();
        }
    }
})

btnNew.addEventListener('click', init);