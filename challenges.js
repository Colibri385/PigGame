

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
(Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100.
 (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1.
 (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

// Challenge 1

// GESTION SCORES

var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

var x = document.querySelector('#score-0').textContent;



// Click sur button-dice + fonction déclarée directement car on en a pas besoin 
// de l'appeler autrement que par le click.

document.querySelector('.btn-roll').addEventListener('click', function () {

    // partie non terminée 

    if (gamePlaying) {

                
            // 1. tirage nombre aléatoire
            var dice = Math.floor(Math.random() * 6) + 1;

            // 2. afficher le résultat
            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png';

            // tirage est double 6 perdu joueur suivant

            if (dice === 6 && lastDice === 6) {
                score[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = 0;
                nextPlayer();
            }
            // 3. affiche le score sauf si le nombre est égal à 1
            else if (dice !== 1) {
                    // Additionne le score
                    roundScore += dice;
                    document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                    // joueur suivant
                    nextPlayer();
            }

            lastDice = dice; 
    }
});


document.querySelector('.btn-hold').addEventListener('click', function () {
        
        if(gamePlaying) {

        // Mettre le score du tirage dans le Total général général
        scores[activePlayer] += roundScore;

        // mise à jour

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var finalScore = document.querySelector('.final-score').value;

        // Undefined, 0, null or "" are Coerced to false
        // sinon false

        if(finalScore) {

        }


        // vérifie si le joueur a gagné la partie 

        if (scores[activePlayer] >= finalScore) {

                document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                document.querySelector('.dice').style.display = 'none';
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                gamePlaying =false;
        } else {
                // joueur suivant
                nextPlayer();
        };

 }
        
});


function nextPlayer() {
        if (activePlayer === 0) {
                activePlayer = 1;
        } else {
                activePlayer = 0;
        }
        roundScore = 0;

        // Affiche le roundScore à 0 après chaque changement de joueur
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        // si "active" est défini le supprimer sinon l'ajouter
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        // document.querySelector('.player-0-panel').classList.remove('active');
        // Sdocument.querySelector('.player-1-panel').classList.add('active');

        document.querySelector('.dice').style.display = 'none';

};

// initialise le jeu
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
        scores = [0, 0];
        roundScore = 0;
        activePlayer = 0;
        finalScore = document.getElementsByClassName('finalScore').value
        // gestion de fin de partie  - début partie variale true
        gamePlaying = true;

        document.querySelector('.dice').style.display = 'none';

        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
}

// TEST 
//  document.querySelector('#current-' + activePlayer).textContent = dice;

// Inserer du text avec une balise html 
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';