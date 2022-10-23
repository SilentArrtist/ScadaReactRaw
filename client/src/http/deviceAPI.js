import {$host} from "./index";

export const addDevice = async (ip) => {
    const {data} = await $host.post('api/modbus/create', {ip})
    return data
}
export const deleteDevice = async (ip) => {
    const {data} = await $host.post('api/modbus/delete', {ip})
    return data
}
export const getDevices = async () => {
    const {data} = await $host.get('api/modbus/get/all')
    return data
}
export const changeValue = async (ip,tagName,tagIndex,tagValue) => {
    const {data} = await $host.post('api/modbus/change/value', {ip,tagName,tagIndex,tagValue})
    return data
}
export const setSave = async (elements) => {
    const {data} = await $host.post('api/modbus/set/save', {elements})
    return data
}
export const getSave = async () => {
    const data = await $host.get('api/modbus/get/save')
    return data
}


