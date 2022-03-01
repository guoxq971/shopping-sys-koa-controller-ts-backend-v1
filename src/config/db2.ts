import {
    Connection, getConnectionManager, getConnectionOptions,
    createConnection, getConnection, QueryRunner
} from 'typeorm';
import ErrorException from "../middlewares/error";
import moment = require("moment");
import {tool} from "../utils/tool";

export default async function init(): Promise<Connection> {
    let connection: Connection;
    let queryRunner: QueryRunner;

    if (!getConnectionManager().has('default')) {
        const connectionOptions = await getConnectionOptions();
        connection = await createConnection(connectionOptions);
        console.log(`mysql 初始化链接--${tool.curTime}`)
    } else {
        connection = getConnection();
        console.log(`mysql 链接成功--${tool.curTime}`)
    }

    queryRunner = connection.createQueryRunner();
    return connection
}

/*
* 执行原生sql
* */
export const dbQuery = sql => {
    try {
        return getConnection().query(sql)
    } catch (e) {
        return new ErrorException('sql执行出现错误', {}, 1)
    }
}