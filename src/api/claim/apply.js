import request from '@/utils/request'

export function getList(data, id) {
  return request({
    url: '/base/apply/list/',
    method: 'post',
    data
  })
}

export function findById(id) {
  return request({
    url: '/base/apply/query/' + id,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/base/apply/save',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/base/apply/' + id,
    method: 'delete'
  })
}

export function deleteApp(id) {
  return request({
    url: '/base/apply/delete/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: '/base/apply/edit',
    method: 'put',
    data
  })
}

export function init(data) {
  return request({
    url: '/base/apply/initResponse',
    method: 'post',
    data
  })
}

export function calc(data) {
  return request({
    url: '/base/apply/calc',
    method: 'post',
    data
  })
}

export function hangeRule(data) {
  return request({
    url: '/drool/rule/param',
    method: 'post',
    data
  })
}

export function claimRule(data) {
  return request({
    url: '/base/claimRule/hangeRule',
    method: 'post',
    data
  })
}
