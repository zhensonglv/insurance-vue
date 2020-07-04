import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/base/batch/list',
    method: 'post',
    data
  })
}

export function findById(id) {
  return request({
    url: '/base/batch/query/' + id,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/base/batch/save',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/base/batch/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: '/base/batch/edit',
    method: 'put',
    data
  })
}

