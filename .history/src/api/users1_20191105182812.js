// 查询产品组合
export function users1Query(pageNumber, pageSize, nickname) {
  return request({
    url: 'api/users1?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&nickname=' + nickname,
    method: 'get'
  })
}