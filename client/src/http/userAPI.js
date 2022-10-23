import {$host} from "./index";
import jwt_decode from "jwt-decode";

export const registrationFunction = async (login, password,role) => {
    const {data} = await $host.post('api/user/registration', {login, password, role})
    return data
}
export const deleteUserFunction = async (login) => {
    const {data} = await $host.post('api/user/delete', {login})
    return data
}
export const loginFunction = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const getAllUsers = async () => {
    const {data} = await $host.get('api/user/get')
    return data
}
export const checkFunction = async () => {
    const {data} = await $host.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
