import axios from "axios";
import { config } from "yargs";

const baseURL = "https://jsonplaceholder.typicode.com";

let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}


let client = axios.create({
    baseURL:baseURL,
    headers,
    withCredentials:false
})


client.interceptors.request.use(async(config)=>{
    return config;
})


client.interceptors.response.use(async(response)=>{
    return response.data
},
async (response)=>{
    return Promise.reject({status: response.status, ...response.data});
}

)




export default {
    get:async (url,data)=>{
        return new Promise((resolve,reject)=>{
            client.get(url,{params:data}).then((res)=>{
               resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    }
    ,
  post: async function (url, data) {
    console.log("data tpokemn",data)
    return new Promise((resolve, reject) => {
      client
        .post(url, data)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  put: async function (url, data) {
    return new Promise((resolve, reject) => {
      client
        .put(url, data)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  delete: async function (url, data) {
    return new Promise((resolve, reject) => {
      client
        .delete(url, data)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
}