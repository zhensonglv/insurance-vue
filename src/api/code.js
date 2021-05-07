import request from '@/utils/request'

export function getCodeList(data) {
  return request({
    url: '/base/code/codeList',
    method: 'post',
    data
  })
}

export function getHospital(data) {
  return request({
    url: '/base/code/getHospital',
    method: 'post',
    data
  })
}

