import Koa = require('koa');
import {bootstrapControllers} from 'koa-ts-controllers';
import Router = require("koa-router")
import init from "./config/db2";
import MD from "./middlewares/index";
import moment = require("moment");
import compose = require("koa-compose");
import config from './config';
import {tool} from "./utils/tool";
import koa_static = require("koa-static");

const path = require('path')
const app = new Koa();
const router = new Router();

(async () => {
    app.use(compose(MD));

    // mysql 初始化
    init()
    //在controllers中读文件涉及到异步
    await bootstrapControllers(app, {
        router: router, //内部还是要使用router来实现路由绑定
        basePath: '/api', //定义api的规则【所有接口的基础路径】
        versions: [1], //版本
        controllers: [  //存放所有控制器类，是数组
            __dirname + '/controllers/**/*'
        ],
        // 错误捕捉
        errorHandler(err, ctx) {
            ctx.body = {
                code: 1,
                message: err.message || '发生异常，请联系管理员！',
            }
        },
    });

    app.use(router.routes()); //注册路由
    app.use(router.allowedMethods());
    // 静态文件目录
    app.use(koa_static(path.join(__dirname, config.staticPath)));


    app.listen(config.port, () => {
        console.log(`服务开启成功${config.host}:${config.port}, ${tool.curTime}`)
    });
})()