import request from '@/utils/request'

export function getList(path, data) {
  return request({
    url: '/preview/' + path + '/list',
    method: 'post',
    data
  })
}

export function findById(path, id) {
  return request({
    url: '/preview/' + path + '/' + id,
    method: 'get'
  })
}

export function save(path, data) {
  return request({
    url: '/preview/' + path + '/save',
    method: 'post',
    data
  })
}

export function del(path, id) {
  return request({
    url: '/preview/' + path + '/' + id,
    method: 'delete'
  })
}
export function deleteByCascade(path, id) {
  return request({
    url: '/preview/' + path + '/deleteByCascade/' + id,
    method: 'delete'
  })
}

export function edit(path, data) {
  return request({
    url: '/preview/' + path + '/edit',
    method: 'put',
    data
  })
}

export function search(path, data) {
  return request({
    url: '/preview/' + path + '/search',
    method: 'post',
    data
  })
}
export function batchSave(path, data) {
  return request({
    url: '/preview/' + path + '/batchSave',
    method: 'put',
    data
  })
}

export function batchDel(path, data) {
  return request({
    url: '/preview/' + path + '/batchSave',
    method: 'put',
    data
  })
}

export function diagMatchConfirm(path, data) {
  return request({
    url: '/preview/' + path + '/diagMatchConfirm',
    method: 'post',
    data
  })
}
export function hospMatchConfirm(path, data) {
  return request({
    url: '/preview/' + path + '/hospMatchConfirm',
    method: 'post',
    data
  })
}

export function taskMatchConfirm(path, data) {
  return request({
    url: '/preview/' + path + '/taskMatchConfirm',
    method: 'post',
    data
  })
}

export function deductConfirm(path, data) {
  return request({
    url: '/preview/' + path + '/deductConfirm',
    method: 'post',
    data
  })
}

export function handleFinish(path, data) {
  return request({
    url: '/preview/' + path + '/handleFinish',
    method: 'post',
    data
  })
}
