"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 请求配置文件
 */
// import { request } from "@/utils";
const axios_1 = __importDefault(require("axios"));
async function requestAdapter({ url, method, data, params, headers }, options) {
    // axios
    const axiosResponse = await (0, axios_1.default)({
        url,
        method,
        data,
        params,
        ...options,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            ...headers,
            ...options?.headers,
        },
    });
    const apiResponse = axiosResponse.data;
    return apiResponse;
    // return request({
    //   url,
    //   method,
    //   data,
    //   params,
    //   ...options,
    //   headers: {
    //     ...headers,
    //     ...options?.headers,
    //   },
    // });
}
exports.default = requestAdapter;
