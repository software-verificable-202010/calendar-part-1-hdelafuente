const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

// SET ENV
process.env.NODE_ENV = "development";

// Liten for app to be ready
app.on("ready", createWindow);
function createWindow() {
    // Create window
    mainWindow = new BrowserWindow({});

    // Load html
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true,
        })
    );

    mainWindow.on("closed", function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    // Main menu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);
}

// Create manu template
const mainMenuTemplate = [
    {
        label: "",
    },
    {
        label: "File",
        submenu: [
            {
                label: "Add Event",
            },
            {
                label: "Quit",
                accelerator:
                    process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
                click() {
                    app.quit();
                },
            },
        ],
    },
    {
        label: "Tools",
        submenu: [
            {
                label: "Reload",
                accelerator:
                    process.platform == "darwin" ? "Command+R" : "Ctrl+R",
                click() {
                    mainWindow.reload();
                },
            },
        ],
    },
];

// Add developer tools option if in dev
if (process.env.NODE_ENV !== "production") {
    mainMenuTemplate.push({
        label: "Developer Tools",
        submenu: [
            {
                label: "Toggle DevTools",
                accelerator:
                    process.platform == "darwin" ? "Command+I" : "Ctrl+I",
                click() {
                    mainWindow.toggleDevTools();
                },
            },
        ],
    });
}

app.on("window-all-closed", function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
