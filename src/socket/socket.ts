import { serverUrl } from '@/config';
import { consolePrint } from '@/console/console';
import store, { actions } from '@/store/store';
import { getDebugState } from '@/util/dbg';
import { rand } from '@/util/util';
import { ERequestType } from './requestTypes';

interface IRequestPayload {
  type: 'req' | 'res';
  nonce: string;
  d: ERequestType | any;
}

const { setBotInfo, setOauthState, setServerList } = actions.main;

export class MCSocket {
  pingDuration: number;
  pingerRunning: boolean;
  lastPing: Date;
  lastPong: Date;
  pingFail: number;
  nextPongToConsoleStdout: boolean;
  _nonces: string[];
  _reqQueue: Map<string, IRequestPayload>;
  _reconnecting: boolean;
  _socket: WebSocket | null;

  constructor(pingDuration: string | number = 110000) {
    pingDuration = Number(pingDuration);
    if (isNaN(pingDuration) || pingDuration < 1)
      throw new TypeError('Invalid pingDuration');

    this.pingDuration = pingDuration;
    this.pingerRunning = false;
    this.lastPing = new Date(0);
    this.lastPong = new Date(0);
    this.pingFail = 0;
    this.nextPongToConsoleStdout = false;

    this._nonces = [];
    this._reqQueue = new Map();
    this._reconnecting = false;

    if (serverUrl) this._socket = new WebSocket(serverUrl);
    else {
      console.error('[ERROR] Server URL not provided');
      this._socket = null;
    }
  }

  _generateNonce() {
    let str: string;

    do {
      str = '';
      for (let i = 0; i < 16; i++) {
        str += rand(0, 9);
      }
    } while (this._nonces.includes(str));

    this._nonces.push(str);
    setTimeout(() => this._removeNonce(str), 3000);

    return str;
  }

  _removeNonce(nonce: string) {
    const nIndex = this._nonces.findIndex((n) => n === nonce);
    if (nIndex < 0) return nIndex;
    this._nonces.splice(nIndex, 1);
    return nIndex;
  }

  async _handleClose(cevent: any) {
    this.reconnect();
  }

  async _handleError(event: any) {}

  async _handleMessage(mevent: any) {
    const debug = getDebugState();

    const receivedAt = new Date();
    const message = await mevent.data.text();

    if (debug) console.log('`' + message + '`');

    if (!message.length) return;

    if (message === '1') {
      const pongTxt =
        'PONG: ' + (receivedAt.valueOf() - this.lastPing.valueOf()) + ' ms';
      if (this.nextPongToConsoleStdout === true) {
        consolePrint(pongTxt);
        this.nextPongToConsoleStdout = false;
      } else console.log(pongTxt);
      this.lastPong = receivedAt;
      return;
    }

    try {
      const payload = JSON.parse(message);

      if (payload.type !== undefined && payload.type.length < 4) {
        switch (payload.type) {
          case 'req':
            this._handleReq(payload.nonce, payload.d);
            break;
          case 'res':
            this._handleRes(payload.nonce, payload.d);
            break;
          default:
            throw new TypeError('Unknown type: ' + payload.type);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  async _handleOpen(event: any) {
    console.log('Server connection established');
    this.requestBotInfo();
    if (this.pingerRunning) return;

    this.pingFail = 0;
    this.pingerRunning = true;
    await this.looper(this.pingDuration, () => {
      const sent = this.sendPing();
      if (!sent) {
        this.pingFail++;
        if (this.pingFail === 2) {
          console.error('Dead connection');
          this.pingerRunning = false;
          this.reconnect();
          return true;
        }
      } else this.pingFail = 0;
    });
  }

  _setReqObjError(reqObj: any, reason: string) {
    reqObj.error = true;
    reqObj.errReason = reason;
  }

  async _handleReq(nonce: string, d: any) {
    const res = {}; // TODO
    return this.response(nonce, res);
  }

  async _handleRes(nonce: string, d: ERequestType | any) {
    const reqObj = this._reqQueue.get(nonce);
    if (reqObj) {
      this._reqQueue.delete(reqObj.nonce);

      if (this._removeNonce(nonce) < 0) {
        this._setReqObjError(reqObj, 'timed out');
        this._reqQueue.set(reqObj.nonce, reqObj);

        throw new Error('_handleRes: timed out');
      }

      // I didn't ask for this
    } else return;

    if (typeof reqObj?.d === 'number') {
      switch (reqObj.d) {
        case ERequestType.BOT_INFO:
          store.dispatch(setBotInfo(d));
          break;
        case ERequestType.SERVER_LIST:
          store.dispatch(setServerList(d));
          break;
        case ERequestType.OAUTH_STATE:
          store.dispatch(setOauthState(d));
          break;
        default:
          console.error(new Error('Unknown op: ' + reqObj.d));
      }
    }

    // if (typeof reqObj.d !== "object")
    //   return;
  }

  reconnect(url?: string) {
    if (this._reconnecting) return;
    if (this.isClosed()) {
      console.log('Lost connection to server');
      const recon = () => {
        if (this.pingerRunning && this.isOpen()) {
          this._reconnecting = false;
          return true;
        }

        const connectUrl = url || this._socket?.url;

        if (!connectUrl?.length) {
          console.error(
            new Error(
              'Socket instance destroyed, cannot continue reconnecting. Please provide a WebSocket URL'
            )
          );
          return true;
        }

        console.log('reconnecting...');

        this._socket?.close();
        this._socket = null;

        this._socket = new WebSocket(connectUrl);
        this.init();
      };

      this._reconnecting = true;
      this.looper(5000, recon);
    } else {
      console.error(
        new Error("Reconnect requested but doesn't qualify for reconnect")
      );
    }
  }

  _getState() {
    return this._socket ? this._socket.readyState : '';
  }

  isClosed() {
    return this._getState() === this._socket?.CLOSED;
  }

  isClosing() {
    return this._getState() === this._socket?.CLOSING;
  }

  isConnecting() {
    return this._getState() === this._socket?.CONNECTING;
  }

  isOpen() {
    return this._getState() === this._socket?.OPEN;
  }

  isReconnecting() {
    return this._reconnecting;
  }

  init() {
    if (!this._socket) {
      console.error(new Error('No socket'));
      return this;
    }

    this._socket.addEventListener('close', (cevent) => {
      const debug = getDebugState();

      if (debug) {
        console.log('CLOSE VVVVVV');
        console.log(cevent);
      }

      this._handleClose(cevent);
    });

    this._socket.addEventListener('error', (event) => {
      const debug = getDebugState();

      if (debug) {
        console.log('ERROR VVVVVV');
        console.log(event);
      }

      this._handleError(event);
    });

    this._socket.addEventListener('message', (mevent) => {
      // console.log("MESSAGE VVVVVV");
      // console.log(mevent);
      this._handleMessage(mevent);
    });

    this._socket.addEventListener('open', (event) => {
      const debug = getDebugState();

      if (debug) {
        console.log('OPEN VVVVVV');
        console.log(event);
      }

      this._handleOpen(event);
    });

    return this;
  }

  send(str: string) {
    if (!this._socket) {
      console.error(new Error('No socket instance initialized'));
      return false;
    }

    if (!this.isOpen()) {
      console.error(new Error('Connection not open'));
      return false;
    }

    this._socket.send(str);
    return true;
  }

  sendObj(obj: any) {
    return this.send(JSON.stringify(obj));
  }

  async sleep(ms: number) {
    const milli = Number(ms);
    if (isNaN(milli) || milli < 1) throw new TypeError('Invalid duration');

    await new Promise((r, j) => setTimeout(r, milli));
  }

  /**
   * Calls `breakcb` in `interval` duration (ms) until it returns true
   */
  async looper(
    interval: number,
    breakcb: () => boolean | undefined | Promise<boolean | undefined>
  ) {
    if (typeof breakcb !== 'function') throw new TypeError('Invalid callback');
    while (true) {
      const br = await breakcb();
      if (br === true) break;
      await this.sleep(interval);
    }
  }

  sendPing(consoleStdout?: boolean) {
    if (this.isOpen()) {
      const pingingTxt = 'Pinging...';
      if (consoleStdout === true) {
        this.nextPongToConsoleStdout = true;
        consolePrint(pingingTxt);
      } else console.log(pingingTxt);
      this.send('0');
      this.lastPing = new Date();
      return true;
    } else {
      this.nextPongToConsoleStdout = true;
      const errorTxt = '[ERROR] Unable to ping server';
      if (consoleStdout) consolePrint(errorTxt);
      else console.error(errorTxt);
      return false;
    }
  }

  request(req: ERequestType) {
    const reqObj: IRequestPayload = {
      type: 'req',
      nonce: this._generateNonce(),
      d: req,
    };

    this._reqQueue.set(reqObj.nonce, reqObj);

    return this.sendObj(reqObj);
  }

  response(nonce: string, res: any) {
    const resObj = {
      type: 'res',
      nonce,
      d: res,
    };

    return this.sendObj(resObj);
  }

  requestBotInfo() {
    return this.request(ERequestType.BOT_INFO);
  }

  requestServerList() {
    return this.request(ERequestType.SERVER_LIST);
  }

  sendOauth(data: any) {
    // !TODO: create event object { type: "e", d: { e: E_OAUTH, d: toSend }}
    const toSend = {
      code: data.get('code'),
      state: data.get('state'),
    };

    return this.sendObj(toSend);
  }

  requestOauthState() {
    return this.request(ERequestType.OAUTH_STATE);
  }
}

export const connectSocket = () => new MCSocket().init();
