import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/base/group/list',
    method: 'post',
    data
  })
}

export function findById(id) {
  return request({
    url: '/base/group/' + id,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/base/group/save',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/base/group/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: '/base/group/edit',
    method: 'put',
    data
  })
}

