import { UserActionTypes, UserState, REGISTER_USER, User } from '../types';

const storedUserList = localStorage.getItem('userList');
const initialState: UserState = {
    userList: storedUserList ? JSON.parse(storedUserList) : [],
};

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case REGISTER_USER:
            const updatedUserList = [...state.userList, action.payload];
            localStorage.setItem('userList', JSON.stringify(updatedUserList));
            return {
                ...state,
                userList: updatedUserList,
            };
        default:
            return state;
    }
};

export default userReducer;