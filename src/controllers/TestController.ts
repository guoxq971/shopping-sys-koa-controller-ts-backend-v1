import {Body, Controller, Ctx, Get, Post} from 'koa-ts-controllers';
import {getConnection, getRepository, Repository} from "typeorm";
import {Photo} from "../entity/Photo";
import ErrorException from "../middlewares/error";
import SuccessException from "../middlewares/success";
import {list} from "../interFaces/Photo";

@Controller('/test')
export class TestController {
    @Post('/add')
    public async add(@Ctx() ctx) {
        const photo = getRepository(Photo).create({
            picFirst: '首图1',
            title: '标题1',
            quantity: '1',
            desc: '介绍1',
            price: '价格1',
        })
        await getRepository(Photo).save(photo)

        // let photo = new Photo()
        // photo.picFirst = '首图1'
        // photo.title = '标题1'
        // photo.quantity = '1'
        // photo.desc = '介绍1'
        // photo.price = '价格1'
        // await getRepository(Photo).save(photo)

        return new SuccessException('添加成功！')
    }

    @Post('/del')
    public async del(@Ctx() ctx, @Body() body: any) {
        let ids: string[] = body.id.split(',');
        let photo: Photo[] = await getRepository(Photo).findByIds(ids)
        if (!photo.length) {
            return new ErrorException('未查询到目标')
        }

        // remove 会检查是否存在实体
        // const result: Photo[] = await getRepository(Photo).remove(photo)
        // if (result.filter(e => e.id).length) {
        //     return new ErrorException(`删除失败`)
        // }
        // const result: Photo[] = await getRepository(Photo).softRemove(photo)
        // if (result.filter(e => !e.deletedTime).length) {
        //     return new ErrorException(`删除失败`)
        // }

        // delete 会直接删除
        // const result = await getRepository(Photo).delete(ids)
        // if(!result.affected){
        //     return new ErrorException('删除失败')
        // }
        const result = await getRepository(Photo).softDelete(ids)
        if (!result.affected) {
            return new ErrorException('删除失败')
        }

        return new SuccessException('删除成功！', {result})
    }

    @Post('/update')
    public async update(@Body() body) {
        const {
            id,
            picFirst,
            title,
            quantity,
            desc,
            price,
        } = body

        // const photo: Photo = getRepository(Photo).create({
        //     id: id,
        //     picFirst: picFirst,
        //     title: title,
        //     quantity: quantity,
        //     desc: desc,
        //     price: price,
        // })
        // await getRepository(Photo).save(photo)

        let result: Photo = <Photo>await getRepository(Photo).findOne(id)
        await getRepository(Photo).update(id, {
            picFirst,
            title,
            quantity,
            desc,
            price
        })

        return new SuccessException('更新成功', {result})
    }

    @Post('/list')
    public async list(@Body() listDto: list) {

        let result = await getRepository(Photo)
            .createQueryBuilder("photo")
            .where("photo.title LIKE :title", {title: `%${listDto.title}%`})
            .orderBy("photo.createTime", "DESC")
            .skip((listDto.pageNum - 1) * listDto.pageSize)
            .take(listDto.pageSize)
            .getMany();

        return new SuccessException('', {result})
    }

    @Post('/get')
    public async get(@Body() body) {
        let result: Photo = <Photo>await getRepository(Photo).findOne(body.id)
        if (!result) {
            return new ErrorException('未找到指定目标')
        }
        return new SuccessException('', result)
    }

}

