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

    let results = pipe(
        [ splitText, chunkCut ],
        data
    );
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
    data.array = arrayCopy;
    return data;
}

function pipe(array, data) {
    return array.reduce((acc, next) => {
        return next(acc(data));
    });
}