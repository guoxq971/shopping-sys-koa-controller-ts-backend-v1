import { Body, Controller, Ctx, Flow, Get, Post } from "koa-ts-controllers";
import ErrorException, {
  MSG_empty,
  MSG_SUCCESS,
  MSG_SUCCESS_ADD,
  MSG_SUCCESS_DEL,
  MSG_SUCCESS_DETAIL,
  MSG_SUCCESS_LIST,
  MSG_SUCCESS_UPDATE,
} from "../middlewares/error";
import SuccessException from "../middlewares/success";
import { goodsListDto, goodsListVo } from "../interFaces/Goods";
import { GoodsService } from "../service/GoodsService";
import { addValidate } from "../validate/GoodsValidate";
import { idValidate, listValidate } from "../validate/BaseValidate";
@Controller("/goods")
export class GoodsController {
  @Post("/add")
  @Flow([addValidate])
  public async add(@Body() body) {
    const { picFirst, title, price, quantity, description, status } = body;
    await GoodsService.add(
      picFirst,
      title,
      price,
      quantity,
      description,
      status
    );
    return new SuccessException(MSG_SUCCESS_ADD);
  }

  @Post("/del")
  @Flow([idValidate])
  public async del(@Body() body: any) {
    const { id } = body;
    await GoodsService.isEmptyById(id);
    await GoodsService.del(id);
    return new SuccessException(MSG_SUCCESS_DEL);
  }

  @Post("/update")
  @Flow([idValidate, addValidate])
  public async update(@Body() body) {
    const { id, picFirst, title, price, quantity, description, status } = body;
    await GoodsService.update(
      id,
      picFirst,
      title,
      price,
      quantity,
      description,
      status
    );
    return new SuccessException(MSG_SUCCESS_UPDATE);
  }

  @Post("/list")
  @Flow([listValidate])
  public async list(@Body() listDto: goodsListDto) {
    const { total, list } = await GoodsService.list(listDto);
    return new SuccessException(MSG_SUCCESS_LIST, { total, list });
  }

  @Post("/get")
  @Flow([idValidate])
  public async get(@Body() body) {
    const { id } = body;
    let result: goodsListVo[] = await GoodsService.getById(id);
    if (result.length === 0) {
      return new ErrorException(MSG_empty);
    }
    return new SuccessException(MSG_SUCCESS_DETAIL, { detail: result });
  }

  @Post("/ban")
  @Flow([idValidate])
  public async ban(@Body() body) {
    const { id } = body;
    let detail = await GoodsService.isEmptyById(id);
    const status = detail.status === 1 ? 0 : 1;
    await GoodsService.update4status(id, status);
    return new SuccessException(MSG_SUCCESS);
  }
}
