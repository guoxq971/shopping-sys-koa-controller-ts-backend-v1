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
import { shopListDto, shopListVo } from "../interFaces/Shop";
import { ShopService } from "../service/ShopService";
import { addValidate } from "../validate/ShopValidate";
import { idValidate, listValidate } from "../validate/BaseValidate";
@Controller("/shop")
export class GoodsController {
  @Post("/add")
  @Flow([addValidate])
  public async add(@Body() body) {
    const { picFirst, name, capital, description, status } = body;
    await ShopService.add(picFirst, name, capital, description, status);
    return new SuccessException(MSG_SUCCESS_ADD);
  }

  @Post("/del")
  @Flow([idValidate])
  public async del(@Body() body: any) {
    const { id } = body;
    await ShopService.isEmptyById(id);
    await ShopService.del(id);
    return new SuccessException(MSG_SUCCESS_DEL);
  }

  @Post("/update")
  @Flow([idValidate, addValidate])
  public async update(@Body() body) {
    const { id, picFirst, name, capital, description, status } = body;
    await ShopService.isEmptyById(id);
    await ShopService.update(id, picFirst, name, capital, description, status);
    return new SuccessException(MSG_SUCCESS_UPDATE);
  }

  @Post("/list")
  @Flow([listValidate])
  public async list(@Body() listDto: shopListDto) {
    const { total, list } = await ShopService.list(listDto);
    return new SuccessException(MSG_SUCCESS_LIST, { total, list });
  }

  @Post("/get")
  @Flow([idValidate])
  public async get(@Body() body) {
    const { id } = body;
    let result: shopListVo[] = await ShopService.getById(id);
    if (result.length === 0) {
      return new ErrorException(MSG_empty);
    }
    return new SuccessException(MSG_SUCCESS_DETAIL, { detail: result });
  }

  @Post("/ban")
  @Flow([idValidate])
  public async ban(@Body() body) {
    const { id } = body;
    let detail = await ShopService.isEmptyById(id);
    const status = detail.status === 1 ? 0 : 1;
    await ShopService.update4status(id, status);
    return new SuccessException(MSG_SUCCESS);
  }
}
