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
        chunk: chunkSize.value,
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
    splitText(data)
        .then((splitData) => chunkCut(splitData))
        .then((testData) => console.log(testData))
        // .then((splitData) => chunkCut(splitData))
        // .then(() => reverseCut())
        // .then(() => shuffleCut())
        // .then(() => updateCut());
}

function splitText (data) {
    data.array = data.text.split(' ');
    return new Promise ( function (resolve, reject) {
        resolve(data);
    });
}

function chunkCut (data) {
    let array = data.text;
    let chunk = data.chunk;
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
    array = arrayCopy;
    return new Promise( function(resolve, reject) {
        resolve(data);
    })
}


function updateCut() {

}