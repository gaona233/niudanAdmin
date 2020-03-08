import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import { message } from "antd";

export interface ResponseData {
  code: number;
  error?: string;
  data?: any;
}

class HeaderBuilder {
  private header: object = {};

  constructor(initHeader?: object) {
    if (initHeader) {
      this.header = initHeader;
    }
  }

  public addHeader(name: string, value?: string | null) {
    if (!value) {
      return this;
    }

    (this.header as any)[name] = value;
    return this;
  }

  public build(): object {
    return this.header;
  }
}

export default class BaseService {
  private axiosInstance: AxiosInstance;

  private static handleResponse(response: AxiosResponse) {
    let responseData: any = response.data;
    if (responseData.code == -99) {
      throw new  Error(responseData.message)
    }

    return {
      code: 1,
      data: responseData
    };
  }


  private static wrapRequestConfigWithConvention(
    requestConfig: AxiosRequestConfig,
    url: string
  ): AxiosRequestConfig {
    const headerBuilder = new HeaderBuilder(requestConfig.headers);
    headerBuilder.addHeader("accept", "application/json");
    headerBuilder.addHeader("content-type", "application/json");
    requestConfig.headers = headerBuilder.build();
    return requestConfig;
  }

  checkLemonServiceError(responseData: ResponseData) {
    if (responseData.code !== 0) {
      throw new  Error('has no data')
    }
  }

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `/api`,
      timeout: 60000
    });
    this.axiosInstance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response && error.response.status === 401) {
          window.location.href = "/login";
          return message.error(
            "抱歉，您未登录或者登录状态已过期，即将为您跳转到登录页面"
          );
        }
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          throw new Error(error.response.data.message);
        }
        throw error;
      }
    );
  }

  /**
   *
   * @param {string} url
   * @param {object} queryString
   * @returns {Promise<ResponseData>}
   */
  protected get(url: string, queryString?: object) {
    const requestConfig: AxiosRequestConfig = BaseService.wrapRequestConfigWithConvention(
      { params: queryString },
      url
    );
    return this.axiosInstance
      .get(url, requestConfig)
      .then(BaseService.handleResponse);
  }

  protected delete(url: string, queryString?: object) {
    const requestConfig: AxiosRequestConfig = BaseService.wrapRequestConfigWithConvention(
      { params: queryString },
      url
    );
    return this.axiosInstance
      .delete(url, requestConfig)
      .then(BaseService.handleResponse);
  }

  protected post(url: string, body: any = {}) {
    const requestConfig: AxiosRequestConfig = BaseService.wrapRequestConfigWithConvention(
      {},
      url
    );
    return this.axiosInstance
      .post(url, body, requestConfig)
      .then(BaseService.handleResponse);
  }

  protected put(url: string, body: any = {}) {
    const requestConfig: AxiosRequestConfig = BaseService.wrapRequestConfigWithConvention(
      {},
      url
    );
    return this.axiosInstance
      .put(url, body, requestConfig)
      .then(BaseService.handleResponse);
  }
}
