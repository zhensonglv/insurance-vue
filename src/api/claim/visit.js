import request from '@/utils/request'

export function getList(data, id) {
  return request({
    url: '/base/visit/list/' + id,
    method: 'post',
    data
  })
}

export function findById(id) {
  return request({
    url: '/base/visit/query/' + id,
    method: 'get'
  })
}

export function save(data, id) {
  return request({
    url: '/base/visit/save',
    method: 'post',
    data
  })
}

export function deleteVisit(id) {
  return request({
    url: '/base/visit/delete/' + id,
    method: 'delete'
  })
}

export function del(id) {
  return request({
    url: '/base/visit/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: '/base/visit/edit',
    method: 'put',
    data
  })
}

export function initVistData(data) {
  return request({
    url: '/base/compensateResult/initVisitInfo',
    method: 'post',
    data
  })
}

export function combineVisit(data) {
  return request({
    url: '/base/visit/combineVisit',
    method: 'post',
    data
  })
}

