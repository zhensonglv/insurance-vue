import request from '@/utils/request'

export function getList(data, id) {
  return request({
    url: '/base/treat/list/' + id,
    method: 'post',
    data
  })
}

export function findById(id) {
  return request({
    url: '/base/treat/query/' + id,
    method: 'get'
  })
}

export function save(data, id) {
  return request({
    url: '/base/treat/save',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/base/treat/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: '/base/treat/edit',
    method: 'put',
    data
  })
}

