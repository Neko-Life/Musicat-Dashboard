import { setStateNull } from '@/util/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IStoreState {
  botInfo?: any;
  debug: boolean;
  showConsole: boolean;
  serverList: any[];
  inviteLink: string;
}

const initialState: IStoreState = {
  debug: false,
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
    setOauth: (state, { payload }: PayloadAction<string>) => {
      window.location.href = payload;

      setStateNull(state);
    },
  },
});
