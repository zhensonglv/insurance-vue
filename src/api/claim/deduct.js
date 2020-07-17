import request from '@/utils/request'

export function getList(data, id) {
  return request({
    url: '/base/deduct/list/' + 2,
    method: 'post',
    data
  })
}

