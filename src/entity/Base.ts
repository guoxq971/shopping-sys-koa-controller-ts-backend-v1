import {Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn} from "typeorm";
import {Exclude} from "class-transformer";
import {tool} from "../utils/tool";
import moment = require("moment");

@Entity()
export class Base {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'update_time',
        comment: '更新时间',
        transformer: {
            to(value) {
                return tool.timeFormat(value);
            },
            from(value) {
                return tool.timeFormat(value);
            }
        },
    })
    updateTime: Date;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'create_time',
        comment: '创建时间',
        transformer: {
            to(value) {
                return tool.timeFormat(value);
            },
            from(value) {
                return tool.timeFormat(value);
            }
        },
    })
    createTime: Date;

    @DeleteDateColumn({
        name: 'deleted_time',
        type: 'datetime',
        comment: '删除时间',
        transformer: {
            to(value) {
                return tool.timeFormat(value);
            },
            from(value) {
                return tool.timeFormat(value);
            }
        },
    })
    deletedTime: string;
}