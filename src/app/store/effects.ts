import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, pipe } from 'rxjs';
import { map, mergeMap, catchError, delay, tap, switchMap } from 'rxjs/operators';

import { ChatService } from '../services/chat.service';
import { SEND_MESSAGE, SEND_REPLY, SET_USERS_FAILURE, SET_USERS_REQUEST, SET_USERS_SUCCESS } from './actions';

@Injectable()
export class ChatEffects {

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SET_USERS_REQUEST),
      mergeMap(() => this.chat.getUsers()
        .pipe(
          map(users => SET_USERS_SUCCESS({ users })),
          catchError(() => of(SET_USERS_FAILURE()))
        )
      )
    )
  );

  autoReply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SEND_MESSAGE.type),
      switchMap(payload => of(null)
        .pipe(
          delay(1000),
          map(_ => SEND_REPLY(payload)),
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private chat: ChatService
  ) { }
}
