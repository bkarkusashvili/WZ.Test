export interface Chat {
    userId: number;
    list: Message[];
}

export interface Message {
    text: string;
    isReply?: boolean;
}
