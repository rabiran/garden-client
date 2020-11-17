
import axios from 'axios';
import config from 'config';
import mock from './mock';
import users from './users';
import wait from 'utils/wait';
import gardeners from './gardeners';

const AuthDataMock = {
    id: '1',
    fullName: 'חציל אפ וי',
    isAdmin: false
}

const domainsMock = ['1', '2','3'];
// const domainsMock = ['dsdsadsadsadsa', 'dsadsadsadsa','dsaaadsadasdsa',];


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
    console.log(domainsMock)
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


const addImmigrantsApiPromise = async (domain,usersToCreate) =>{
    //if(config.isMock) { await wait(2000); return mock } 
    let arrayPromise = [];
    console.log(usersToCreate)
    usersToCreate.forEach(element => {
        arrayPromise.push(new Promise((resolve,reject) =>{
            
            request.post(`api/immigrant`,{"Domain": domain,"Name": element.name}).catch(err => {reject (element) })
            .then(function(response){resolve(element)});
            
            
        }))
    });
    
    const results =await Promise.allSettled(arrayPromise)
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
const getGardeners = async () =>{
    if(config.isMock) { await wait(2000); return gardeners}
    const res = await request.get(`api/gardeners`).catch(err => { throw (err.response) });
    return res.data;

}

export { getImmigrantsApi, getUsernamesPerNameKart , authApi, domainsApi,addImmigrantsApiPromise, getGardeners }


