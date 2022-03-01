export default class SuccessException {
    message: string
    code: number
    data: object

    constructor(msg: string = '', data: object = {}, code: number = 0) {
        this.message = msg
        this.code = code
        this.data = data
    }
}