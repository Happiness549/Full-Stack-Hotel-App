
import type{ UserData } from '../redux/RegisterSlice';

const USER_KEY = "loggedINUser";

export const saveUser = (user:UserData) =>{
    localStorage.setItem(USER_KEY,JSON.stringify(user));
};


export const getUser =(): UserData | null =>{
    const  user = localStorage.getItem(USER_KEY);
    if(!user) {
        return null;
    }
    return JSON.parse(user);
}

export const removeUser = () => {
    localStorage.removeItem(USER_KEY)
}