const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const { readFile } = require('fs');
const { readFileSync } = require('node:fs');

const WORDFILE = 'resources/wordlist-german.txt';

const words = readWords();
console.log("Loaded words:", words.length);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
  ipcMain.handle('singleWord', (n) => {
    return randomWord();
  });
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

function readWords() {
  const data = readFileSync(WORDFILE, 'utf8');
  return data.split('\n').map(word => word.trim()).filter(word => word.length > 0);
}

function randomWord(n) {
  if (!n) {
    // console.log('Single word')
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    return randomWord;
  } else {
    // console.log('Multible words', n)
    const result = [];
    for (let i = 0; i < n; ++i) {
      const randomIndex = Math.floor(Math.random() * words.length);
      const randomWord = words[randomIndex];
      result.push(randomWord);
    }
    return result;
  }
}