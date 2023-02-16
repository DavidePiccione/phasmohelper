// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const sqlite3 = require('sqlite3')


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

db = new sqlite3.Database('./phantoms.db', sqlite3.OPEN_READONLY , (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the phantoms database from backend.');
    });

let firstchoice = "";
let secondchoice = "";


ipcMain.on("buttonpressed", (event, data, selectednumber)=>{

    db.serialize(function () {
        if (data=="D.O.T.S. Projector") data = "DOTS";
        if (data=="EMF Level 5") data = "EMF";
        if (data=="Spirit Box") data = "Spirit";
        if (data=="Ghost Writing") data = "Writing";
        if (data=="Ghost Orbs") data = "Orbs";
        if (data=="Freezing Temperatures") data = "Temps";

        data = "'" + data + "'";
        if(selectednumber==0)
        {
            firstchoice = data;
            let query = "SELECT Name FROM Phantoms WHERE Proof1 LIKE " + data + " OR Proof2 LIKE " + data + " OR Proof3 LIKE " + data;
            db.all(query, function (err, results) {
                event.reply("reply", results);
            });
        }
        if(selectednumber==1)
        {
            secondchoice = data;
            let query = "SELECT Name FROM Phantoms WHERE NOT((Proof1 LIKE " + firstchoice + " OR Proof2 LIKE " + firstchoice + " OR Proof3 LIKE " + firstchoice + ") AND ( " +
                        "Proof1 LIKE " + data + " OR Proof2 LIKE " + data + " OR Proof3 LIKE " + data + "))";
            db.all(query, function (err, results) {
                console.log(results);
                event.reply("reply", results);

            });
        }
        if(selectednumber==2)
        {
            let query = "SELECT Name FROM Phantoms WHERE NOT((Proof1 LIKE " + firstchoice + " OR Proof2 LIKE " + firstchoice + " OR Proof3 LIKE " + firstchoice + ") AND ( " +
            "Proof1 LIKE " + secondchoice + " OR Proof2 LIKE " + secondchoice + " OR Proof3 LIKE " + secondchoice + ")  AND ( " +
            "Proof1 LIKE " + data + " OR Proof2 LIKE " + data + " OR Proof3 LIKE " + data + ")) ";
        db.all(query, function (err, results) {
                console.log(results);
                event.reply("reply", results);

            });
        }
        

    });
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.