import request from '@/utils/request'
// 全部
export function messageAll(pageNo,pageSize,starDate,endDate) {
  return request({
    url: 'api/mix/message?pageNo='+pageNo+'&pageSize='+pageSize+'&starDate='+starDate+'&endDate='+endDate,
    method: 'get'
  })
}
// 查询
export function inquire() {
  return request({
    url: 'api/mix/message',
    method: 'get'
  })
}
// 添加
export function add(data) {
  return request({
    url: 'api/mix/message',
    method: 'post',
    data
  })
}
// 删除
export function deleter(id) {
  return request({
    url: 'api/mix/message/'+id,
    method: 'delete'
  })
}
// 回复
export function update(id,data) {
  return request({
    url: 'api/mix/message/'+id,
    method: 'PUT',
    data
  })
}
