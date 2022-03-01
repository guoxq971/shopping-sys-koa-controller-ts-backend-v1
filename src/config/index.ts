const port = 8888;
const host = 'http://localhost';
const staticPath = '/public'
export default {
    //  文件上传
    tempFilePath: `src/public/images`,
    // 图片目录
    urlPath: `/images`,
    // 客户端的图片路径
    clientBaseImagePath: `${host}:${port}`,
    // 静态资源目录
    staticPath: staticPath,
    port: port,
    host: host,
}