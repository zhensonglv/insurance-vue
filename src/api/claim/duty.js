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

export function deleteDuty(id) {
  return request({
    url: '/base/duty/delete/' + id,
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

export function initDutyData(data) {
  return request({
    url: '/base/compensateResult/initDutyInfo',
    method: 'post',
    data
  })
}

export function getPlyTree(data) {
  return request({
    url: '/base/compensateResult/getPlyTree',
    method: 'post',
    data
  })
}
export function getBaseOrderDuty(id) {
  return request({
    url: '/base/compensateResult/getBaseOrderDuty/' + id,
    method: 'post'
  })
}

export function copyDuty(data) {
  return request({
    url: '/base/duty/copyDuty',
    method: 'post',
    data
  })
}

export function adjustDuty(data) {
  return request({
    url: '/base/duty/adjustDuty',
    method: 'post',
    data
  })
}
