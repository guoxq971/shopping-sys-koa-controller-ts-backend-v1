/**
 * 引入第三方插件
 */
import cors = require("@koa/cors");
import koaBody = require("koa-body");
// import router = require("koa-router")
// const router = require("koa-router")

/**
 * 引入自定义文件
 */
// import log from "./log";
// const formidable = require('./formidable');
// const response = require('./response');
// const error = require('./error');
const formidable = require('./foormidable')

/**
 * 参数解析
 * https://github.com/koajs/bodyparser
 */
// const mdFormidable = formidable();
/*
* 处理body数据
* */
const mdKoaBody = koaBody({
    multipart: true,
});

/**
 * 统一返回格式
 */
// const mdResHandler = response();
/**
 * 错误处理
 */
// const mdErrorHandler = error();

/**
 * 路由处理
 */
// const mdRoute = router.routes();
// const mdRouterAllowed = router.allowedMethods();

/**
 * 跨域处理
 */
const mdCors = cors({
    // origin: '*',
    credentials: true, //是否允许发送Cookie
    // allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    origin: function (ctx) { //设置允许来自指定域名请求
        // if (ctx.url === '/test') {
        return '*'; // 允许来自所有域名请求
        // }
        // return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'], //设置所允许的HTTP请求方法'
    // allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
});

/**
 * 记录请求日志
 */
// const mdLogger = log();

export default [
    mdKoaBody,
    mdCors,
    // mdLogger,
    // mdFormidable,
    // mdResHandler,
    // mdErrorHandler,
    // mdRoute,
    // mdRouterAllowed
];

