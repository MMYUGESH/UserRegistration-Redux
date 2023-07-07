

export const REGISTER_USER = 'REGISTER_USER';

export interface User {
    id: string;
    name: string;
    email: string;
    dob: string;
    city: string;
    pincode: string;
}

export interface UserState {
    userList: User[];
}

interface RegisterUserAction {
    type: typeof REGISTER_USER;
    payload: User;
}

export interface RootState {
    user: UserState;
}


export type UserActionTypes = RegisterUserAction;