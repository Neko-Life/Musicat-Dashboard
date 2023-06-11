import type { EEvent } from '@/socket/eventTypes';
import type { ERequestType } from '@/socket/requestTypes';

export interface IRequestPayload {
  type: 'req' | 'res';
  nonce: string;
  d: ERequestType | any;
}

export interface IEventPayload {
  type: 'e';
  event: EEvent;
  d: any;
}
