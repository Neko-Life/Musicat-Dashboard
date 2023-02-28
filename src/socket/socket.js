import { serverUrl } from "../config";

class MCSocket {
  constructor() {
    this._socket = new WebSocket(serverUrl);
  }

  async _handleClose(ws, cevent) {}

  async _handleError(ws, event) {}

  async _handleMessage(ws, mevent) {
    const message = await mevent.data.text();
    console.log("`" + message + "`");
  }

  async _handleOpen(ws, event) {
    console.log("Server connection established");
  }

  _getState() {
    return this._socket.readyState;
  }

  isClosed() {
    return this._getState() === this._socket.CLOSED;
  }

  isClosing() {
    return this._getState() === this._socket.CLOSING;
  }

  isConnecting() {
    return this._getState() === this._socket.CONNECTING;
  }

  isOpen() {
    return this._getState() === this._socket.OPEN;
  }

  init() {
    this._socket
      .onclose((ws, cevent) => {
        console.log("CLOSE VVVVVV");
        console.log(ws, cevent);
        this._handleClose(ws, cevent);
      })
      .onerror((ws, event) => {
        console.log("ERROR VVVVVV");
        console.log(ws, event);
        this._handleError(ws, event);
      })
      .onmessage((ws, mevent) => {
        console.log("MESSAGE VVVVVV");
        console.log(ws, mevent);
        this._handleMessage(ws, mevent);
      })
      .onopen((ws, event) => {
        console.log("OPEN VVVVVV");
        console.log(ws, event);
        this._handleOpen(ws, event);
      });

    return this;
  }

  sendPing() {
    
  }
}

export const connectSocket = () => new MCSocket().init();
