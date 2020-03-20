import axios from 'axios'
import utils from "./formutils"
import { Message } from "element-ui";
import router from ".././router";
import { Utils } from '@/utils/Utils'

global.baseURL = "http://shop.zidata.cn/api/v2.0.0";
// 创建axios实例
const service = axios.create({
    // baseURL: 'http://localhost:8080//api', // 线上测试 - 当前▲▲
    // baseURL: "http://shop.zidata.cn/api/v2.0.0",
    baseURL: global.baseURL,
    timeout: 15000 // 请求超时时间
})



const customTransformData = (data, headers) => {
    if (utils.isFormData(data) ||
        utils.isArrayBuffer(data) ||
        utils.isBuffer(data) ||
        utils.isStream(data) ||
        utils.isFile(data) ||
        utils.isBlob(data) ||
        utils.isArrayBufferView(data) ||
        utils.isURLSearchParams(data)
    ) {
        return data
    }
    if (utils.isObject(data)) {
        for (var pkey in data) {
            if (data[pkey] === null || typeof (data[pkey]) === 'undefined') {
                delete data[pkey]
            }
        }
        data = utils.params(data)
        return data
    }
    return data
}

// 加入到数据最前面
service.defaults.transformRequest.unshift(customTransformData)
// 请求拦截
service.interceptors.request.use(
    // // 时间戳处理
    config => {
        config.params = {
            _t: Date.parse(new Date()) / 1000,
            ...config.params
        }
        return config;
    }, error => {
        //发送请求错误操作
        return Promise.reject(error);
    }
)

service.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        console.log("~~~~~~~!");
        console.log(response);
        console.log("~~~~~~~!");

        // return Promise.resolve(response);
        let SuccessStatus = [
            200, 201, 202, 204
        ]
        if (SuccessStatus.indexOf(response.status) > -1) {
            return Promise.resolve(response);
        }
        else {
            return Promise.reject(response);
        }
    },
    // 根据返回的状态码进行相关操作，例如登录过期提示，错误提示等等
    error => {
        if (error.response.status) {
            console.log("!!!!!!!!");
            console.log(error.response);
            switch (error.response.status) {
                case 400:
                    // 频繁点击请求会出现400情况！400后刷新页面，页面无法正常运作！
                    // 出现400提示问题直接跳转首页
                    Message("400!");
                    break;
                case 404:
                    if (error.response.config.url == global.baseURL + '/goods/null/replies') {
                        Message("无指定商品信息，请重新选择！");
                        setTimeout(function () {
                            // router.push({ path: '/' });
                        }, 1000);
                    }
                    break;

                case 422:
                    // setTimeout(() => {
                    //     Utils.delCookie("user_token");
                    //     router.push({ path: "/login" });
                    // }, 2000);
                    if (error.response.config.url == global.baseURL + '/authorizations/sms') {
                        Message("手机号不正确！");
                    }
                    else if (error.response.config.url == global.baseURL + '/verificationCodes') {
                        Message("请输入正确的图片验证码！");
                    }
                    else if (error.response.config.url == global.baseURL + '/user/password') {

                        try {
                            Message(error.response.data.errors.password[0]);
                        } catch (error) {
                            // Message("请求失败，请稍后重试！");
                            Message("密码格式或验证码错误！");
                            console.log(error)
                        }
                    }
                    else if (error.response.config.url == global.baseURL + '/users') {
                        try {
                            Message(error.response.data.errors.password[0]);
                        } catch (error) {
                            Message("密码格式或验证码错误！");
                            console.log(error)
                        }
                    }
                    else if (error.response.config.url == global.baseURL + '/cart') {
                        Message("该商品已售完，将返回首页");
                        setTimeout(function () {
                            router.push({ path: "/" });
                        }, 1500);

                    }
                    // else if (error.response.config.url == global.baseURL + '/replies') {
                    //     Message("身份失效，请重新登录！");
                    //     setTimeout(() => {
                    //         Utils.delCookie("user_token");
                    //         router.push({ path: "/login" });
                    //     }, 2000);
                    // }
                    else {
                        try {
                            Message(error.response.data.errors.verification_key[0]);
                        } catch (error) {
                            Message("请求失败，请稍后重试！");
                            console.log(error)
                        }
                    }
                    break;
                case 403:
                    // Message("验证码已失效！");  // ▲做了请求失败马上刷新图片验证码 --该提示用不到
                    if (error.response.config.url.indexOf('payment') > -1) {
                        // && error.response.config.url.indexOf('wechat') > -1
                        Message("订单状态不正确,即将返回我的订单！");
                        setTimeout(function () {
                            router.push({
                                path: '/personalcenter',
                                query: {
                                    activeName: '2'
                                }
                            });
                        }, 1500);
                    }
                    else if (error.response.config.url == global.baseURL + '/authorizations/sms') {
                        Message("验证码失效！");
                    }
                    else {
                        Message("请求失败，请稍后重试！");
                    }
                    break;
                case 401:
                    if (error.response.config.url == global.baseURL + '/verificationCodes') {
                        Message("图片验证码错误,请重新输入！");
                    } else if (error.response.config.url == global.baseURL + '/users') {
                        Message("用户名、密码或验证码错误！");
                    }
                    else if (error.response.config.url == global.baseURL + '/authorizations') {
                        if (error.response.data.message == "用户名或密码错误") {
                            Message("用户不存在或密码错误");
                        } else {
                            Message("验证码错误！");
                        }
                    }
                    else if (error.response.config.url == global.baseURL + '/user/password') {
                        try {
                            Message(error.response.data.message);
                        } catch (error) {
                            Message("请求失败，请稍后重试！");
                            console.log(error)
                        }
                    }
                    else if (error.response.config.url == global.baseURL + '/me') {
                        if (error.response.data.message == "Unauthenticated.") {
                            Message("获取个人信息失败，请重新登录！");
                            setTimeout(() => {
                                Utils.delCookie("user_token");
                                router.push({ path: "/login" });
                            }, 1000);
                        } else {
                            Message("获取个人信息失败，请重新登录！！");
                        }
                    }
                    else {
                        Message("请求失败，请稍后再次尝试！");
                    }
                    break;
                case 500:
                    if (error.response.config.url == global.baseURL + '/users') {
                        Message("该手机号或用户名已被注册！");
                    }
                    if (error.response.config.url == global.baseURL + '/verificationCodes') {
                        if (error.response.data.message.indexOf('invalid mobile number') > -1) {
                            Message("手机号不正确！");
                        }
                    }
                    if (error.response.config.url == global.baseURL + '/authorizations/current') {
                        Message("身份失效，请重新登录！");
                        setTimeout(() => {
                            Utils.delCookie("user_token");
                            router.push({ path: "/login" });
                        }, 2000);
                    }


                    break;

                default:
                    Message(error.response.data.message);
            }
            return Promise.reject(error.response);
        }
    }
);

export default service

// 全局状态码
// 200 OK
// 对成功的 GET、PUT、PATCH 或 DELETE 操作进行响应。也可以被用在不创建新资源的 POST 操作上
// 201 Created
// 对创建新资源的 POST 操作进行响应。应该带着指向新资源地址的 Location 头
// 202 Accepted
// 服务器接受了请求，但是还未处理，响应中应该包含相应的指示信息，告诉客户端该去哪里查询关于本次请求的信息
// 204 No Content
// 对不会返回响应体的成功请求进行响应（比如 DELETE 请求）
// 304 Not Modified
// HTTP缓存header生效的时候用
// 400 Bad Request
// 请求异常，比如请求中的body无法解析
// 401 Unauthorized
// 没有进行认证或者认证非法
// 403 Forbidden
// 服务器已经理解请求，但是拒绝执行它
// 404 Not Found
// 请求一个不存在的资源
// 405 Method Not Allowed
// 所请求的 HTTP 方法不允许当前认证用户访问
// 410 Gone
// 表示当前请求的资源不再可用。当调用老版本 API 的时候很有用
// 415 Unsupported Media Type
// 如果请求中的内容类型是错误的
// 422 Unprocessable Entity
// 用来表示校验错误
// 429 Too Many Requests
// 由于请求频次达到上限而被拒绝访问


