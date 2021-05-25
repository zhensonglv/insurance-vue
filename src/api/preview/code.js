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

export function getTreat(data) {
  return request({
    url: '/preview/code/getTreat',
    method: 'post',
    data
  })
}
export function getProvince(data) {
  return request({
    url: '/preview/code/getProvince',
    method: 'post',
    data
  })
}

export function getCity(data) {
  return request({
    url: '/preview/code/getCity',
    method: 'post',
    data
  })
}

export function getAreaCascader() {
  return request({
    url: '/preview/code/getAreaCascader',
    method: 'post'
  })
}
