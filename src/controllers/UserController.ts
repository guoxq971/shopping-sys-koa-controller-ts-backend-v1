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
import { userListDto, userListVo } from "../interFaces/User";
import { UserService } from "../service/UserService";
import { addValidate, loginValidate, updateValidate } from "../validate/UserValidate";
import { idValidate, listValidate } from "../validate/BaseValidate";
@Controller("/user")
export class UserController {
  @Post("/login")
  @Flow([loginValidate])
  public async login(@Body() body) {
    const { name, password } = body;
    const user = await UserService.login(name, password);
    if(user.length === 0){
      return new ErrorException('账号或密码错误！')
    }
    return new SuccessException(MSG_SUCCESS);
  }

  @Post("/add")
  @Flow([addValidate])
  public async add(@Body() body) {
    const { name, password, capital, remark, status } = body;
    await UserService.add(name, password, capital, remark, status);
    return new SuccessException(MSG_SUCCESS_ADD);
  }

  @Post("/del")
  @Flow([idValidate])
  public async del(@Body() body: any) {
    const { id } = body;
    await UserService.isEmptyById(id);
    await UserService.del(id);
    return new SuccessException(MSG_SUCCESS_DEL);
  }

  @Post("/update")
  @Flow([idValidate, updateValidate])
  public async update(@Body() body) {
    const { id, name, password, capital, remark, status } = body;
    await UserService.update(id, name, password, capital, remark, status);
    return new SuccessException(MSG_SUCCESS_UPDATE);
  }

  @Post("/list")
  @Flow([listValidate])
  public async list(@Body() listDto: userListDto) {
    const { total, list } = await UserService.list(listDto);
    return new SuccessException(MSG_SUCCESS_LIST, { total, list });
  }

  @Post("/get")
  @Flow([idValidate])
  public async get(@Body() body) {
    const { id } = body;
    let result: userListVo[] = await UserService.getById(id);
    if (result.length === 0) {
      return new ErrorException(MSG_empty);
    }
    result[0].password = ''
    return new SuccessException(MSG_SUCCESS_DETAIL, { detail: result });
  }

  @Post("/ban")
  @Flow([idValidate])
  public async ban(@Body() body) {
    const { id } = body;
    let detail = await UserService.isEmptyById(id);
    const status = detail.status === 1 ? 0 : 1;
    await UserService.update4status(id, status);
    return new SuccessException(MSG_SUCCESS);
  }
}
