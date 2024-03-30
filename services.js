import request from './request'

// 公共分类 批量查询订单是否规范
export function orderCenterBatchCheckOrderIsStandard(data, options) {
  return request({ url: `/order-center/batchCheckOrderIsStandard`, method: 'post', data }, options)
}

// 公共分类 拆分订单
export function orderCenterWuKongToSplit(params, options) {
  return request({ url: `/order-center/wuKong/toSplit`, method: 'get', params }, options)
}

// 公共分类 指派订单精准搜索司机
export function customerDriverPreciseSearch(params, options) {
  return request({ url: `/customer/driver/preciseSearch`, method: 'get', params }, options)
}

// 公共分类 指派订单精准搜索车牌
export function customerVehiclePreciseSearch(params, options) {
  return request({ url: `/customer/vehicle/preciseSearch`, method: 'get', params }, options)
}

// 公共分类 指派订单精准搜索车队
export function customerMotorcadePreciseSearch(params, options) {
  return request({ url: `/customer/motorcade/preciseSearch`, method: 'get', params }, options)
}

// 公共分类 更改订单流节点时间
export function orderCenterOrderChangeNodeTime(data, options) {
  return request({ url: `/order-center/order/changeNodeTime`, method: 'post', data }, options)
}

// 公共分类 订单列表页复用2.0接口
export function ?(params, options) {
  return request({ url: `/?`, method: 'get', params }, options)
}

// 发单方 分页查询
export function orderCenterSenderOrderPageList(data, options) {
  return request({ url: `/order-center/sender/order/pageList`, method: 'post', data }, options)
}

// 发单方 发送平台
export function orderCenterSenderOrderToPlatform(data, options) {
  return request({ url: `/order-center/sender/order/toPlatform`, method: 'post', data }, options)
}

// 发单方 取消外发
export function orderCenterSenderCancelPlatform(params, options) {
  return request({ url: `/order-center/sender/cancelPlatform`, method: 'get', params }, options)
}

// 发单方 取消配柜
export function orderCenterSenderCancelMatch(params, options) {
  return request({ url: `/order-center/sender/cancelMatch`, method: 'get', params }, options)
}

// 发单方 回单确认-批量
export function orderCenterSenderBatchConfirmReturnReceipt(data, options) {
  return request({ url: `/order-center/sender/batchConfirmReturnReceipt`, method: 'post', data }, options)
}

// 发单方 待开票列表数据
export function orderCenterSenderPageWaitingInvoice(data, options) {
  return request({ url: `/order-center/sender/page/waitingInvoice`, method: 'post', data }, options)
}

// 发单方 批量下单
export function orderCenterOrderBatchCreate(data, options) {
  return request({ url: `/order-center/order/batchCreate`, method: 'post', data }, options)
}

// 发单方 订单详情-出口
export function senderOrderDetailExportInfo(params, options) {
  return request({ url: `/order-center/sender/order/detail/export/info`, method: 'get', params }, options)
}

// 发单方 订单详情-国内
export function orderCenterSenderOrderDetail1661342573508(params, options) {
  return request({ url: `/order-center/sender/order/detail_1661342573508`, method: 'get', params }, options)
}

// 发单方 订单详情-进口
export function orderCenterSenderOrderDetail(params, options) {
  return request({ url: `/order-center/sender/order/detail`, method: 'get', params }, options)
}

// 发单方 调价
export function orderCenterSenderChangePrice(params, options) {
  return request({ url: `/order-center/sender/changePrice`, method: 'get', params }, options)
}

// 发单方 运费支付列表数据
export function orderCenterSenderPageNeedPay(data, options) {
  return request({ url: `/order-center/sender/page/needPay`, method: 'post', data }, options)
}

// 发单方 额外费用审核列表数据
export function orderCenterSenderPageOtherFee(data, options) {
  return request({ url: `/order-center/sender/page/otherFee`, method: 'post', data }, options)
}

// 订单更新 出口单更新
export function orderCenterOrderExportUpdate(data, options) {
  return request({ url: `/order-center/order/export/update`, method: 'post', data }, options)
}

// 订单更新 国内单更新
export function orderCenterOrderDomesticUpdate(data, options) {
  return request({ url: `/order-center/order/domestic/update`, method: 'post', data }, options)
}

// 订单更新 进口单更新
export function orderCenterOrderImportUpdate(data, options) {
  return request({ url: `/order-center/order/import/update`, method: 'post', data }, options)
}
