
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
    if(config.isMock) { await wait(200); return AuthDataMock } //mockSchedules  or []
    const res = await request.get(`auth`).catch(err => { throw (err.response) });
    return res.data;
}

const domainsApi = async () => {
    if(config.isMock) { await wait(200); return domainsMock }
    const res = await request.get(`api/domains`).catch(err => { throw (err.response) });
    return res.data;
}

const getImmigrantsApi = async () => {
    if(config.isMock) { await wait(200); return mock } //mockSchedules  or []
    const res = await request.get(`api/immigrant`).catch(err => { throw (err.response) });
    console.log(res);
    return res.data;
}

const addImmigrantsApi = async (domain,user) => {
    console.log(user[0].name)
    if(config.isMock){await wait(2000); return users};
    user.forEach(element => {
        
    });
    const res = await request.post(`api/immigrant`,{"Domain": domain,"Name": user}).catch(err => { throw (err.response) });
    return res.data;
}

const addImmigrantsApiPromise = async (domain,user) =>{
    let arrayPromise = [];
    
    user.forEach(element => {
        arrayPromise.push(new Promise((resolve,reject) =>{
            
            request.post(`api/immigrant`,{"Domain": domain,"Name": element.name}).catch(err => {reject (err.response) })
            .then(function(response){console.log("finish");resolve(response)});
            
            
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

export { getImmigrantsApi,addImmigrantsApi, getUsernamesPerNameKart , authApi, domainsApi,addImmigrantsApiPromise }


