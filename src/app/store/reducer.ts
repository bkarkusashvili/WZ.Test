import { createReducer, on } from '@ngrx/store';

import { Chat, User } from '../interfaces';
import { SEND_ACTIVE_CHAT, SEND_MESSAGE, SEND_REPLY, SET_USERS_SUCCESS } from './actions';

export interface ChatState {
  users: User[];
  chat: {
    [key: number]: Chat
  };
  activeChatId: number;
}

export const initialState: ChatState = {
  users: [],
  chat: {},
  activeChatId: 0,
};

export const chatReducer = createReducer(
  initialState,
  on(SET_USERS_SUCCESS, (state, { users }) => ({ ...state, users })),
  on(SEND_ACTIVE_CHAT, (state, { id }) => {
    const chat = {...state.chat};

    if (!chat[id]) {
      chat[id] = { userId: id, list: [] };
    }

    return { ...state, activeChatId: id, chat };
  }),
  on(SEND_MESSAGE, (state, { text }) => {
    const userChat = state.chat[state.activeChatId];
    const user = state.users.filter(item => item.id !== state.activeChatId);
    const users = state.users.filter(item => item.id === state.activeChatId);

    return {
      ...state,
      users: [
        ...users,
        ...user,
      ],
      chat: {
        ...state.chat,
        [state.activeChatId]: {
          userId: userChat.userId,
          list: [ ...userChat.list, { text } ],
        }
      }
    };
  }),
  on(SEND_REPLY, (state, { text }) => {
    const userChat = state.chat[state.activeChatId];
    const user = state.users.filter(item => item.id !== state.activeChatId);
    const users = state.users.filter(item => item.id === state.activeChatId);

    return {
      ...state,
      users: [
        ...users,
        ...user,
      ],
      chat: {
        ...state.chat,
        [state.activeChatId]: {
          userId: userChat.userId,
          list: [ ...userChat.list, { text, isReply: true } ],
        }
      }
    };
  })
);
