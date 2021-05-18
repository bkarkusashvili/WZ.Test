import { createSelector } from '@ngrx/store';
import { AppState } from '.';
import { User } from '../interfaces';

export const selectFeature = (state: AppState) => state.chat;

export const SELECT_USERS = createSelector(selectFeature, state => state.users.map(user => {
    const userChat = state.chat[user.id];
    let lastMessage = '';

    if (userChat) {
      const messages = userChat.list;
      lastMessage = messages[messages.length - 1]?.text || '';
    }
    return { ...user, lastMessage };
  })
);
export const SELECT_CHAT = createSelector(selectFeature, state => {
  const list = state.chat[state.activeChatId]?.list || [];

  return {
    list,
    user: state.users.find(user => user.id === state.activeChatId)?.name || '',
  };
});
