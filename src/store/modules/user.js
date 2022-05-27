import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter,asyncRoutes,constantRoutes} from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    //服务器返回的菜单信息【根据不同是的角色，返回的标记信息】
    routes:[],
    roles:[],
    buttons:[],
    //对比之后【项目中已有的异步路由，与服务器返回的标记信息进行对比最终需要展示的路由】
    resultAsyncRoutes:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  //存储用户信息
  SET_USERINFO: (state,userInfo)=>{
    state.name = userInfo.name
    state.avatar = userInfo.avatar
    state.routes = userInfo.routes
    state.buttons = userInfo.buttons
    state.roles = userInfo.roles
  },
  //最终计算出的异步路由
  SET_RESULTASYNCROUTES(state,asyncRoutes) {
    state.resultAsyncRoutes = asyncRoutes
  }
}

//定义一个函数：两个数组进行对比，对比当前用户到底显示哪些异步路由
const computedAsyncRoutes = (asyncRoutes,routes)=>{
  //过滤出当前用户需要展示的异步路由
   return asyncRoutes.filter(item=>{
    //数组当中没有这个元素就返回-1，有此元素就不返回-1
    if(routes.indexOf(item.name)!=-1){
      //递归：可能还会有2、3、4、5、6级路由
      if(item.children&&item.children.length){
        item.children = computedAsyncRoutes(item.children,routes)
      }
      return true
    }
  })
}

const actions = {
  // 这里在处理登录业务
  async login({ commit }, userInfo) {
    //解构出用户名与密码
    const { username, password } = userInfo
    let result = await login({ username: username.trim(), password: password })
    //注意：当前登录请求使用的是mock的数据，mock数据的code等于20000
    if(result.code==20000) {
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    }else {
      return Promise.reject(new Error('faile'))
    }
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        //vuex存储用户全部信息
        commit('SET_USERINFO',data)
        commit('SET_RESULTASYNCROUTES',computedAsyncRoutes(asyncRoutes,data.routes))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

