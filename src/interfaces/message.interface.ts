export interface MessageI {
    message_id: string;
    sent_by: string;
    channel: string;
    type: MessageType;
    message: string | null;
    file_url: string | null;
    time: Date;
}

export type MessageType = 'text' | 'media'