let happiness = 100;
let hunger = 100;
let sleep = 100;
let lightsOn = true;

const happinessDisplay = document.getElementById('happiness');
const hungerDisplay = document.getElementById('hunger');
const sleepDisplay = document.getElementById('sleep');
const lightsButton = document.getElementById('lights');

// Toevoegen audio
const lightsSound = new Audio('audio/audio-slapen.mp3');

const body = document.querySelector('body');
const cinnamorroll = document.querySelector('img');

// Updaten van status
function updateStats() {
    happinessDisplay.textContent = happiness;
    hungerDisplay.textContent = hunger;
    sleepDisplay.textContent = sleep;
}

// Honger stats
document.getElementById('feed').addEventListener('click', function() {
    if (hunger < 100) {
        hunger += 10;
        happiness += 5;
        if (happiness > 100) happiness = 100;
        cinnamoroll.src = './images/cinnamoroll-eating.png';
    }
    updateStats();
});

// Geluk stats
document.getElementById('play').addEventListener('click', function() {
    if (happiness < 100) {
        happiness += 10;
        hunger -= 5;
        if (hunger < 0) hunger = 0;
        cinnamoroll.src = './images/cinnamoroll-playing.png';
    }
    updateStats();
});

// Slaap stats
lightsButton.addEventListener('click', function() {
    lightsOn = !lightsOn; // Toggle de status van de lichten
    if (lightsOn) {
        body.classList.remove('slapen'); // Weghalen van het slapen in de body
        cinnamoroll.src = './images/cinnamoroll-standard.png'
        clearInterval(slapen);
        lightsButton.textContent = "Lichten Uit";

        // Stopt het geluid als de lichten weer aan zijn + rewind
        lightsSound.pause();
        lightsSound.currentTime = 0; 
    } else {
        body.classList.add('slapen');
        cinnamoroll.src = './images/cinnamoroll-sleeping.gif';
        slapen = setInterval(function() {        
            if (sleep <= 30)
            sleep += 10;
            else if (sleep < 50)
                sleep += 5;
            else if (sleep < 80){
                sleep += 2;
            }
            else if (sleep < 100){
                sleep += 1;
            }
            else {
                sleep += 0;
            }
            updateStats();
        }, 1000
    );
        if (sleep < 0) sleep = 0;
        lightsButton.textContent = "Lichten Aan";

        // Afspelen van het geluid als de lichten uit staan
        lightsSound.play();
    }

    updateStats();
});

// Periodieke afname van behoeften
setInterval(function() {
    if (lightsOn) {
        sleep -= 5;
    } else {
        happiness -= 2;
    }
    hunger -= 1;

    if (happiness < 0) happiness = 0;
    if (hunger < 0) hunger = 0;
    if (sleep < 0) sleep = 0;

    updateStats();

    // Controleert of een van de stats 0 heeft bereikt
    if (hunger === 0 || happiness === 0 || sleep === 0) {
        cinnamoroll.src = './images/sanrio-white.jpeg';
    }
}, 5000);