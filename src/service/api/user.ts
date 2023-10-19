import localHttp from "../http/index";
import { LoginParams, RegisterParams } from "../types/user";

enum Api {
  Login = "/user/login",
  Register = "/user/register",
}

/**
 * @description 登录
 * @param data
 */
export const loginApi = async (data: LoginParams) =>
  localHttp({
    method: "POST",
    url: Api.Login,
    data,
  });

/**
 * @description 注册
 * @param data
 */
export const registerApi = async (data: RegisterParams) =>
  localHttp({
    method: "POST",
    url: Api.Register,
    data,
  });
