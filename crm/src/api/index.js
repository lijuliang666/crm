/* 所有发送给服务器的请求 */
import axios from './axios';
import custom from './custom';
// 登录请求
export function login(options) {
    return axios.post('/user/login', options)
}
// 退出请求
export function logout() {
    return axios.get('/user/signout')
}
// 部门列表
export function getDepList() {
    return axios.get('/department/list')
}

// 新增部门
export function addDep(options) {
    return axios.post('/department/add', options)
}

// 获取部门信息
export function getDepInfo(id) {
    return axios.get('/department/info', {
        params: {
            departmentId: id
        }
    })
}

// 修改部门信息
export function updateDepInfo(option) {
    return axios.post('/department/update', option)
}

// 删除部门信息
export function delDepInfo(id) {
    return axios.get('/department/delete?departmentId=' + id)
}

// 请求员工列表
export function getUserList(options) {
    return axios.get('/user/list', {
        params: options
    })
}

/* 客户管理部分 */
export default{
    custom
}
