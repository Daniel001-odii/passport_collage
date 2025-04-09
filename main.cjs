const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs'); // Add fs for file checking

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const filePath = path.join(__dirname, 'dist', 'index.html');
  console.log('Loading file:', filePath);
  if (fs.existsSync(filePath)) {
    console.log('File exists');
  } else {
    console.log('File does NOT exist');
  }
  win.loadFile(filePath);
  win.webContents.openDevTools(); // Open DevTools for more insight
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});