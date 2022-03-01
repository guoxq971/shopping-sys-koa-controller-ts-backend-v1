import {Entity, Column} from "typeorm";
import {Base} from "./Base";

@Entity('sys_user')
export class User extends Base{
    @Column({
        name: `name`,
        comment: '用户名',
    })
    name: string;

    @Column({
        name: `password`,
        comment: '密码',
    })
    password: string;

    @Column({
        name: `capital`,
        comment: '资金',
    })
    capital: number;

    @Column({
        comment: '备注',
        nullable: true,
    })
    remark: string;

    @Column({
        comment: '状态, 0-禁用 1-启用',
        default: '1',
    })
    status: number;

    @Column({
        name: 'is_del',
        comment: '删除, 0-未删除 1-已删除',
        default: '0',
    })
    isDel: string;
}