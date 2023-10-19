import axios, { AxiosRequestConfig } from "axios";
import { checkStatus } from "./checkStatus";
import { AxiosCanceler } from "./axiosCancel";
import { getToken } from "/@/utils/local";
import { message } from "antd";

const axiosCanceler = new AxiosCanceler();

const createAxios = (
  axiosConfig: AxiosRequestConfig<any>,
  options: { ignoreCancelToken?: boolean; isLoading?: boolean } = {}
) => {
  Object.assign(
    {
      ignoreCancelToken: false,
      isLoading: false,
    },
    options
  );
  const service = axios.create({
    timeout: 20000,
    baseURL: import.meta.env.VITE_GLOB_API_URL,
  });
  // 请求拦截
  service.interceptors.request.use((config) => {
    options?.ignoreCancelToken && axiosCanceler.addPending(config);

    if (getToken() && typeof window !== "undefined") {
      if (!config.params) {
        config.params = {};
      }
      config.params.thirdSession = getToken();
      for (const key in config.params) {
        if (!config.params[key] && config.params[key] != 0) {
          delete config.params[key];
        }
      }
    }

    options?.isLoading &&
      message.loading({
        content: "Loading...",
        duration: 1,
      });

    return config;
  }, undefined);

  // 响应拦截
  service.interceptors.response.use(
    (response) => {
      response && axiosCanceler.removePending(response?.config);
      if (response?.data?.errorCode != 0) {
        message.error({
          content: response?.data?.msg || "失败",
        });
        throw new Error(response?.data?.msg);
      }

      // 根据状态码拦截用户
      // if(response?.data?.errorCode==?){
      //   clearToken()
      //   // 跳转登录页
      // }

      return response?.data;
    },
    (error) => {
      const { response } = error || {};
      const msg = response?.data?.error?.message ?? "";

      if (axios.isCancel(error)) {
        return Promise.reject(error);
      }

      checkStatus(error?.response?.status, msg);

      // 添加自动重试机制 保险起见 只针对GET请求
      //   const retryRequest = new AxiosRetry()
      //   const { isOpenRetry } = config?.requestOptions?.retryRequest
      //   config.method?.toUpperCase() === RequestEnum.GET &&
      //     isOpenRetry &&
      //     // @ts-ignore
      //     retryRequest.retry(service, error)
      return Promise.reject(error);
    }
  );

  return service(axiosConfig);
};

export default createAxios;
