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
