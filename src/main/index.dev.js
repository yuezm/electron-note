/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */

// Install `electron-debug` with `devtron`
require('electron-debug')({ showDevTools: true });
import { app, BrowserWindow } from 'electron';

// Install `vue-devtools`
app.on('ready', () => {
  BrowserWindow.addDevToolsExtension('/home/yzm/.config/google-chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/4.1.5_0');
});

// Require `main` process to boot app
require('./index');
