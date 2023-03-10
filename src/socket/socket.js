import { serverUrl } from "../config";
import { setBotInfo } from "../store/actionCreators";
import store from "../store/store";
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
    this._reqQueue = new Map();
    this._reconnecting = false;

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
    setTimeout(() => this._removeNonce(str), 3000);

    return str;
  }

  _removeNonce(nonce) {
    const nIndex = this._nonces.findIndex(n => n === nonce);
    if (nIndex < 0) return nIndex;
    this._nonces.splice(nIndex, 1);
    return nIndex;
  }

  async _handleClose(cevent) {
    this.reconnect();
  }

  async _handleError(event) {}

  async _handleMessage(mevent) {
    const receivedAt = new Date();
    const message = await mevent.data.text();

    // TODO: remove this log and any other verbose log in this file
    console.log("`" + message + "`");

    if (!message.length) return;

    if (message === "1") {
      console.log("PONG:", receivedAt.valueOf() - this.lastPing.valueOf(), "ms");
      this.lastPong = receivedAt;
      return;
    }

    try {
      const payload = JSON.parse(message);

      if (payload.type !== undefined && payload.type.length < 4) {
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

  async _handleOpen(event) {
    console.log("Server connection established");
    this.requestBotInfo();
    if (this.pingerRunning) return;

    this.pingFail = 0;
    this.pingerRunning = true;
    await this.looper(this.pingDuration, () => {
      const sent = this.sendPing();
      if (!sent) {
        this.pingFail++;
        if (this.pingFail === 2) {
          console.error("Dead connection");
          this.pingerRunning = false;
          this.reconnect();
          return true;
        }
      } else this.pingFail = 0;
    });
  }

  _setReqObjError(reqObj, reason) {
      reqObj.error = true;
      reqObj.errReason = reason;
  }

  async _handleReq(nonce, d) {

    const res = {}; // TODO
    this.response(nonce, res);
  }

  async _handleRes(nonce, d) {
    const reqObj = this._reqQueue.get(nonce);
    this._reqQueue.delete(reqObj.nonce);

    if (this._removeNonce(nonce) < 0) {
      this._setReqObjError(reqObj, "timed out");
      this._reqQueue.set(reqObj.nonce, reqObj);

      throw new Error("[ERROR] _handleRes: timed out");
    }

    // console.log("response", nonce, "vvvvv");
    // console.log(d);

    if (typeof reqObj.d === "string") {
      switch (reqObj.d) {
        case "bot_info":
          store.dispatch(setBotInfo(d));
          break;
        default:
          throw new Error("[ERROR] Unknown d: ", reqObj.d);
      }
    }

    // if (typeof reqObj.d !== "object")
    //   return;
  }

  reconnect() {
    if (this._reconnecting) return;
    if (this.isClosed()) {
      console.log("Lost connection to server");
      const recon = () => {
        if (this.pingerRunning && this.isOpen())
        {
          this._reconnecting = false;
          return true;
        }
        console.log("reconnecting...");
        this._socket = new WebSocket(this._socket.url);
        this.init();
      }

      this._reconnecting = true;
      this.looper(5000, recon);
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

  isReconnecting() {
    return this._reconnecting;
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

    this._reqQueue.set(reqObj.nonce, reqObj);

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
    this.request("bot_info");
  }
}

export const connectSocket = () => new MCSocket().init();
