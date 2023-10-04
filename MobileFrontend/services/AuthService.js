import { baseUrl } from "./client";
import axios from "axios";
import client from "./client";
const APIEndpoint = "http://localhost:8000/";

const LoginUser = (data) =>
  new Promise((resolve, reject) => {
    const url = baseUrl+'/user/loginAccount';
    // console.log({data})
    axios
    .post(url, data)
    .then((res) => {
    // console.log({res: res.data})
    if (res?.data?.success){
        resolve(res);
    } else {
        reject(res);
    }
    })
    .catch((err) => {
      console.log({err})
      reject({err, status: 404});
    });
});

const RegisterUser = (data) =>
  new Promise((resolve, reject) => {
    //const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const url = baseUrl+'/user/registerAccount';
    console.log({data})
    axios
    .post(url, data)
    .then((res) => {
    if (res?.data?.success){
        resolve(res);
    } else {
        reject(res);
    }
    })
    .catch((err) => {
      reject(err);
    });
});

const CheckUniqueUsername = (username) =>
  new Promise((resolve, reject) => {
    const url = baseUrl + '/user/checkUniqueUsername';
    axios
      .post(url, { username })
      .then((res) => {
        if (res.data.hasOwnProperty("isUnique")) {
          resolve(res.data);
        } else {
          reject({ error: "Unexpected response format" });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
  const GetAccountNumber = async (username) =>{
    const res = await client.get(baseUrl+'/user/getAccountNumber/'+username);
    console.log(res);
    if(res?.data?.success){
        return(res.data);
    }else{
        return(res.data.message);
    }
}


export default{
  LoginUser,
  RegisterUser,
  CheckUniqueUsername,
  GetAccountNumber,
}