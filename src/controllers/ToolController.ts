import {Body, Controller, Ctx, Flow, Get, Post} from 'koa-ts-controllers';
import SuccessException from "../middlewares/success";
import config from "../config"
import {tool} from "../utils/tool";
import moment = require("moment");

const fs = require("fs")
const path = require("path")

@Controller('/tool')
export class ToolController {

    /* 图片基础路径 */
    @Post('/basePathImg')
    public async basePathImg() {
        let url = config.clientBaseImagePath;
        return new SuccessException('成功', {url: url})
    }

    @Post('/upload')
    public async upload(@Ctx() ctx, @Body() body) {
        console.log('upload file~')
        const file = ctx.request.files.file
        // 接收读出流
        const reader = fs.createReadStream(file.path)
        // 创建写入流
        // 3. 指定图片路径文件名（即上传图片存储目录）
        let ext = file.name.split('.');
        let fileName = `${tool.uuid()}.${ext[ext.length - 1]}`;
        let YYYYMM = `${moment().format('YYYYMM')}`
        let DD = `${moment().format('DD')}`

        let YM = `${config.tempFilePath}/${YYYYMM}`
        let YMDD = `${YM}/${DD}`
        let urlPath = `${config.urlPath}/${YYYYMM}/${DD}/${fileName}`

        if (!await fs.existsSync(YM)) {
            await fs.mkdirSync(YM)
        }
        if (!await fs.existsSync(YMDD)) {
            await fs.mkdirSync(YMDD)
        }
        let filePath = YMDD
        const stream = fs.createWriteStream(path.join(filePath, fileName))
        // 用管道将读出流 "倒给" 输入流
        reader.pipe(stream)
        // 4.打印上传文件在服器上存储的相对路径
        // console.log('uploading %s -> %s', fileName, stream.path, filePath)
        // 5.重定向到基于根目录下的静态资源web访问路径，展示图片
        // ctx.redirect(stream.path.substr(6).replace(/\\/g, '/'))


        return new SuccessException('upload！', {url: urlPath})
    }

}

