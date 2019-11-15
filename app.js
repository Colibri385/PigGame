/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// GESTION SCORES

var scores, roundScore, activePlayer, gamePlaying;

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

                // 3. affiche le score sauf si le nombre est égal à 1
                if (dice !== 1) {
                        // Additionne le score
                        roundScore += dice;
                        document.querySelector('#current-' + activePlayer).textContent = roundScore;
                } else {
                        // joueur suivant
                        nextPlayer();
                }
        }

});


document.querySelector('.btn-hold').addEventListener('click', function () {
        
        if(gamePlaying) {

        // Mettre le score du tirage dans le Total général général
        scores[activePlayer] += roundScore;

        // mise à jour

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


        // vérifie si le joueur a gagné la partie 

        if (scores[activePlayer] >= 100) {

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