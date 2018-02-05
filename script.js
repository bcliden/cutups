const form = document.querySelector('form');
const textArea = form.querySelector('#textArea');
const chunkSize = form.querySelector('select[name="chunkSelect"]');
const reverseBool = form.querySelector('input[name="reverseBox"]');
const shuffleBool = form.querySelector('input[name="shuffleBox"]');
const resultArea = document.querySelector('div.resultsDiv p');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let config = {
        text: textArea.value,
        chunk: chunkSize.value,
        reverse: reverseBool.checked,
        shuffle: shuffleBool.checked,
    };
    handleCut(config);
});

form.addEventListener('reset', () => {
    resultArea.textContent = 'Your results will appear here.';
});

function handleCut(config) {
    console.dir(config.text);
    console.log(config.chunk);
    console.log(config.reverse);
    console.log(config.shuffle);
}

// resultArea.textContent = 'the script ran';