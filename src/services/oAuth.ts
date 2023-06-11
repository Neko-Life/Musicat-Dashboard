import { DISCORD_API } from '@/configs/constants';
import { getRedirectUri } from '@/util/util';
import axios from 'axios';

const oauthService = axios.create({ url: DISCORD_API + '/oauth2' });

interface IPostTokenData {
  client_id: string;
  client_secret: string;
  grant_type: string;
  code: string;
  redirect_uri?: string;
}

export function postToken(data: IPostTokenData) {
  data.redirect_uri = getRedirectUri();
  const res = oauthService.post('/token', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  // !TODO
  console.log(res);
}
