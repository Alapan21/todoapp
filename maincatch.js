const electron = require('electron');
const { ipcRenderer } = electron;

const { fileReader, fileWriter } = require('./file-reader');

// select list container
const ul = document.querySelector('ul');

// catching item
// storing it as part of list
ipcRenderer.on('item:add', function (e, item) {
    ul.className = 'collection';
    const li = document.createElement('li');
    li.className = 'colection-item teal accent-1';
    const itemdata = document.createTextNode(item);
    li.appendChild(itemdata);
    ul.appendChild(li);
});

// clearing all
ipcRenderer.on('item:clear', () => {
    ul.innerHTML = '';
    ul.className = '';
});

// remove items

ul.addEventListener('dblclick', rmvItem);

function rmvItem(e) {
    e.target.remove();
    if (ul.children.length == 0) {
        ul.className = '';
    }
}