const electron = require('electron');

//path and url to windows
const url = require('url');
const path = require('path');

//electron-reload
'use strict';

//electron requirements
const { app, BrowserWindow, Menu, ipcMain } = electron;

//reload sys
require('electron-reload')(__dirname);


//production
process.env.NODE_ENV = 'production';
//windows
let mainWindow;
let addWindow;

// when app is ready
app.on('ready', function () {
    // create a new window
    mainWindow = new BrowserWindow({
        width: 500,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // load html file in application
    // passes file://currentdirectory/index.html as URL to the Browser
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app.html'),
        protocol: 'file:',
        slashes: true
    }));

    // to quit all when app is exited
    mainWindow.on('closed', () => app.quit());

    // build main menu using menu template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // insert menu to the app
    Menu.setApplicationMenu(mainMenu);


});

// handle create addWindow
function createAddWindow() {
    // create a new Window
    addWindow = new BrowserWindow({
        width: 300,
        height: 300,
        title: 'Add new ToDo',
        webPreferences: {
            nodeIntegration: true
        }
    });

    // load html file in application
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    // garbage collection
    addWindow.on('closed', () => {
        addWindow = null;
    });
}

// catch item from app.js
ipcMain.on('item:add', (e, item) => {
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
});


// main menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                accelerator: process.platform == 'darwin' ? 'Command+n' : 'Control+n',
                click: () => createAddWindow()
            },
            {
                label: 'Remove All',
                click: () => { mainWindow.webContents.send('item:clear'); },
                accelerator: process.platform == 'darwin' ? 'Command+Shift+c' : 'Control+Shift+c'
            },
            {
                label: 'Exit',
                click: () => app.quit(),
                accelerator: process.platform == 'darwin' ? 'Command+q' : 'Control+q'
            }
        ]
    }
];

//if on mac make changes to the main menu
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({})
}

// add development tools if not in production
if (process.env.NODE_ENV != 'production') {
    mainMenuTemplate.push({
        label: 'Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+Shift+I' : 'Control+Shift+I',
                click: (item, focusedWindow) => {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                accelerator: process.platform == 'darwin' ? 'Command+r' : 'Control+r',
                role: 'reload'
            },
            {
                label: 'KeyBoard Shortcuts',
                accelerator: process.platform == 'darwin' ? 'Command+k' : 'Control+k',
                click: () => createAddWindow()
            }
        ]
    });
}
