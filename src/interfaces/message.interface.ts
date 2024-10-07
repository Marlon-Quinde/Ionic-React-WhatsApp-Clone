export interface MessageI {
    message_id: string;
    sent_by: string;
    channel: string;
    type: MessageType;
    message: string;
    file_url: string | null;
    time: Date;
}

type MessageType = 'text' | ' media'