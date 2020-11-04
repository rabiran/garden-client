
import axios from 'axios';
import config from 'config';
import mock from './mock';
import wait from 'utils/wait';

const AuthDataMock = {
    id: '1',
    displayName: 'חציל אפוי',
    isAdmin: false
}

const request = axios.create({
    // baseURL: config.serverUrl,
    // headers: {auth: localStorage.token}
});


const authApi = async () => {
    if(config.isMock) { await wait(200); return AuthDataMock } //mockSchedules  or []
    const res = await request.get(`auth`).catch(err => { throw (err.response) });
    return res;
}


const getImmigrantsApi = async () => {
    if(config.isMock) { await wait(1000); return mock } //mockSchedules  or []
    const res = await request.get(`immigrant`).catch(err => { throw (err.response) });
    return res;
}

export { getImmigrantsApi, authApi }