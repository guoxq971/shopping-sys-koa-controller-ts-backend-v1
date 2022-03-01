const pwd = process.cwd();

export default {
    base: {
        port: 8888,
        host: 'localhost',
    },
    //  文件上传
    tempFilePath: `src/public/images`,
    logConfig: {
        flag: true,
        outDir: `${pwd}/app/public/log`,
        level: 'info'
    }
};