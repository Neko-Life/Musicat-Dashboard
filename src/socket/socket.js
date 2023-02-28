import { serverUrl } from "../config";

class MCSocket {
  constructor() {
    this._socket = new WebSocket(serverUrl);
  }

  async _handleClose(cevent) {}

  async _handleError(event) {}

  async _handleMessage(mevent) {
    const message = await mevent.data.text();
    console.log("`" + message + "`");
  }

  async _handleOpen(event) {
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
      .addEventListener("close", (cevent) => {
        console.log("CLOSE VVVVVV");
        console.log(cevent);
        this._handleClose(cevent);
      });
    this._socket
      .addEventListener("error", (event) => {
        console.log("ERROR VVVVVV");
        console.log(event);
        this._handleError(event);
      });
    this._socket
      .addEventListener("message", (mevent) => {
        console.log("MESSAGE VVVVVV");
        console.log(mevent);
        this._handleMessage(mevent);
      });
    this._socket
      .addEventListener("open", (event) => {
        console.log("OPEN VVVVVV");
        console.log(event);
        this._handleOpen(event);
      });

    return this;
  }

  sendPing() {
    
  }
}

export const connectSocket = () => new MCSocket().init();
