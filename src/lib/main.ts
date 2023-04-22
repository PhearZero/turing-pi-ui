import 'xterm/css/xterm.css';

import { Terminal } from 'xterm';

import { TTYReceiver } from 'tty-receiver';

const term = new Terminal({
    cursorBlink: true,
    macOptionIsMeta: true,
});

let wsAddress = "";
if (window.location.protocol === "https:") {
    wsAddress = 'wss://';
} else {
    wsAddress = "ws://";
}

let ttyWindow = window as any;
wsAddress += ttyWindow.ttyInitialData.wsPath;



