const userText = document.getElementById('userText');
const cutBtn = document.getElementById('cutBtn');
const displayCut = document.getElementById('displayCut');

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
    let chunkedArr = chunk(array, chunkSize);
    let shuffledArr = shuffle(chunkedArr);
    return shuffledArr.join(' ');
}

function chunk(array, chunkSize){
    let arrayCopy = [];
    // loop over future length of copied array
    for(let i = 0; i < array.length/chunkSize; i++){
        // init empty array at [i]
        arrayCopy[i] = [];
        // loop over original array & push each to [i]
        for(let j = i*chunkSize; j < i*chunkSize+chunkSize; j++){
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