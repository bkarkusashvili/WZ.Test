import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Message, User } from '../interfaces';
import { AppState, SELECT_CHAT, SELECT_USERS, SEND_ACTIVE_CHAT, SEND_MESSAGE, SET_USERS_REQUEST } from '../store';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public users$: Observable<User[]>;
  public chat$: Observable<{
    user: string;
    list: Message[];
  }>;
  public send = new FormControl('', Validators.required);

  constructor(
    private store: Store<AppState>,
  ) {
    this.store.dispatch(SET_USERS_REQUEST());

    this.users$ = this.store.select(SELECT_USERS);
    this.chat$ = this.store.select(SELECT_CHAT);
  }

  ngOnInit(): void {
  }

  sendReply(): void {
    console.log('asdsa');
    
    if (this.send.valid) {
      this.store.dispatch(SEND_MESSAGE({ text: this.send.value }));
      this.send.reset();
    }
  }

  setChat(change: MatSelectionListChange): void {
    this.store.dispatch(SEND_ACTIVE_CHAT({ id: change.option.value }));
  }

}
