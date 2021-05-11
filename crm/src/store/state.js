let str = localStorage.getItem('crmUserInfo')
let obj = str ? JSON.parse(str) : {}
export  default{
  // 就是当作 state使用 的； 存放的都是公用数据
  userInfo:obj,// 把localStorage和vuex结合起来
}