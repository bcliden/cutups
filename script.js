const form = document.querySelector('form');
const textArea = form.querySelector('textArea[name="textArea"]').value;
const chunkSize = form.querySelector('select[name="chunkSelect"]').value;
const reverseBool = form.querySelector('input[name="reverseBox"]').checked;
const shuffleBool = form.querySelector('input[name="shuffleBox"]').checked;
const resultArea = document.querySelector('div.resultsDiv p');

form.addEventListener('submit', (e) => {
    e.preventDefault();
});

console.log('Shuffle: ', shuffleBool);
console.log('Reverse: ', reverseBool);
console.log('textArea: ', textArea);
console.log('chunkSize: ', chunkSize);



form.addEventListener('reset', () => {
    resultArea.textContent = 'Your results will appear here.';
});

// resultArea.textContent = 'the script ran';