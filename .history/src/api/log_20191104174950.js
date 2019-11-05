import request from '@/utils/request'

export function getErrDetail(id) {
  return request({
    url: 'api/logs/error/' + id,
    method: 'get'
  })
}
// 查询产品组合
export function logQuery(pageNumber, pageSize, count, operator_id, type, addtime) {
  return request({
    url: 'api/log?pageNo=' + pageNumber + '&pageSize=' + pageSize + '&count=' + count + '&operator_id=' + operator_id + '&type=' + type + '&addtime=' + addtime,
    method: 'get'
  })
}
