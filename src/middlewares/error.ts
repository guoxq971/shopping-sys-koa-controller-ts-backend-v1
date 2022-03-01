export default class ErrorException {
    message: string
    code: number
    data: object

    constructor(msg: string = '出现错误，请联系管理员', data: object = {}, code: number = 1) {
        this.message = msg
        this.code = code
        this.data = data
    }
}
export const MSG_SUCCESS_ADD = '添加成功！'
export const MSG_SUCCESS_DEL = '删除成功！'
export const MSG_SUCCESS_UPDATE = '更新成功！'
export const MSG_SUCCESS_LIST = '查询成功！'
export const MSG_SUCCESS_DETAIL = '查询成功！'
export const MSG_SUCCESS = '操作成功'

export const MSG_empty = '该信息不存在'
export const MSG_errAdd = '添加失败'
export const MSG_errUpdate = '更新失败'
export const MSG_emptyById = 'id不能为空'
export const MSG_del = '删除失败'