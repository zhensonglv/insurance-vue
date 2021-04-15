import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/base/track/list',
    method: 'post',
    data
  })
}

