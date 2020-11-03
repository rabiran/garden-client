
import axios from 'axios';
import config from 'config';
import mock from './mock';
import wait from 'utils/wait';

const request = axios.create({
    // baseURL: config.serverUrl,
    // headers: {auth: localStorage.token}
});


const getImmigrantsApi = async () => {
    if(config.isMock) { await wait(1000); return mock } //mockSchedules  or []
    const res = await request.get(`immigrant`).catch(err => { throw (err.response) });
    return res;
}

export { getImmigrantsApi }