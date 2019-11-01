import request from '@/utils/request'
//获取类名 
export function getClassName() {
  return request({
    url: 'api/getAllDomain',
    method: 'get'
  })
}

export function getQuerySql() {
  return request({
    url: 'api/sql/1',
    method: 'get'
  })
}

//查询字典
export function queryDict(className) {
  return request({
    url: 'api/queryDict'+className,
    method: 'get'
  })
}

//插入关系
export function queryRelation(className) {
  return request({
    url: 'api/queryRelation?clazz='+className,
    method: 'get'
  })
}

//获取列表
export function sqlList(pageNumber,pageSize) {
  return request({
    url: 'api/sql?pageNumber='+pageNumber+'&pageSize='+pageSize,
    method: 'get'
  })
}

//获取列表编辑数据
export function editData(id) {
  return request({
    url: 'api/sql/'+id,
    method: 'get'
  })
}

//增加/编辑数据
export function addData(type,data) {
  return request({
    url: 'api/sql',
    method: type,
    data
  })
}

//删除数据
export function deleteData(id) {
  return request({
    url: 'api/sql/'+id,
    method: 'DELETE'
  })
}

//获取所有表信息
export function getListData() {
  return request({
    url: 'api/getAllTableInfo',
    method: 'get'
  })
}