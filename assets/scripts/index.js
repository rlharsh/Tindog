import Dog from "./dog.js";
import { randomName, randomBio } from "./randomData.js"

// Copy the primary array
let dogDataCopy = []
let randomDogImages = []

// Boolean Operators
let currentlyWaiting = false;

// Buttons
document.querySelector( ".round--button__yes" ).addEventListener( 'click', likeDog );
document.querySelector( ".round--button__no" ).addEventListener( 'click', dislikeDog );

// Containers
let badgeContainer = document.querySelector(".badge")

// The dog object
let currentDog = {}

function setVariables( val ) {
    currentlyWaiting = true;

    currentDog.hasBeenSwiped = true;
    currentDog.hasBeenLiked = val;

    displayBadge( val );

    setTimeout(() => {
        processNewDog();
    }, 1000);
    displayBadge( val );
}

function likeDog() {
    if ( currentlyWaiting ) { return };
    setVariables( true );
}

function dislikeDog() {
    if ( currentlyWaiting ) { return };
    setVariables( false );
}


function displayBadge( val ) {
    // Set the badge to either 'Like' / 'Nope' depending upon
    // the passed variable.
    val ? badgeContainer.classList.add( 'badge--like' ) : badgeContainer.classList.add( 'badge--dislike' );
}

function processNewDog() {
    // Check if the data copy contains any more values if not
    // then display the out of dogs screen.
    if ( dogDataCopy.length > 0 ) {
        currentDog = new Dog( getNewDog() );
        renderCard();
    } else {
        outOfDogs();
    }

    // Clear any visible badges.
    clearBadges();

    // Reset the waiting boolean so the user may select another dog
    // (if applicable.)
    currentlyWaiting = false;
}

function clearBadges() {
    badgeContainer.classList.remove( 'badge--like' )
    badgeContainer.classList.remove( 'badge--dislike' )
}

function outOfDogs() {
    createArrayBase();
}

function renderCard() {
    document.querySelector('#card').innerHTML = currentDog.getDogHtml();
    document.querySelector('.dog-image').style.backgroundImage = `url( ${ currentDog.avatar } )`;
}

function createArrayBase() {
    $.getJSON('https://dog.ceo/api/breeds/image/random/50', function(data) {
        randomDogImages = [...data.message]    
        
         populateDatabase();

    });
}

function populateDatabase() {
    
    dogDataCopy = randomDogImages.map( function(val) {
        return new Dog(
            {
                name: randomName[Math.floor(Math.random() * randomName.length)],
                avatar: val,
                age: Math.floor(Math.random() * (60 - 18 + 1) + 18),
                bio: randomBio[Math.floor(Math.random() * randomBio.length)],
                hasBeenSwiped: false,
                hasBeenLiked: false
            }
        )
    });

    processNewDog();
    renderCard();

}

// If another dog is in queue return it, otherwise return an empty object.
const getNewDog = () => dogDataCopy.length > 0 ? dogDataCopy.shift() : {};

createArrayBase();

