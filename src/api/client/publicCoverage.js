import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/base/publicCoverage/list',
    method: 'post',
    data
  })
}

export function findById(id) {
  return request({
    url: '/base/publicCoverage/' + id,
    method: 'get'
  })
}

export function getTypeOptions(id) {
  return request({
    url: '/base/getTypeOptions/',
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/base/publicCoverage/save',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/base/publicCoverage/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: '/base/publicCoverage/edit',
    method: 'put',
    data
  })
}

