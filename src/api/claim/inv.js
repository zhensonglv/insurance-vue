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
