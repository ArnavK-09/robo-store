import { atom } from 'nanostores';

export interface User { 
    id: string;
    username: string;
    avatar: string;
    global_name: string;
    email:	string;
}

export const User = atom<User|null>(null);