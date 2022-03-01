import {Entity, Column} from "typeorm";
import {Base} from "./Base";

@Entity('sys_goods')
export class Goods extends Base{
    @Column({
        name: `pic_first`,
        comment: '图片（首图）',
    })
    picFirst: string;

    @Column({
        comment: '标题',
    })
    title: string;

    @Column({
        comment: '价格',
    })
    price: string;

    @Column({
        comment: '数量',
    })
    quantity: number;

    @Column({
        comment: '介绍',
    })
    description: string;

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