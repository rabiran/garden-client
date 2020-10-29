
import axios from 'axios';
import config from 'config';
import mock from './mock';
import users from './users';
import wait from 'utils/wait';

const request = axios.create({
    // baseURL: config.serverUrl,
    // headers: {auth: localStorage.token}
});


const getImmigrantsApi = async () => {
    if(config.isMock) { await wait(2000); return mock } //mockSchedules  or []
    const res = await request.get(`immigrant/gardener/me`).catch(err => { throw (err.response) });
    return res;
}

const addImmigrantsApi = async (domain,name) => {
    if(config.isMock){await wait(2000); return users};
    const res = await request.post(`immigrant/gardener/me`,{"Domain": domain,"Name": name},{ timeout: 5000}).catch(err => { throw (err.response) });
    return res;
}
const getUsernamesPerNameKart = async (username) =>{
    if(config.isMock){await wait(2000); return users};
    const res = await request.get(`immigrant`,{params:{
        username: username
    }},{timeout : 10000}).catch(err => { throw (err.response) });
    return res;

}

export { getImmigrantsApi,addImmigrantsApi, getUsernamesPerNameKart }