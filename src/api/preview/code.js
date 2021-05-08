import request from '@/utils/request'

export function getCodeList(data) {
  return request({
    url: '/preview/code/codeList',
    method: 'post',
    data
  })
}

export function getHospital(data) {
  return request({
    url: '/preview/code/getHospital',
    method: 'post',
    data
  })
}

export function getDiag(data) {
  return request({
    url: '/preview/code/getDiag',
    method: 'post',
    data
  })
}

