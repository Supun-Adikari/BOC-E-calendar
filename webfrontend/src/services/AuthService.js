import { baseUrl } from "./client";
import axios from "axios";

const APIEndpoint = "http://localhost:8000/";

const LoginUser = (data) =>
  new Promise((resolve, reject) => {
    const url = baseUrl + '/user/loginAccount';
    console.log('Auth service');
    axios
      .post(url, data)
      .then((res) => {
        // Check if the response status is available
        console.log(res)
        if (res.status) {
          if (res.status === 200) {
            resolve(res);
          } else {
            resolve(res);
          }
        } else {
          // If the response status is not available, handle it as an error
          resolve({ message: 'Response status not available' });
        }
      })
      .catch((err) => {
        resolve(err.response);
      });
  });


const RegisterUser = (data) =>
  new Promise((resolve, reject) => {
    //const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const url = baseUrl+'/user/registerAccount';
    console.log("authserve")
    console.log({data})
    axios
    .post(url, data)
    .then((res) => {
    if (res.data.success){
        resolve(res);
    } else {
        reject(res.data);
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

export default{
  LoginUser,
  RegisterUser,
  CheckUniqueUsername
}