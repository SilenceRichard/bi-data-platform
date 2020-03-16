import axios from 'axios';
// import { message } from 'antd';
import NProgress from 'nprogress';
import  Qs from 'qs';
import 'nprogress/nprogress.css';

// const interceptorObj = {}; // 将刚请求url以 时间戳：url 的形式存储
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
let hasError = false; // 判断返回的结果有无错误
// let timer: any = null; // 设置定时器
source.cancel('请勿频繁请求');
axios.defaults.baseURL = '/bi';
// axios.defaults.baseURL = '/test';
// axios.defaults.baseURL = 'http://10.188.32.7:9941/bi';
// 请求拦截器
// axios.interceptors.request.use(
//   (config) => {
//     // 请求节流
//     const { url } = config;
//     // 获取当前时间
//     const nowTime = new Date().getTime();
//     Object.keys(interceptorObj).forEach((key) => {
//       // 设置时间 1s
//       if (nowTime - key > 1000) {
//         delete interceptorObj[key];
//       }
//     });
//     const pastUrls = Object.values(interceptorObj);
//     // 判断是否刚请求了此url （不存在）
//     if (pastUrls.indexOf(url) === -1) {
//       // 存储至interceptorObj
//       const key = new Date().getTime();
//       interceptorObj[key] = url;
//       return config;
//     }
//     // 存在刚刚的请求
//     return {
//       cancelToken: source.token,
//     };
//   },
//   (error) => Promise.reject(error),
// );

// 响应拦截器（异常处理）
axios.interceptors.response.use(
  (response: any) => {
    if (response && response.data) {
      const { data } = response;
      const { status: errno, message: errmsg = '', data: res = {} } = data;
      if (errno === 0) {
        let formatRes = res;
        if (!res) {
          formatRes = {};
        }
        return Promise.resolve(formatRes);
      }
      return Promise.reject(errmsg);
    }
    return Promise.resolve(response);
  },
  (err) => {
    // 拦截掉的请求
    if (axios.isCancel(err)) {
      return Promise.reject(err.message);
    }
    // 其他异常请求
    let errmsg = '服务器连接失败！';
    if (err && err.response) {
      errmsg = `${err.response.status} ${err.response.statusText}`;
    }
    return Promise.reject(errmsg);
  },
);

interface HttpParams {
  url: string,
  params: any,
  isForm?: boolean,
  method?: 'get' | 'post',
}

interface Config {
  method: 'get' | 'post',
  url: string,
  timeout: number,
  headers?: object,
  params?: any,
  data?: any,
}

export function $http({ method = 'get', url, params, isForm = false }: HttpParams) {
  const config: Config = {
    method,
    url,
    timeout: 20000,
  };

  if (!isForm) {
    // 非表单提交
    config.headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
    if (method === 'get') {
      config.params = params || '';
    } else if (method === 'post') {
      config.data = Qs.stringify(params || {});
    }
  } else {
    // 表单提交参数为formData
    config.data = params;
  }
  NProgress.start();
  return new Promise((resolve, reject) => {
    axios(config)
      .then((res) => {
        resolve(res);
        NProgress.done();
      })
      .catch((err: string) => {
        NProgress.done();
        if (!hasError) {
          // message.error(err);
        }
        // 错误节流 避免多次错误提示
        // hasError = true;
        // clearTimeout(timer);
        // timer = setTimeout(() => {
        //   hasError = false;
        // }, 1000);
        reject(err);
      });
  });
}

export const $get = ({ url, params }: HttpParams) => $http({ url, params });
export const $post = ({ url, params, isForm = false }: HttpParams) =>
  $http({ method: 'post', url, params, isForm });
