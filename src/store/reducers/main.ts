import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MCSocket } from '@/socket/socket';
import type CommandManager from '@/managers/CommandManager';

interface IStoreState {
  socket?: MCSocket;
  botInfo?: any;
  debug: boolean;
  stdout: string[];
  maxStdoutEntry: number;
  showConsole: boolean;
  commandManager?: CommandManager;
  serverList: any[];
}

const initialState: IStoreState = {
  debug: false,
  stdout: [],
  maxStdoutEntry: 100,
  showConsole: false,
  serverList: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setSocket: (state, { payload }: PayloadAction<IStoreState['socket']>) => {
      state.socket = payload;
    },
    setBotInfo: (state, { payload }: PayloadAction<IStoreState['botInfo']>) => {
      const elFavicon: HTMLLinkElement | null =
        document.querySelector('#page-favicon');
      const elTitle: HTMLTitleElement | null =
        document.querySelector('#page-title');
      const elMeta: HTMLMetaElement | null = document.querySelector(
        '#page-meta-description'
      );

      if (elFavicon) elFavicon.href = payload.avatarUrl;
      if (elTitle) elTitle.textContent = payload.username;
      if (elMeta) elMeta.content = payload.username + ' Dashboard';

      state.botInfo = payload;
    },
    setDebug: (state, { payload }: PayloadAction<IStoreState['debug']>) => {
      state.debug = payload;
    },
    consoleConsolePrint: (state, { payload }: PayloadAction<string>) => {
      const newStdout = state.stdout.slice();

      if (newStdout.length >= state.maxStdoutEntry) newStdout.shift();
      newStdout.push(payload);

      state.stdout = newStdout;
    },
    consoleConsoleClear: (state) => {
      state.stdout = [];
    },
    toggleConsole: (state) => {
      state.showConsole = !state.showConsole;
    },
    setCommandManager: (
      state,
      { payload }: PayloadAction<IStoreState['commandManager']>
    ) => {
      state.commandManager = payload;
    },
    setServerList: (
      state,
      { payload }: PayloadAction<IStoreState['serverList']>
    ) => {
      state.serverList = payload || [];
    },
    setOauthState: (state, { payload }: PayloadAction<string>) => {
      window.location.href =
        payload +
        '&redirect_uri=' +
        encodeURIComponent(window.location.origin + '/login');

      state = Object.create(null);
    },
  },
});
