
import axios from 'axios';
import config from 'config';
import mock from './mock';
import groups from './groups';
import users from './users';
import wait from 'utils/wait';
import gardeners from './statsMocks/gardeners';
import statsMock from './statsMocks/statsMock';
import migratedMock from './statsMocks/migratedMock';
import totalMigratedMock from './statsMocks/totalMigratedMock';
import domainsMaps from './domainsMaps'
import excelConfig from './excelconfig';
import promiseAllWithFails from 'utils/promiseAllWithFails'

const AuthDataMock = {
    id: '1',
    fullName: 'חציל אפ וי',
    isAdmin: false
}

// const domainsMock = ['1', '2','3'];
const domainsMock = {
    ads: "rabiranuid",
    es: "somedomainuid",
    target: "target"
}
// const domainsMock = ['dsdsadsadsadsa', 'dsadsadsadsa','dsaaadsadasdsa',];


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

const excelApi = async() =>{
    if(config.isMock){
        await wait(500); return excelConfig;
    }
    const res = await request.get(`api/excel`,{"Access-Control-Allow-Origin": "*",'Content-Type': 'text/plain'}).catch(err => {throw (err.response) });
    return res.data;
}
const entityTypeApi = async() =>{
    if(config.isMock){
        await wait(500); return config.entityTypeG;
    }
    const res = await request.get(`api/entityType`,{"Access-Control-Allow-Origin": "*",'Content-Type': 'text/plain'}).catch(err => {throw (err.response) });
    return res.data;
}
const domainsMapApi = async() =>{
    if(config.isMock){
        await wait(500); return domainsMaps;
    }
    const res = await request.get(`api/domainsMap`,{"Access-Control-Allow-Origin": "*",'Content-Type': 'text/plain'}).catch(err => {throw (err.response) });
    return res.data;
}

const domainsApi = async () => {
    if(config.isMock) { await wait(200); return domainsMock }
    const res = await request.get(`api/domains`, {"Access-Control-Allow-Origin": "*",'Content-Type': 'text/plain'}).catch(err => { throw (err.response) });
    return res.data;
}

// .sort((a,b) => { return (a.viewed === b.viewed) ? 0 : a.viewed? 1: -1 })
const getImmigrantsApi = async () => {
    if(config.isMock) { await wait(500); return mock } //mockSchedules  or []
    const res = await request.get(`api/immigrant`).catch(err => { throw (err.response) });
    //console.log(res);
    return res.data;
}


const deleteImmigrantApi = async (id) => {
    //console.log('delete');
    // throw ({msg: 'adad', id});
    if(config.isMock) { await wait(500); return id } //mockSchedules  or []
    const res = await request.delete(`api/immigrant/${id}`).catch(err => { throw ({msg: err.response, id}) });
    //console.log(res);
    return res.data;
}


const pauseStateApi = async (id, state) => {
    //console.log(state);
    if(config.isMock) { await wait(500); return true } //mockSchedules  or []
    const res = await request.put(`api/immigrant/${id}`, state).catch(err => { throw (err.response) });
   // console.log(res);
    return res.data;
}

const retryApi = async (id, step, subStep) => {
    if(config.isMock) { await wait(500); return true } //mockSchedules  or []
    const res = await request.post(`api/immigrant/retry/${id}`, {step, subStep}).catch(err => { throw (err.response) });
    console.log(res);
    return res.data;
}

const addImmigrantsApiPromise = async (usersToCreate) =>{
    if(config.isMock) { await wait(2000); return mock } 
    let arrayPromise = [];
    //console.log(usersToCreate)
    usersToCreate.forEach(element => {
        arrayPromise.push(new Promise((resolve,reject) =>{
            
            request.post(`api/immigrant`,{"primaryUniqueId": element.primaryUniqueId,"id": element.id,"isNewUser": element.newUser, "isUrgent": element.urgentUser,"startDate": element.startDate}).catch(err => {reject (element) })
            .then(function(response){resolve(element)});
            
            
        }))
    });
    
    const results =await promiseAllWithFails(arrayPromise);
   // console.log(results)
    
    return results;
}

const getGroupsPerNameKart = async (groupname) =>{
    if(config.isMock){
        await wait(200);
        return groups;
    }
    const res = await request.get(`api/searchOG/${groupname}`
    ,{timeout : 2000}).catch(err => { throw (err.response) });
    return res.data;
}
const getMembersOfGroupKart = async(groupid) =>{
    console.log(groupid)
    if(config.isMock){
        await wait(200)
        return users;
    }
    const res = await request.get(`api/getMembers/${groupid}`,{timeout: 2000}).catch(err => {throw(err.response)})
    console.log(res.data)
    return res.data;
}
const getUsernamesPerNameKart = async (username) =>{
    if(config.isMock){await wait(200); return users};
    const res = await request.get(`api/search/${username}`
    ,{timeout : 2000, "Access-Control-Allow-Origin": "*",'Content-Type': 'text/plain'}).catch(err => { throw (err.response) });
    return res.data;
}
const getGardenersStatsApi = async () => {
    if(config.isMock) { await wait(300); return gardeners}
    const res = await request.get(`api/stats/gardeners`).catch(err => { throw (err.response) });
    return res.data;
}

const getStatusesStatsApi = async () => {
    if(config.isMock) { await wait(300); return statsMock}
    const res = await request.get(`api/stats/statuses`).catch(err => { throw (err.response) });
    return res.data;
}

const getMigrationsStatsApi = async () => {
    if(config.isMock) { await wait(300); return migratedMock}
    const res = await request.get(`api/stats/completed`).catch(err => { throw (err.response) });
    return res.data;
}

const getTotalMigrationsStatsApi = async () => {
    if(config.isMock) { await wait(300); return totalMigratedMock}
    const res = await request.get(`api/stats/total`).catch(err => { throw (err.response) });
    return res.data;
}

const setViewedApi = async (id) => {
    if(config.isMock) { await wait(200); return true }
    const state = {viewed: true}
    const res = await request.put(`api/immigrant/${id}`, state).catch(err => { throw (err.response) });
    console.log(res);
    return res.data;
}

export { getImmigrantsApi, getUsernamesPerNameKart , authApi, domainsApi,addImmigrantsApiPromise, getGroupsPerNameKart ,
deleteImmigrantApi, pauseStateApi , setViewedApi, excelApi, entityTypeApi,domainsMapApi,
getGardenersStatsApi, getStatusesStatsApi, getMigrationsStatsApi, getTotalMigrationsStatsApi, retryApi, getMembersOfGroupKart}


