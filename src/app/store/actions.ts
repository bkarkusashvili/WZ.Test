import { createAction, props } from '@ngrx/store';

import { User } from '../interfaces';

export const SET_USERS_REQUEST = createAction('[Users] Set users request');
export const SET_USERS_SUCCESS = createAction('[Users] Set users success', props<{ users: User[] }>());
export const SET_USERS_FAILURE = createAction('[Users] Set users failure');

export const SEND_MESSAGE = createAction('[Chat] Send message', props<{ text: string; }>());
export const SEND_REPLY = createAction('[Chat] Send rely', props<{ text: string; }>());
export const SEND_ACTIVE_CHAT = createAction('[Chat] Set active', props<{ id: number }>());
