const userText = document.getElementById('userText');
const cutBtn = document.getElementById('cutBtn');
const displayCut = document.getElementById('displayCut');
const shuffleBox = document.getElementById('shuffle');
const reverseBox = document.getElementById('reverse');
// const chunkSelector = document.querySelector('input[name="chunkSelect"]:checked');

// let chunkSize = Number(chunkSelector.value);
let chunkSize = 2;

cutBtn.addEventListener('click', updateCut);

function updateCut(){
    // copy user text to array
    let cutArray = userText.value.split(' ');
    // alter array in the specified way
    let completedCut = mutateCut(cutArray);
    // update the display
    displayCut.textContent = completedCut;
}

function mutateCut(array){
    // alter array based on controls
    // order: chunk, then reverse, then shuffle
    if(chunkSize > 1){
        array = chunk(array, chunkSize);
    }
    if(reverseBox.checked) array.reverse();
    if(shuffleBox.checked) {array = shuffle(array);}
    return array.join(' ');
}

function chunk(array, chunk){
    let arrayCopy = [];
    // loop over future length of copied array
    for(let i = 0; i < array.length/chunk; i++){
        // init empty array at [i]
        arrayCopy[i] = [];
        // loop over original array & push each to [i]
        for(let j = i*chunk; j < i*chunk+chunk; j++){
            arrayCopy[i].push(array[j]);
        }
        // merge all arrays on [i] into string
        arrayCopy[i] = arrayCopy[i].join(' ');
    }
    return arrayCopy;
}

function shuffle(array){
    let arrayCopy = array.slice();
    // shuffle array using fisher-yates alg
    for(let idx1 = arrayCopy.length-1; idx1 > 0; idx1--){
        let idx2 = Math.floor(Math.random()*(idx1+1));
        [arrayCopy[idx1], arrayCopy[idx2]] = [arrayCopy[idx2], arrayCopy[idx1]];
    }
    return arrayCopy;
}