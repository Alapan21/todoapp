const electron = require('electron');
const { ipcRenderer } = electron;

// select form
const form = document.querySelector('form');
// when submit is clicked submit function occurs
form.addEventListener('submit', submitForm);

// submit form function
function submitForm(e) {
    // data disspation prevention
    e.preventDefault();
    // payload
    const item = document.querySelector('#item').value;
    //sending to index.js for index.js to catch
    ipcRenderer.send('item:add', item);
}
