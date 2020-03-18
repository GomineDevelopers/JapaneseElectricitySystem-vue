
import request from '@/utils/request'
import qs from 'qs'


// ************************ A.注册

// 1.图片验证码
export function captchas(data) {
  return request({
    method: 'post',
    url: '/captchas',
    data: data
  })
}
// 2.短信验证码
export function verificationCodes(data) {
  return request({
    method: 'post',
    url: '/verificationCodes',
    data: data
  })
}
// 3.注册
export function users(data) {
  return request({
    method: 'post',
    url: '/users',
    data: data
  })
}

// ************************ B.登录

// 1.密码登录
export function authorizations(data) {
  return request({
    method: 'post',
    url: '/authorizations',
    data: data
  })
}
// 2.短信登录
export function authorizations_sms(data) {
  return request({
    method: 'post',
    url: '/authorizations/sms',
    data: data
  })
}

// 3.用户登出
export function loginout(newToken) {
  return request({
    method: 'delete',
    url: '/authorizations/current',
    headers: { 'Authorization': 'Bearer' + newToken }
  })
}

// 4.忘记密码-重置密码
export function reset_password(data) {
  return request({
    method: 'post',
    url: '/user/password',
    data: data
  })
}

// ************************ C.刷新token(信息处理-前置)

export function refresh_token(newToken) {
  return request({
    method: 'put',
    url: '/authorizations/current',
    headers: { 'Authorization': 'Bearer' + newToken }
  })
}

// ************************ D.信息处理
// 1.获取用户信息
export function getUserInfo(newToken) {
  return request({
    method: 'get',
    url: '/me',
    headers: { 'Authorization': 'Bearer' + newToken }
  })
}


// ************************ E.用户资料
// 1.上传图片
export function upload_avatar(newToken, data) {
  return request({
    method: 'post',
    url: '/images',
    headers: { 'Authorization': 'Bearer' + newToken },
    data: data
  })
}

// 2.更新资料
export function update_users(newToken, postData) {
  return request({
    method: 'patch',
    url: '/me',
    headers: {
      'Authorization': 'Bearer' + newToken,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(postData)
  })
}

// ************************ F.地址

// 1.登录用户创建地址
export function add_address(newToken, data) {
  return request({
    method: 'post',
    url: '/user_addresses',
    headers: { 'Authorization': 'Bearer' + newToken },
    data: data
  })
}

// 2.获取用户地址列表
export function getAddressList(newToken) {
  return request({
    method: 'get',
    url: '/user_addresses',
    headers: { 'Authorization': 'Bearer' + newToken },
  })
}

// 3.获取单个id地址
export function getAddressById(newToken, id) {
  return request({
    method: 'get',
    url: '/user_addresses/' + id,
    headers: { 'Authorization': 'Bearer' + newToken },
    // params: {
    //   id: id
    // }

  })
}


// 4.修改单个id地址
// export function updateAddressById(newToken, id, data) {
//   return request({
//     method: 'put',
//     url: '/user_addresses/' + id,
//     headers: { 'Authorization': 'Bearer' + newToken },
//     data: data,
//     // params: {
//     //   id: id
//     // }
//   })
// }
export function updateAddressById(newToken, id, postData) {
  return request({
    method: 'put',
    url: '/user_addresses/' + id,
    headers: {
      'Authorization': 'Bearer' + newToken,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(postData)
  })
}


// 5.删除单个id地址
export function deleteAddressById(newToken, id) {
  return request({
    method: 'delete',
    url: '/user_addresses/' + id,
    headers: { 'Authorization': 'Bearer' + newToken },
    // params: {
    //   id: id
    // }
  })
}
// 6.设置单个id地址为默认地址
export function set_addressDefault(newToken, id) {
  return request({
    method: 'post',
    url: '/user_addresses/' + id + "/default",
    headers: { 'Authorization': 'Bearer' + newToken },
    // params: {
    //   id: id
    // }
  })
}
// 7.登录用户的默认地址  -- 用于结算-address_id
export function getAddressDefault(newToken) {
  return request({
    method: 'get',
    url: '/user_address/default',
    headers: { 'Authorization': 'Bearer' + newToken },
  })
}

// ************************ G.商品数据填充

// 1.获取分类
export function geCategories() {
  return request({
    method: 'get',
    url: '/categories',
  })
}
// 2.单个id分类下的商品列表
export function getGoodsById(id, page) {
  if (page != undefined && page != null && page != "") {
    return request({
      method: 'get',
      url: '/categories/ ' + id + '/goods',
      params: {
        page: page
      }
    })
  } else {
    return request({
      method: 'get',
      url: '/categories/ ' + id + '/goods',
    })
  }
}

// 3. 广告轮播图
export function ads() {
  return request({
    method: 'get',
    url: '/ads',
  })
}

// 4.单个id商品详情  (我的订单-单击指定则跳转)
export function getGoodById(id) {
  return request({
    method: 'get',
    url: '/goods/' + id,
  })
}
// ************************ H.购物车

// 1.加入购物车
export function addToCart(newToken, data) {
  return request({
    method: 'post',
    url: '/cart',
    headers: { 'Authorization': 'Bearer' + newToken },
    data: data
  })
}
// 2.购物车列表
export function getCartList(newToken) {
  return request({
    method: 'get',
    url: '/cart',
    headers: { 'Authorization': 'Bearer' + newToken },
  })
}
// 3.删除单个id购物车商品
export function deleteProductById(newToken, id) {
  return request({
    method: 'delete',
    url: '/cart/' + id,
    headers: { 'Authorization': 'Bearer' + newToken },
  })
}

// 4.更新购物车商品 =》 addToCart
// export function updateProductById(newToken, id, postData) {
//   return request({
//     method: 'patch',
//     url: '/carts/' + id,
//     headers: {
//       'Authorization': 'Bearer' + newToken,
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     data: qs.stringify(postData)
//   })
// }

// 5.购物车items参数
export function getCartIndexArr(newToken) {
  return request({
    method: 'get',
    url: '/cart/index',
    headers: { 'Authorization': 'Bearer' + newToken },
  })
}

// 6.提交订单
export function orders(newToken, data) {
  return request({
    method: 'post',
    url: '/orders',
    headers: { 'Authorization': 'Bearer' + newToken },
    data: data
  })
}
// 7.在线支付
// 支付方式（微信 = wechat，支付宝 = alipay）
export function payment_wechat(newToken, id) {
  return request({
    method: 'get',
    url: '/payment/' + id + '/wechat',
    headers: { 'Authorization': 'Bearer' + newToken },
    // data: data

  })
}
// 7-2.支付宝支付
export function payment_alipay(newToken, id) {
  return request({
    method: 'get',
    url: '/payment/' + id + '/alipay',
    headers: { 'Authorization': 'Bearer' + newToken },
  })
}



// wechat回调
// export function WechatNotify() {
//   return request({
//     method: 'post',
//     url: '/payment/wechat/notify',
//   })
// }

// 8.单个id订单状态 （长轮询） 
export function SingleOrderStatus(newToken, id) {
  return request({
    method: 'get',
    url: '/orders/' + id + '/wechat',
    headers: { 'Authorization': 'Bearer' + newToken },

  })
}

// 9.登录用户订单列表 -(用于：个人资料-用户订单)
export function getOrderList(newToken) {
  return request({
    method: 'get',
    url: '/orders',
    headers: { 'Authorization': 'Bearer' + newToken },
  })
}


// 可搜索 商品 和 描述 和 art
// ************************ I.评论

// 1.单个id商品下所有评论
export function GoodsReplies(id) {
  return request({
    method: 'get',
    url: '/goods/' + id + '/replies',
  })
}

// 2.登录用户的所有评论   
export function UserReplies(newToken) {
  return request({
    method: 'get',
    url: '/replies',
    headers: { 'Authorization': 'Bearer' + newToken },

  })
}

// 3.登录用户对单个id商品评论
export function ToReplies(newToken, data) {
  return request({
    method: 'post',
    url: '/replies',
    headers: { 'Authorization': 'Bearer' + newToken },
    data: data
  })
}

// 3-2.登录用户对单个id商品评论图片
export function ToRepliesImages(newToken, data) {
  return request({
    method: 'post',
    url: '/replies/images',
    headers: { 'Authorization': 'Bearer' + newToken },
    data: data
  })
}

// 4.单个订单信息 by Oid
export function getOrderDetailsById(newToken, id) {
  return request({
    method: 'get',
    url: '/orders/' + id,
    headers: { 'Authorization': 'Bearer' + newToken },

  })
}
// 5.单个商品信息 by Gid
export function getGoodDetailsById(id) {
  return request({
    method: 'get',
    url: '/goods/' + id,
  })
}
// 6.登录用户订单列表评论 -- 暂时404
export function AllReplies(newToken) {  
  return request({
    method: 'get',
    url: '/orders/replies',
    headers: { 'Authorization': 'Bearer' + newToken },
  })
}

// 7.订单搜索（暂时by 订单号-模糊）
export function OrdersSearch(newToken, data) {
  return request({
    method: 'post',
    url: '/orders/search',
    headers: { 'Authorization': 'Bearer' + newToken },
    data: data
  })
}

// ************************ J.搜索
// 1.搜索
export function GoodsSearch(data) {
  return request({
    method: 'post',
    url: '/goods/search',
    data: data
  })
}


// ************************ K.订单状态改变
// 待付款 =》 待收货 =》 待评价 =》 已完成
// 已取消
// 0.取消订单（待付款=》已取消）
export function patchCancel(newToken, postData, id) {
  return request({
    method: 'patch',
    url: '/orders/' + id + '/cancel',
    headers: {
      'Authorization': 'Bearer' + newToken,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(postData)
  })
}
// 1.确认收货（待收货=》待评价）
export function patchReceipt(newToken, postData, id) {
  return request({
    method: 'patch',
    url: '/orders/' + id,
    headers: {
      'Authorization': 'Bearer' + newToken,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(postData)
  })
}

// 2.评价（待评价=》已完成）
export function patchReplied(newToken, postData, id) {
  return request({
    method: 'patch',
    url: '/orders/' + id + '/reply',
    headers: {
      'Authorization': 'Bearer' + newToken,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(postData)
  })
}



