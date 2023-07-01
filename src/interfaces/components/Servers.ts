import { ServerInfo } from '../servers';

export interface IServerCardProps {
  server: ServerInfo;
  onClick?: () => void;
}
