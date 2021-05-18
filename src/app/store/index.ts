import { ChatState } from './reducer';

export * from './actions';
export * from './reducer';
export * from './select';
export * from './effects';

export interface AppState {
  chat: ChatState;
}
