import request from '@/utils/request'

/**
 * 发布功能
 * @param path
 * @param data
 * @returns {AxiosPromise}
 */
export function publish(path, data) {
  return request({
    url: '/base/' + path + '/publish',
    method: 'post',
    data
  })
}

