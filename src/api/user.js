import request from '@/utils/request'

export function login(data) {
  console.log(data, '---data')
  return request({
    url: '/auth/oauth/token',
    method: 'post',
    params: {
      username: data.username,
      password: data.password,
      grant_type: 'password'
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/base/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/auth/token/logout',
    method: 'post'
  })
}

export function getList(query, data) {
  return request({
    url: '/base/user/list?pageCode=' + query.page + '&pageSize=' + query.limit,
    method: 'post',
    data
  })
}

export function findById(id) {
  return request({
    url: '/base/user/' + id,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/base/user',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/base/user/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: '/base/user/edit',
    method: 'put',
    data
  })
}

export function changePass(data) {
  return request({
    url: '/base/user/changePass',
    method: 'post',
    data
  })
}

export const upload = process.env.VUE_APP_BASE_API + '/base/storage/local/upload'
