document.getElementById('cutForm').addEventListener('submit', (e) => {
    console.log('successfully intercepted');
    e.preventDefault();
});