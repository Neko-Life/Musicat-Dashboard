import { connectSocket } from './socket';

const socket = connectSocket();

export const getSocket = () => socket;
