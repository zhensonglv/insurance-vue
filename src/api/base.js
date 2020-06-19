import request from '@/utils/request'

export function getList(path, data) {
  return request({
    url: '/base/' + path + '/list',
    method: 'post',
    data
  })
}

export function findById(path, id) {
  return request({
    url: '/base/' + path + '/' + id,
    method: 'get'
  })
}

export function save(path, data) {
  return request({
    url: '/base/' + path + '/save',
    method: 'post',
    data
  })
}

export function del(path, id) {
  return request({
    url: '/base/' + path + '/' + id,
    method: 'delete'
  })
}

export function edit(path, data) {
  return request({
    url: '/base/' + path + '/edit',
    method: 'put',
    data
  })
}

export function getCdeParentList() {
  return request({
    url: '/base/dict/getParentList',
    method: 'get'
  })
}

export function getPath(data) {
  return request({
    url: '/base/paramterPath/getPath',
    method: 'post',
    data
  })
}
