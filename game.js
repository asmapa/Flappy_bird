var hole = document.getElementById("hole");
var block = document.getElementById("block");
var bird = document.getElementById("bird");
var jumping = 0; 
var score = 0;
var gameInterval; // Store the interval ID

// Change the event listener to change hole position and increment score
hole.addEventListener('animationiteration', function() {
    var random = (Math.random() * 500); 
    hole.style.top = random + "px";
    score++;
});

// Start the game loop
function startGame() {
    gameInterval = setInterval(function() {
        var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
        var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
        var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
        var holeHeight = parseInt(window.getComputedStyle(hole).getPropertyValue("height"));
        var birdHeight = bird.clientHeight;

        if (jumping === 0) {
            bird.style.top = (birdTop + 3) + "px"; 
        }

        // Check collision with block
        if (blockLeft <= 290 && blockLeft >= 150) { 
            if (birdTop < holeTop || birdTop + birdHeight > holeTop + holeHeight) {
                gameOver();
            }
        }

        // Check if the bird falls below the window
        if (birdTop + birdHeight >= window.innerHeight) {
            gameOver();
        }
    }, 8);
}

// Game over function
function gameOver() {
    clearInterval(gameInterval); // Stop the game loop
    document.getElementById("container").style.display = "flex"; // Show game over screen
    document.getElementById("over").innerHTML = "Game Over -score" + score; // Show score
    score = 0; // Reset score
}

// Jump function
function jump() {
    if (jumping === 0) { // Allow jumping only if not already jumping
        jumping = 1;  
        let jumbCount = 0; 

        var jumbInterval = setInterval(function() {
            var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));

            if (birdTop > 6) { 
                bird.style.top = (birdTop - 5) + "px";  
            }

            if (jumbCount > 10) {  
                clearInterval(jumbInterval);  
                jumping = 0;  
                jumbCount = 0;  
            }

            jumbCount++;  
        }, 10);
    }
}

function restartGame() {
    // Reset game state
    clearInterval(gameInterval); // Stop the game loop if it's running
    document.getElementById("container").style.display = "none"; // Hide game over screen
    bird.style.top = "90px"; // Reset bird position
    score = 0; // Reset score
    
    // Start the game again
    startGame();
}

// Attach the restart function to the button
document.getElementById("restart").addEventListener("click", restartGame);

document.getElementById("btn-click").onclick=function(){
    window.location.href = "index.html";
}

// Start the game loop when the script loads
startGame();
