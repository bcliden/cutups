const form = document.querySelector('form');
const textArea = form.querySelector('#textArea');
const chunkSize = form.querySelector('select[name="chunkSelect"]');
const reverseBool = form.querySelector('input[name="reverseBox"]');
const shuffleBool = form.querySelector('input[name="shuffleBox"]');
const resultArea = document.querySelector('div.resultsDiv p');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let cut = {
        text: textArea.value,
        chunk: Number(chunkSize.value),
        reverse: reverseBool.checked,
        shuffle: shuffleBool.checked,
        array: [],
        cut: "",
    };
    handleCut(cut);
});

form.addEventListener('reset', () => {
    resultArea.textContent = 'Your results will appear here.';
});

function handleCut(data) {
    // pass data obj as first arg, then remaining fns in order
    let results = pipe(data, splitText, chunkCut, shuffleCut);
    resultArea.textContent = results.array.join(' ');
    console.log(results.array.join(' '));
}

function pipe (data, ...fns) {
    // nests the functions together, no limit
    return fns.reduce((acc, next) => {
        return next(acc);
    }, data);
}

function splitText (data) {
    data.array = data.text.split(' ');
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