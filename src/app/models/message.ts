import { User } from './user/user';

export interface Message {
    from?: User;
    content?: string;
    time?: number;
}