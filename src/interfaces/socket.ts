import type { EEvent } from '@/socket/eventTypes';
import type { ERequestType } from '@/socket/requestTypes';

export interface IRequestTypePayload<T> {
  type: ERequestType;
  d: T;
}

export interface IRequestPayload<T = unknown> {
  type: 'req' | 'res';
  nonce: string;
  d: ERequestType | IRequestTypePayload<T>;
}

export interface IEventPayload<T = unknown> {
  type: 'e';
  event: EEvent;
  d: T;
}
