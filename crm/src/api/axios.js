/* axios 的二次配置 */
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui';

//axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.withCredentials = true;
// post 请求头的格式要求
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// post 请求回来数据JSON字符串格式
axios.defaults.transformRequest = data => qs.stringify(data);

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.code != 0) {
        // 只要后端返回的 code不是0 证明后端处理失败
        // 失败的话 我们就把后端的失败信息提示给用户
        // alert(response.data.codeText)
        // Message.error(response.data.codeText)
        Message.error({
            message: response.data.codeText,
            duration: 1000
        })
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    // 后端给的响应时 4xx或5xx 这时我们给用户提示 系统繁忙即可
    // alert('系统繁忙 请稍后重试')
    Message.error('系统繁忙 请稍后重试')
    return Promise.reject(error);
});


export default axios;