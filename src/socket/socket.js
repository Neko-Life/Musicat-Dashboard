import { serverUrl } from "../config";
import { rand } from "../util/util";

class MCSocket {
  /**
   * @param {number} [pingDuration=110000] - in ms
   */
  constructor(pingDuration = 110000) {
    pingDuration = Number(pingDuration);
    if (isNaN(pingDuration) || pingDuration < 1) throw new TypeError("Invalid pingDuration");

    this.pingDuration = pingDuration;
    this.pingerRunning = false;
    this.lastPing = new Date(0);
    this.lastPong = new Date(0);
    this.pingFail = 0;

    this._nonces = [];

    this._socket = new WebSocket(serverUrl);
  }

  _generateNonce() {
    let str;

    do {
      str = "";
      for (let i = 0; i < 16; i++) {
        str += rand(0,9);
      }
    } while (this._nonces.includes(str))

    this._nonces.push(str);

    return str;
  }

  async _handleClose(cevent) {}

  async _handleError(event) {}

  async _handleMessage(mevent) {
    const receivedAt = new Date();
    const message = await mevent.data.text();

    // TODO: remove this log and any other verbose log in this file
    console.log("`" + message + "`");

    if (message === "1") {
      console.log("PONG:", receivedAt.valueOf() - this.lastPing.valueOf(), "ms");
      this.lastPong = receivedAt;
    }
    else {
      try {
        const payload = JSON.parse(message);

        if (payload.type !== undefined) {
          if (payload.nonce?.length !== 16) return;
          switch(payload.type) {
            case "req":
              this._handleReq(payload.nonce, payload.d);
              break;
            case "res":
              this._handleRes(payload.nonce, payload.d);
              break;
            default:
              throw new TypeError("[ERROR] Unknown type: " + payload.type);
          }
        }

      } catch (e) {
        console.error(e);
      }
    }
  }

  async _handleOpen(event) {
    console.log("Server connection established");
    if (this.pingerRunning) return;

    this.pingFail = 0;
    this.pingerRunning = true;
    await this.looper(this.pingDuration, () => {
      const sent = this.sendPing();
      if (!sent) {
        this.pingFail++;
        if (this.pingFail === 3) {
          this.pingerRunning = false;
          this.reconnect();
          return true;
        }
      } else this.pingFail = 0;
    });
  }

  async _handleReq(nonce, d) {

    const res = {}; // TODO
    this.response(nonce, res);
  }

  async _handleRes(nonce, d) {
    if (!this._nonces.splice(this._nonces.findIndex(n => n === nonce), 1).length) return;
  }

  reconnect() {
    if (!this.pingerRunning && this.isClosed()) {
      console.log("Lost connection to server, reconnecting...");
      this._socket = new WebSocket(this._socket.url);
      this.init();
    }
    else {
      console.error("[ERROR] Reconnect requested but doesn't qualify for reconnect");
    }
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
        // console.log("MESSAGE VVVVVV");
        // console.log(mevent);
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

  send(str) {
    this._socket.send(str);
  }

  sendObj(obj) {
    this.send(JSON.stringify(obj));
  }

  async sleep(ms) {
    if (isNaN(Number(ms)) || ms < 1) throw new TypeError("Invalid duration");

    await new Promise((r,j) => setTimeout(r, ms));
  }

  /**
   * Calls `breakcb` in `interval` duration (ms) until it returns true
   */
  async looper(interval, breakcb) {
    if (typeof breakcb !== "function") throw new TypeError("Invalid callback");
    while (true) {
      const br = await breakcb();
      if (br === true) break;
      await this.sleep(interval);
    }
  }

  sendPing() {
    if (this.isOpen()) {
      console.log("Pinging...");
      this.send("0");
      this.lastPing = new Date();
      return true;
    }
    else {
      console.error("[ERROR] Unable to ping server");
      return false;
    }
  }

  request(req) {
    const reqObj = {
      type: "req",
      nonce: this._generateNonce(),
      d: req,
    };

    this.sendObj(reqObj);
  }

  response(nonce, res) {
    const resObj = {
      type: "res",
      nonce,
      d: res,
    };

    this.sendObj(resObj);
  }

  requestBotInfo() {
    this.request("botInfo");
  }
}

export const connectSocket = () => new MCSocket().init();
