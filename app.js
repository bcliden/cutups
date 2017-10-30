const userText = document.getElementById("userText");
const cutBtn = document.getElementById("cutBtn");
const displayCut = document.getElementById("displayCut");

cutBtn.addEventListener("click", updateCut);

function updateCut(){
    // copy user text to array
    let cutArray = userText.value.split(" ");
    // alter array in the specified way
    let completedCut = mutateCut(cutArray);
    // update the display
    displayCut.textContent = completedCut;
}

function mutateCut(array){
    let chunkedArr = chunkArray(array);
    let shuffledArr = shuffle(chunkedArr);
    return shuffledArr.join(" ");
};


//TODO !!
function chunkArray(array, chunkSize=1){
    let arrayCopy = array.
    for(let i = 1; i < array.length-1; i+=2){

    }
    return array;
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

// userText.split(" ")
// reverse()
// sort()
// join()