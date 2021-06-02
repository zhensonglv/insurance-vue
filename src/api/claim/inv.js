import request from '@/utils/request'

export function getList(data, id) {
  return request({
    url: '/base/inv/list/' + id,
    method: 'post',
    data
  })
}

export function findById(id) {
  return request({
    url: '/base/inv/query/' + id,
    method: 'get'
  })
}

export function save(data, id) {
  return request({
    url: '/base/inv/save',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/base/inv/' + id,
    method: 'delete'
  })
}

export function deleteInv(id) {
  return request({
    url: '/base/inv/delete/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: '/base/inv/edit',
    method: 'put',
    data
  })
}

export function initData(data) {
  return request({
    url: '/base/compensateResult/initInvInfo',
    method: 'post',
    data
  })
}

export function copyInv(data) {
  return request({
    url: '/base/inv/copyInv',
    method: 'post',
    data
  })
}

export function splitInv(data) {
  return request({
    url: '/base/inv/splitInv',
    method: 'post',
    data
  })
}

export function updateExcel(data) {
  return request({
    url: '/base/inv/updateExcel',
    method: 'put',
    data
  })
}
