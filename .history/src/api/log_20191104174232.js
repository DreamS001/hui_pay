import request from '@/utils/request'

export function getErrDetail(id) {
  return request({
    url: 'api/logs/error/' + id,
    method: 'get'
  })
}
// 查询产品组合
export function logQuery(pageNo, pageSize, count, operator_id, type, addtime) {
  return request({
    url: 'api/log?pageNo=' + pageNo + '&pageSize=' + pageSize + '&count=' + this.count + '&operator_id=' + this.operator_id + '&type=' + this.type + '&addtime=' + this.addtime,
    method: 'get'
  })
}
