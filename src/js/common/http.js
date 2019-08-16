import axios from 'axios';
import { baseHttpUrl, httpTimeOut } from '../config/http-settings'
// import { rsaEncrypt} from ''
// import EncryptAES from 'utils/EncryptAES'
import { randomString  } from './string'
// import { Message, Modal } from 'antd'

// import rsas from 'jsrsasign';
// import {Base64} from 'js-base64'
// import { publicKey } from '../assets/settings'


// 创建RSAKey对象
// const rsa = new rsas.RSAKey();
// 传入密钥
// rsa.readPKCS8PubKeyHex(rsas.b64tohex(publicKey));
// 创建Signature对象，设置签名编码算法


const errorStatus = {
    510 : '会话访问失效，请重新登录',
    511 : '服务异常'
}

let modalControl =  false;
export const http = axios.create({
    timeout: httpTimeOut,
    baseURL:baseHttpUrl,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    }
});

export function get(url,param){
    return http.get(url,{
        method:"get",
        data:param
    })
}

export function post(url,params){
    return http.post(url,params,{
        method:"post"
    })
}

export function dele(url,params){
    return http.delete(url,{data:params})
}

export function put(url,params){
    return http.put(url,params,{
        method:"put"
    })
}
// 添加一个请求拦截器
// export const httpInterceptorReq = http.interceptors.request.use(
//     config => {
//         let token = sessionStorage.getItem('token');
//         let timeStamp=new Date().getTime();
//         let random = sessionStorage.getItem('random');
//         if(token){
//             let rsaString = rsaEncrypt.encrypt(timeStamp + random);
//             config.headers.Token = rsaString + '.' +token;
//         }
//         if(config.method === 'post' && config.headers['Content-Type'] === 'application/json; charset=utf-8'){
//             let encryptKey = randomString(16);
//             let data = { "requestData" : EncryptAES.encrypt(JSON.stringify(config.data), encryptKey ), "encryptKey" : rsaEncrypt.encrypt(encryptKey), };
//             config.data = JSON.stringify(data)
//         }
//         return config;
//     },
//     error=> {
//         return Promise.reject(error);
//     });
//
// // 添加一个响应拦截器
// export const httpInterceptorResp = http.interceptors.response.use(
//     response => {
//         if(response.config.method === 'get' || (response.config.method === 'post' && response.headers['content-type'] !== 'application/json;charset=UTF-8')){
//             return response;
//         }
//
//         const rsaSign = new rsas.KJUR.crypto.Signature({"alg": "MD5withRSA"});
//         rsaSign.init(rsa);
//         let data = Base64.decode(response.data.data);
//         rsaSign.updateString(data);
//         var isValid = rsaSign.verify(rsas.b64tohex(response.data.sign));
//         if(isValid){
//             response.data.data = JSON.parse(data) ;
//             return response.data;
//         }else{
//             let error = {
//                 errorCode : '9999',
//                 errorMessage : '响应数据异常',
//             }
//             Message.error(error.errorMessage);
//             return Promise.reject(error);
//         }
//     },
//     error => {
//         if(error.response && error.response.status === 510 ){
//             if(!modalControl){
//                 modalControl = true;
//                 Modal.error({
//                     title: '请重新登录',
//                     content: errorStatus[error.response.status],
//                     okText:"重新登录",
//                     onOk() {
//                         modalControl = false;
//                         Modal.destroyAll();
//                         window._ROUTER_.push('/login');
//                     },
//                 });
//             }
//
//         }else{
//             Message.error(errorStatus[511]);
//         }
//         return Promise.reject(error);
//     });
