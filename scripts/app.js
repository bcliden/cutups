// Todo:
//     - append child vs textContent
//     - paragraphs optional

const form = document.forms.cutForm;
const { textArea, chunkSelect, reverseBox, shuffleBox } = form;
const header = document.querySelector('#top');
const modalOpen = document.querySelector('a.icon-modalOpen');
const modalClose = document.querySelector('.modal a.icon-modalClose');
const modal = document.querySelector('.modal');
const resultArea = document.querySelector('.resultsDiv p');

// EVENT LISTENERS

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if( textArea.value ) {
        let cut = {
            text: textArea.value,
            chunk: Number(chunkSelect.value),
            reverse: reverseBox.checked,
            shuffle: shuffleBox.checked,
            array: [],
            splitOn: ' ',
        };
        handleCut(cut);
    }
});

form.addEventListener('reset', () => {
    resultArea.textContent = 'Your results will appear here.';
});

header.addEventListener('click', () => {
    let cut = {
        text: header.textContent,
        shuffle: true,
        array: [],
        splitOn: '',
    };
    handleHeader(cut);
});

header.addEventListener('mouseleave', () => {
    header.textContent = 'Cut-Ups';
});

modalOpen.addEventListener('click', () => {
    let textDiv = document.querySelector('.textDiv');
    modal.style.top = textDiv.offsetTop + 'px';
    modal.style.width = textDiv.offsetWidth + 'px';
    modal.style.height = textDiv.offsetHeight - 4 + 'px';
    modal.classList.add('active');
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.style.top = 0 + 'px';
    modal.style.width = 0 + 'px';
    modal.style.height = 0 + 'px';
});

//  *** FUNCTIONS ***

function handleCut(data) {
    // pass data obj as first arg, then remaining fns in order
    // must reverse before array gets chunked
    let operations = [splitText, reverseCut, chunkCut, shuffleCut];
    let results = pipe(data, operations);
    updatePage(results, resultArea);
}

function handleHeader(data) {
    let operations = [splitText, shuffleCut];
    let results = pipe(data, operations);
    updatePage(results, header);
}

function pipe (data, fns) {
    // nests the functions together, no limit
    return fns.reduce((acc, next) => {
        return next(acc);
    }, data);
}

function splitText (data) {
    data.array = data.text.split(data.splitOn);
    return data;
}

function chunkCut (data) {
    let { array, chunk } = data;
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
    //trim extra space from last entry if necessary
    arrayCopy[arrayCopy.length-1] = arrayCopy[arrayCopy.length - 1].trim();
    data.array = arrayCopy;
    return data;
}

function shuffleCut (data) {
    if( data.shuffle ){
        let arrayCopy = data.array.slice();
        // shuffle array using fisher-yates algorithm
        for(let idx1 = arrayCopy.length-1; idx1 > 0; idx1--){
            let idx2 = Math.floor(Math.random()*(idx1+1));
            [arrayCopy[idx1], arrayCopy[idx2]] = [arrayCopy[idx2], arrayCopy[idx1]];
        }
        data.array = arrayCopy;
    }
    return data;
}

function reverseCut (data) {
    if( data.reverse ){
        data.array.reverse();
    }
    return data;
}

function updatePage(results, area) {
    area.textContent = results.array.join(results.splitOn);
}