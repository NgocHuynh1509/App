const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    title: 'Materials Analysis',
    icon: path.join(__dirname, '../build/icon.ico'), // icon ở taskbar
    autoHideMenuBar: true,
    titleBarStyle: 'hidden', // ẩn thanh tiêu đề gốc "my-react-app"
    titleBarOverlay: {
      color: '#f1f1f4', // trùng nền TitleBar
      symbolColor: '#032761', // màu 3 nút _ □ ✕
      height: 48, // trùng chiều cao TitleBar
    },
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (process.env.ELECTRON_DEV) {
    win.loadURL('http://localhost:5173')
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})