import { getRedirectUri } from '@/util/util';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IStoreState {
  botInfo?: any;
  debug: boolean;
  stdout: string[];
  maxStdoutEntry: number;
  showConsole: boolean;
  serverList: any[];
  inviteLink: string;
}

const initialState: IStoreState = {
  debug: false,
  stdout: [],
  maxStdoutEntry: 100,
  showConsole: false,
  serverList: [],
  inviteLink: '#',
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
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

      if (state.debug) console.log(payload);
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
    setServerList: (
      state,
      { payload }: PayloadAction<IStoreState['serverList']>
    ) => {
      if (state.debug === true) console.log(payload);
      state.serverList = payload || [];
    },
    setOauthState: (state, { payload }: PayloadAction<string>) => {
      window.location.href =
        payload + '&redirect_uri=' + getRedirectUri('/login');

      state = Object.create(null);
    },
    setInviteLink: (state, { payload }: PayloadAction<string>) => {
      state.inviteLink = payload;
    },
  },
});
