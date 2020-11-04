
import axios from 'axios';
import config from 'config';
import mock from './mock';
import users from './users';
import wait from 'utils/wait';

const AuthDataMock = {
    id: '1',
    displayName: 'חציל אפ וי',
    isAdmin: false
}

const request = axios.create({
    baseURL: config.serverUrl,
    // headers: {auth: localStorage.token}
});


const authApi = async () => {
    if(config.isMock) { await wait(2000); return AuthDataMock } //mockSchedules  or []
    const res = await request.get(`auth`).catch(err => { throw (err.response) });
    return res.data;
}


const getImmigrantsApi = async () => {
    if(config.isMock) { await wait(200); return mock } //mockSchedules  or []
    const res = await request.get(`api/immigrant`).catch(err => { throw (err.response) });
    console.log(res);
    return res.data;
}

const addImmigrantsApi = async (domain,name) => {
    if(config.isMock){await wait(2000); return users};
    const res = await request.post(`api/immigrant`,{"Domain": domain,"Name": name},{ timeout: 5000}).catch(err => { throw (err.response) });
    return res.data;
}
const getUsernamesPerNameKart = async (username) =>{
    await wait(200); 
    return users;

    if(config.isMock){await wait(200); return users};
    const res = await request.get(`search`,{params:{
        username: username
    }},{timeout : 10000}).catch(err => { throw (err.response) });
    return res.data;
}

export { getImmigrantsApi,addImmigrantsApi, getUsernamesPerNameKart ,authApi }


