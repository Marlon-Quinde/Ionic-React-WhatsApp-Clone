export interface UserI {
    last_seen: string;
    user_id:   string;
    name:      string;
    avatar:    string;
    passcode:  string;
    contacts:  ContactI[];
    id:        string;
}

export interface ContactI {
    user_id: string;
    name:    string;
    avatar:  string;
}
