
import type { UserData } from '../redux/RegisterSlice';

const USER_KEY = "loggedINUser";

export interface LoggedInUser {
    user: UserData;
    token: string;
}

export const saveUser = (data: LoggedInUser) => {
    localStorage.setItem(USER_KEY, JSON.stringify(data));
};

export const getUser = (): LoggedInUser | null => {
    const user = localStorage.getItem(USER_KEY);

    if (!user) {
        return null;
    }

    return JSON.parse(user) as LoggedInUser;
};

export const removeUser = () => {
    localStorage.removeItem(USER_KEY);
};
