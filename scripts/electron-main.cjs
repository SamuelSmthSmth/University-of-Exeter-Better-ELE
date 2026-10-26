const { app, BrowserWindow, shell, session } = require('electron');
const path = require('path');

const PORT = process.env.PORT || 5174;
const URL = process.env.ELE3_URL || `http://localhost:${PORT}/`;

// Disable hardware acceleration issues on some Linux Wayland setups if needed
app.commandLine.appendSwitch('enable-features', 'OverlayScrollbar');

let mainWindow = null;

function createWindow() {
  // Allow university portals (Library, Outlook, SRS, SID) to load inside the In-App Browser modal
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const responseHeaders = { ...details.responseHeaders };
    delete responseHeaders['x-frame-options'];
    delete responseHeaders['X-Frame-Options'];
    if (responseHeaders['content-security-policy']) {
      responseHeaders['content-security-policy'] = responseHeaders['content-security-policy'].map(csp =>
        csp.replace(/frame-ancestors\s+[^;]+(;|$)/gi, '')
      );
    }
    if (responseHeaders['Content-Security-Policy']) {
      responseHeaders['Content-Security-Policy'] = responseHeaders['Content-Security-Policy'].map(csp =>
        csp.replace(/frame-ancestors\s+[^;]+(;|$)/gi, '')
      );
    }
    callback({ cancel: false, responseHeaders });
  });

  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1024,
    minHeight: 680,
    frame: false, // 100% borderless and frameless floating window
    transparent: false,
    backgroundColor: '#020909',
    autoHideMenuBar: true,
    hasShadow: true,
    title: 'ELE 3',
    icon: path.join(__dirname, '../public/favicon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
    },
  });

  mainWindow.loadURL(URL);

  // If a link attempts to open a new window, prevent popup and open in default browser if needed
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    // If it's localhost or relative, load inside
    if (url.startsWith('http://localhost') || url.startsWith('http://127.0.0.1')) {
      return { action: 'allow' };
    }
    // Otherwise open external links in user's default browser (if not already intercepted by in-app browser)
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
