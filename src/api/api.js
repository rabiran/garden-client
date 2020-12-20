
import axios from 'axios';
import config from 'config';
import mock from './mock';
import users from './users';
import wait from 'utils/wait';

const AuthDataMock = {
    id: '1',
    fullName: 'חציל אפ וי',
    isAdmin: false
}

const domainsMock = ['ads', 'es', 'target'];

const request = axios.create({
    baseURL: config.serverUrl,
    timeout: 5000,
    // headers: {auth: localStorage.token}
});


const authApi = async () => {
    if(config.isMock) { await wait(500); return AuthDataMock } //mockSchedules  or []
    const res = await request.get(`auth`).catch(err => { throw (err.response) });
    return res.data;
}

const domainsApi = async () => {
    if(config.isMock) { await wait(500); return domainsMock }
    const res = await request.get(`api/domains`).catch(err => { throw (err.response) });
    return res.data;
}

const getImmigrantsApi = async () => {
    if(config.isMock) { await wait(500); return mock } //mockSchedules  or []
    const res = await request.get(`api/immigrant`).catch(err => { throw (err.response) });
    console.log(res);
    return res.data;
}

const deleteImmigrantApi = async (id) => {
    console.log('delete');
    // throw ({msg: 'adad', id});
    if(config.isMock) { await wait(500); return id } //mockSchedules  or []
    const res = await request.delete(`api/immigrant/${id}`).catch(err => { throw ({msg: err.response, id}) });
    console.log(res);
    return res.data;
}

const addImmigrantsApi = async (domain,user) => {
    if(config.isMock){await wait(2000); return users};
    user.forEach(element => {
        
    });
    const res = await request.post(`api/immigrant`,{"Domain": domain,"Name": user}).catch(err => { throw (err.response) });
    return res.data;
}

const pauseStateApi = async (id, state) => {
    console.log(state);
    if(config.isMock) { await wait(500); return true } //mockSchedules  or []
    const res = await request.put(`api/immigrant/${id}`, state).catch(err => { throw (err.response) });
    console.log(res);
    return res.data;
}

const addImmigrantsApiPromise = async (domain,user) =>{
    if(config.isMock) { await wait(2000); return mock } 
    let arrayPromise = [];
    
    user.forEach(element => {
        arrayPromise.push(new Promise((resolve,reject) =>{
            
            request.post(`api/immigrant`,{"Domain": domain,"Name": element.name}).catch(err => {reject (err.response) })
            .then(function(response){resolve(response)});
            
            
        }))
    });
    
    const results =await Promise.all(arrayPromise)
    
    console.log(results)
    return results;
}
const getUsernamesPerNameKart = async (username) =>{
    await wait(200); 
    return users;

    // if(config.isMock){await wait(200); return users};
    // const res = await request.get(`search`,{params:{
    //     username: username
    // }},{timeout : 10000}).catch(err => { throw (err.response) });
    // return res.data;
}

const setViewedApi = async (id) => {
    if(config.isMock) { await wait(500); return true }
    const state = {viewed: true}
    const res = await request.put(`api/immigrant/${id}`, state).catch(err => { throw (err.response) });
    console.log(res);
    return res.data;
}
export { getImmigrantsApi, addImmigrantsApi, deleteImmigrantApi, pauseStateApi, getUsernamesPerNameKart , authApi, domainsApi,addImmigrantsApiPromise, setViewedApi }


