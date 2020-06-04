import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/base/company/list',
    method: 'post',
    data
  })
}

export function findById(id) {
  return request({
    url: '/base/company/query/' + id,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/base/company/save',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/base/company/delete/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: '/base/company/edit',
    method: 'put',
    data
  })
}

