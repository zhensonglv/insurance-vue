import request from '@/utils/request'

export function getList(data, id) {
  return request({
    url: '/base/duty/list/' + id,
    method: 'post',
    data
  })
}

export function findById(id) {
  return request({
    url: '/base/duty/query/' + id,
    method: 'get'
  })
}

export function save(data, id) {
  return request({
    url: '/base/duty/save',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/base/duty/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: '/base/duty/edit',
    method: 'put',
    data
  })
}

