import request, { RequestOptions } from './request'

export type OrderCenterBatchCheckOrderIsStandardRequest = Array<string>

export interface OrderCenterBatchCheckOrderIsStandardResponse {
	code: string;
	msg: string;
	/** map结构，key是订单号，value是true和false */
	data: {};
}

/**
 * `公共分类` 批量查询订单是否规范
 * - `POST` `/order-center/batchCheckOrderIsStandard`
 */
export function orderCenterBatchCheckOrderIsStandard(
  data?: OrderCenterBatchCheckOrderIsStandardRequest,
  options?: RequestOptions
): Promise<OrderCenterBatchCheckOrderIsStandardResponse>

export interface OrderCenterWuKongToSplitRequest {
	/** 拼单订单号 */
	orderNo: string
	/** 进口单派单价 */
	importOrderDispatchPrice: string
	/** 出口单去向，1内部单，2平台单 */
	exportOrderDestination: string
}

export interface OrderCenterWuKongToSplitResponse {
	code: string;
	msg?: string;
	data?: null;
}

/**
 * `公共分类` 拆分订单
 * - `GET` `/order-center/wuKong/toSplit`
 */
export function orderCenterWuKongToSplit(
  params?: OrderCenterWuKongToSplitRequest,
  options?: RequestOptions
): Promise<OrderCenterWuKongToSplitResponse>

export interface CustomerDriverPreciseSearchRequest {
	/** 车队名称 */
	name: string
}

export interface CustomerDriverPreciseSearchResponse {
	code?: string;
	msg?: string;
	data?: {
		/** 车队标识 */
		dispatchMotorcadeId?: null;
		/** 车队名称 */
		motorcadeName?: string;
		/** 车辆标识 */
		vehicleId?: number;
		/** 司机标识 */
		driverId?: number;
		/** 车牌号 */
		tractorNo?: string;
		/** 用户标识 */
		userId?: number;
		/** 司机姓名 */
		driverName?: string;
		/** 司机电话 */
		driverTel?: string;
	};
}

/**
 * `公共分类` 指派订单精准搜索司机
 * - `GET` `/customer/driver/preciseSearch`
 * @description 精准检索司机用于用户指派订单时候用，使用场景有，用户新建订单指派、在订单列表页平台单搜索司机时候用，列表页发送平台弹出框里面用。
 */
export function customerDriverPreciseSearch(
  params?: CustomerDriverPreciseSearchRequest,
  options?: RequestOptions
): Promise<CustomerDriverPreciseSearchResponse>

export interface CustomerVehiclePreciseSearchRequest {
	/** 车牌号 */
	name: string
}

export interface CustomerVehiclePreciseSearchResponse {
	code?: string;
	msg?: string;
	data?: Array<{
		/** 车队标识 */
		dispatchMotorcadeId?: null;
		/** 车队名称 */
		motorcadeName?: string;
		/** 车辆标识 */
		vehicleId?: number;
		/** 司机标识 */
		driverId?: number;
		/** 车牌号 */
		tractorNo?: string;
		/** 用户标识 */
		userId?: number;
		/** 司机姓名 */
		driverName?: string;
		/** 司机电话 */
		driverTel?: string;
	}>;
}

/**
 * `公共分类` 指派订单精准搜索车牌
 * - `GET` `/customer/vehicle/preciseSearch`
 * @description 精准检索车牌用于用户指派订单时候用，使用场景有，用户新建订单指派、在订单列表页平台单搜索车牌时候用，列表页发送平台弹出框里面用。
 */
export function customerVehiclePreciseSearch(
  params?: CustomerVehiclePreciseSearchRequest,
  options?: RequestOptions
): Promise<CustomerVehiclePreciseSearchResponse>

export interface CustomerMotorcadePreciseSearchRequest {
	/** 车队名称 */
	name: string
}

export interface CustomerMotorcadePreciseSearchResponse {
	code?: string;
	msg?: string;
	data?: {
		/** 车队标识 */
		dispatchMotorcadeId?: number;
		/** 车队名称 */
		motorcadeName?: string;
		/** 车辆标识 */
		vehicleId?: null;
		/** 司机标识 */
		driverId?: null;
		/** 车牌号 */
		tractorNo?: string;
		/** 用户标识 */
		userId?: number;
		/** 司机姓名 */
		driverName?: string;
		/** 司机电话 */
		driverTel?: string;
	};
}

/**
 * `公共分类` 指派订单精准搜索车队
 * - `GET` `/customer/motorcade/preciseSearch`
 * @description 精准检索车队用于用户指派订单时候用，使用场景有，用户新建订单指派、在订单列表页平台单搜索车队时候用，列表页发送平台弹出框里面用。
 */
export function customerMotorcadePreciseSearch(
  params?: CustomerMotorcadePreciseSearchRequest,
  options?: RequestOptions
): Promise<CustomerMotorcadePreciseSearchResponse>

export interface OrderCenterOrderChangeNodeTimeRequest {
	/** 订单号 */
	orderNo: string;
	/** 修改后的时间 */
	date: string;
	/** 节点标识 */
	nodeId: string;
}

export interface OrderCenterOrderChangeNodeTimeResponse {
	code: string;
	msg?: string;
	data?: {};
}

/**
 * `公共分类` 更改订单流节点时间
 * - `POST` `/order-center/order/changeNodeTime`
 */
export function orderCenterOrderChangeNodeTime(
  data?: OrderCenterOrderChangeNodeTimeRequest,
  options?: RequestOptions
): Promise<OrderCenterOrderChangeNodeTimeResponse>

export interface ?Request {}

export interface ?Response {}

/**
 * `公共分类` 订单列表页复用2.0接口
 * - `GET` `/?`
 * @description 订单列表页复用2.0或者维持不变的接口：
1、内部派单，接口参数不变，批量派单的时候只能针对内部单；

2、批量备注，保存，批量作废，复制订单逻辑不变；

3、报箱封号改为批量操作，多工厂的时候，按照工厂拆分信息；

4、生成托运单，港口订单多工厂以前是按工厂拆分成多个托运单，现在要集成到一张托运单上。
 */
export function ?(
  params?: ?Request,
  options?: RequestOptions
): Promise<?Response>

export interface OrderCenterSenderOrderPageListRequest {
	current: number;
	size: number;
	data: {
		/** 订单类型 */
		orderType?: number;
		/** 到厂开始时间 */
		startArrivingTime: string;
		/** 到厂结束时间 */
		endArrivingTime?: string;
		/** 提单号/订舱号/承运编号 */
		businessNo?: string;
		/** 客户 */
		customerId?: number;
		/** 客户编号 */
		customerNo?: string;
		/** 柜号 */
		containerNo?: string;
		/** 录单员 */
		orderMaker?: number;
		/** 跟单员 */
		follower?: string;
		/** 车牌标识 */
		vehicleIds?: Array<number>;
		/** 司机标识 */
		driverIds?: Array<number>;
		/** 车队标识 */
		dispatchMotorcadeIds?: Array<number>;
		/** 报关行 */
		customsBrokerId?: number;
		/** 工厂 */
		factoryId?: number;
		/** 装卸货地址 */
		loadOrUnloadFactoryId?: number;
		/** 订单归属 */
		orderClassification?: number;
		/** 提柜堆场 */
		pickupTerminalId?: number;
		/** 还柜堆场 */
		returnTerminalId?: number;
		/** 船公司 */
		shippingCompanyId?: number;
		/** 柜型 */
		containerTypeId?: number;
		/** 运输状态
		 * 11已提柜，13已到厂，15进口已到厂，16已卸货，20出口已到厂，21已装货，22已还柜 */
		transportStatus?: number;
		/** 订单状态
		 * 1已下单，3审核中，4不通过，5待接单，6、已派单，7已接单，9运输中，10已完成； */
		orderStatus?: number;
	};
}

export interface OrderCenterSenderOrderPageListResponse {
	code?: string;
	msg?: string;
	data?: {
		orderNo: string;
		/** 订单类型 */
		orderType: number;
		/** 订单类型名称 */
		orderTypeName: string;
		/** 订单状态 */
		orderStatus: number;
		/** 订单状态名称 */
		orderStatusName: string;
		/** 到厂时间 */
		arrivingTime: string;
		/** 提单号/订舱号/承运编号 */
		businessNo?: string;
		/** 柜号 */
		containerNo?: string;
		/** 封条 */
		sealNo?: string;
		/** 货重 */
		nettWeight?: number;
		containerWeight?: number;
		/** 柜型 */
		containerTypeName?: string;
		/** 客户 */
		customerName: string;
		/** 工厂 */
		factoryName: string;
		/** 客户编号 */
		customerNo?: string;
		/** 车队标识 */
		dispatchMotorcadeId?: number;
		/** 车队 */
		dispatchMotorcadeName?: string;
		/** 车辆标识 */
		vehicleId?: number;
		/** 车牌 */
		tractorNo?: string;
		/** 司机标识 */
		driverId?: number;
		/** 司机名称 */
		driverName?: string;
		/** 司机电话 */
		driverTel?: string;
		/** 报关行 */
		customsBrokerName?: string;
		/** 船公司 */
		shippingCompanyName?: string;
		/** 跟单备注 */
		followRemark?: string;
		/** 提柜堆场标识 */
		pickupTerminalId?: number;
		/** 提柜堆场 */
		pickupTerminalName?: string;
		/** 装货点 */
		loadAddress?: string;
		/** 卸货点 */
		unloadAddress?: string;
		/** 还柜堆场标识 */
		returnTerminalId?: number;
		/** 还柜堆场 */
		returnTerminalName?: string;
		/** 录单员 */
		orderMakerName: string;
		/** 截提柜 */
		detentionDaysUpto?: string;
		/** 截还柜 */
		storageUpto?: string;
		/** 截关日期 */
		cyClosingDate?: string;
		/** 补料日期 */
		siCutoffDate?: string;
		/** 截重日期 */
		cyCutoffDate?: string;
		/** 时效 */
		effectiveTime?: string;
		/** 体积 */
		volume?: number;
		/** 车型 */
		vehicleTypeName?: string;
		/** 车长 */
		vehicleLength?: number;
		/** 提柜时间 */
		pickupTerminalTime?: string;
		/** 还柜时间 */
		returnTerminalTime?: string;
		/** 开票类型，1专票，2普票，3不开票
		 * 前端根据返回的数字值来显示文字，可能为null */
		invoiceType?: number;
		/** 外发价 */
		quotedPrice?: number;
		/** 回单确认
		 * 0未确认，1已确认 */
		returnReceiptConfirm?: number;
		/** 是否可以取消派单，内部单叫取消派单，平台单叫取消外发 */
		dispatchIsCancelable?: number;
		/** 行驶路线集合 */
		vehicleRoutes?: Array<string>;
	};
	pageInfo: {
		current?: number;
		size?: number;
		pages?: number;
		total?: number;
	};
}

/**
 * `发单方` 分页查询
 * - `POST` `/order-center/sender/order/pageList`
 * @description 业务逻辑：

1、invoiceType开票类型，1专票，2普票，3不开票，前端根据返回的数字值来显示文字，可能为null；

2、returnReceiptConfirm，回单确认，前端根据返回的数字值来显示文字，0未确认，1已确认，已确认的订单不能在确认；

3、新加3个字段invoiceType，quotedPrice，returnReceiptConfirm；

4、平台单订单状态为1的时候，才可以编辑车队、车牌、司机，电话不让编辑，其他的编辑项和内部单一样，returnReceiptConfirm回单确认之后任何单都不可以编辑，车队和司机、车牌时候互斥的，平台单和内部单可以编辑派单信息的条件是
    订单状态为1的时候；

5、内部单的车队、司机、车牌、电话接口还是不变；

6、平台单可以编辑车队、车牌、司机的信息检索接口和新建外派订单的指派一样；

7、内部单都不显示价格和开票类型；

8、司机下拉[司机下拉](https://api.zaitugongda.com/project/529/interface/api/7126)、车牌下拉[车牌下拉](https://api.zaitugongda.com/project/529/interface/api/7127)、车队下拉[车队下拉](https://api.zaitugongda.com/project/529/interface/api/7128)，以前选择订单属性为平台单的时候，这三个搜索条件的数据会从另外的接口获取，现在不用。
 */
export function orderCenterSenderOrderPageList(
  data?: OrderCenterSenderOrderPageListRequest,
  options?: RequestOptions
): Promise<OrderCenterSenderOrderPageListResponse>

export type OrderCenterSenderOrderToPlatformRequest = Array<{
	isDesignative: number;
	/** 外发信息
	 * 快捷外发新建订单时候用 */
	orderToPlatformDTO: {
		/** 下单价 */
		quotedPrice: number;
		/** 开票类型，1专票，2普票，3不开票 */
		invoiceType: number;
		/** 税费 */
		taxation: number;
		/** 含税价 */
		priceWithTax: number;
		/** 发单联系人 */
		contactor: string;
		/** 发单联系电话 */
		contactorNo?: string;
		/** 发单备注 */
		platformRemark?: string;
		/** 是否拼单：0否，1是 */
		isShare: number;
		/** 截止匹配时间 */
		matchDeadlineTime?: string;
		/** 指派信息 */
		dispatch?: {
			/** 车队标识 */
			dispatchMotorcadeId?: number;
			/** 车牌标识 */
			vehicleId?: number;
			/** 车辆标识 */
			driverId?: number;
			/** 指派的接单人标识 */
			userId: number;
		};
	};
	/** 订单类型 */
	orderType: number;
	/** 订单号 */
	orderNo: string;
	/** 到厂时间 */
	arrivingFactoryTime: string;
	/** 业务单号 */
	businessNo?: string;
	/** 货重 */
	nettWeight: number;
	/** 柜号 */
	containerNo?: string;
}>

export interface OrderCenterSenderOrderToPlatformResponse {
	$schema?: string;
	type?: string;
	properties?: {
		code?: {
			type?: string;
		};
		msg?: {
			type?: string;
		};
		data?: {
			type?: string;
		};
	};
	required?: Array<string>;
}

/**
 * `发单方` 发送平台
 * - `POST` `/order-center/sender/order/toPlatform`
 * @description 发送平台订单，数据预览的时候数据从表格带过去，提交数据的时候，如果值没有变，原来是什么就是什么。状态是1和4才可以发送平台
 */
export function orderCenterSenderOrderToPlatform(
  data?: OrderCenterSenderOrderToPlatformRequest,
  options?: RequestOptions
): Promise<OrderCenterSenderOrderToPlatformResponse>

export interface OrderCenterSenderCancelPlatformRequest {
	orderNo: string
}

export interface OrderCenterSenderCancelPlatformResponse {
	code: string;
	msg?: string;
	data?: null;
}

/**
 * `发单方` 取消外发
 * - `GET` `/order-center/sender/cancelPlatform`
 * @description 
可否取消外发需要根据列表页的字段**dispatchIsCancelable**来判断，不能取消的原因提示，您的订单处于[statusName]状态，不能取消外发，如果仍需取消外发，请联系平台客服。
 */
export function orderCenterSenderCancelPlatform(
  params?: OrderCenterSenderCancelPlatformRequest,
  options?: RequestOptions
): Promise<OrderCenterSenderCancelPlatformResponse>

export interface OrderCenterSenderCancelMatchRequest {
	orderNo: string
}

export interface OrderCenterSenderCancelMatchResponse {
	code: string;
	msg?: string;
	data?: null;
}

/**
 * `发单方` 取消配柜
 * - `GET` `/order-center/sender/cancelMatch`
 */
export function orderCenterSenderCancelMatch(
  params?: OrderCenterSenderCancelMatchRequest,
  options?: RequestOptions
): Promise<OrderCenterSenderCancelMatchResponse>

export type OrderCenterSenderBatchConfirmReturnReceiptRequest = Array<string>

export interface OrderCenterSenderBatchConfirmReturnReceiptResponse {
	code?: string;
	msg?: string;
	data?: null;
}

/**
 * `发单方` 回单确认-批量
 * - `POST` `/order-center/sender/batchConfirmReturnReceipt`
 */
export function orderCenterSenderBatchConfirmReturnReceipt(
  data?: OrderCenterSenderBatchConfirmReturnReceiptRequest,
  options?: RequestOptions
): Promise<OrderCenterSenderBatchConfirmReturnReceiptResponse>

export interface OrderCenterSenderPageWaitingInvoiceRequest {
	current: number;
	size: number;
	data: {
		/** 订单类型 */
		orderType?: number;
		/** 开票类型，1专票，2普票，3不开票 */
		invoiceType?: number;
		/** 到厂开始时间 */
		startArrivingTime?: string;
		/** 到厂结束时间 */
		endArrivingTime?: string;
		/** 提单号/订舱号/承运编号 */
		businessNo?: string;
		/** 柜号 */
		containerNo?: string;
		/** 车牌 */
		vehicleId?: number;
		/** 司机 */
		driverId?: number;
		/** 车队 */
		dispatchMotorcadeId?: number;
	};
}

export interface OrderCenterSenderPageWaitingInvoiceResponse {
	code?: string;
	msg?: string;
	data?: Array<{
		orderNo: string;
		/** 订单类型名称 */
		orderTypeName: string;
		/** 到厂时间 */
		arrivingTime: string;
		/** 提单号/订舱号/承运编号 */
		businessNo?: string;
		/** 柜号 */
		containerNo?: string;
		/** 车队 */
		dispatchMotorcadeName?: string;
		/** 车牌 */
		tractorNo?: string;
		/** 司机名称 */
		driverName?: string;
		/** 司机电话 */
		driverTel?: string;
		/** 开票类型，1专票，2普票，3不开票
		 * 前端根据返回的数字值来显示文字，可能为null */
		invoiceType?: number;
		/** 行驶路线 */
		innerViewRoutes: Array<string>;
		/** 运费 */
		transportationFee: number;
		/** 其他费用 */
		otherFee: number;
		/** 税费 */
		taxFee: number;
		/** 含税总费用 */
		totalFeeIncludingTax: number;
	}>;
	pageInfo: {
		current?: number;
		size?: number;
		pages?: number;
		total?: number;
	};
}

/**
 * `发单方` 待开票列表数据
 * - `POST` `/order-center/sender/page/waitingInvoice`
 * @description 业务逻辑：

1、invoiceType开票类型，1专票，2普票，3不开票，前端根据返回的数字值来显示文字，可能为null；

2、承运人信息按照 dispatchMotorcadeName+driverName+tractorNo+driverTel显示，dispatchMotorcadeName可能为空，其他三个字段不为空；

3、行驶路线按照innerViewRoutes集合的顺序拼接元素；

4、车队检索信息接口[车队检索](https://api.zaitugongda.com/project/52/interface/api/7021)；

5、司机信息检索接口[司机检索](https://api.zaitugongda.com/project/52/interface/api/7019)；

6、车牌信息检索接口[车牌检索](/customer/vehicle/matchByNameOfPlatform)。
 */
export function orderCenterSenderPageWaitingInvoice(
  data?: OrderCenterSenderPageWaitingInvoiceRequest,
  options?: RequestOptions
): Promise<OrderCenterSenderPageWaitingInvoiceResponse>

export interface OrderCenterOrderBatchCreateRequest {
	/** 订单类别，1内部单，2平台单 */
	classification: number;
	/** 是否发送平台，0暂存，1发送平台
	 * 快捷外发新建订单保存时候用，暂存和立即发送 */
	isImmediatelyToPlatform?: number;
	/** 出口单集合 */
	exportPortOrders?: Array<{
		/** 是否指派接单人，0否，1是
		 * 快捷外发新建订单指派时候用 */
		isDesignative?: number;
		/** 快捷外发信息
		 * 快捷外发新建订单时候用 */
		orderToPlatformDTO?: {
			/** 下单价 */
			quotedPrice: number;
			/** 开票类型，1专票，2普票，3不开票 */
			invoiceType: number;
			/** 税费 */
			taxation: number;
			/** 含税价 */
			priceWithTax: number;
			/** 发单联系人 */
			contactor: string;
			/** 发单联系电话 */
			contactorNo?: string;
			/** 发单备注 */
			platformRemark?: string;
			/** 0否，1是 */
			isShare: number;
			/** 截止匹配时间 */
			matchDeadlineTime?: string;
			/** 指派信息 */
			dispatch?: {
				/** 车队标识 */
				dispatchMotorcadeId?: number;
				/** 车牌标识 */
				vehicleId?: number;
				/** 车辆标识 */
				driverId?: number;
				/** 指派的接单人标识 */
				userId: number;
			};
		};
		/** 订单类型 */
		orderType: number;
		/** 客户标识 */
		customerId?: number;
		/** 客户编号 */
		customerNo?: string;
		/** 货物类型 */
		commodityType?: string;
		/** 货重 */
		nettWeight?: string;
		/** 跟单备注 */
		followRemark?: string;
		/** 托运单备注 */
		consignmentBillRemark?: string;
		/** 做单文件 */
		appendices?: Array<{
			/** 路径 */
			filePath?: string;
			/** 文件类型，同上个版本 */
			fileType?: string;
		}>;
		/** 提柜地址标识 */
		pickupTerminalId: number;
		/** 提柜地址所属地区标识 */
		pickupPlaceId?: number;
		/** 还柜地址标识 */
		returnTerminalId: number;
		/** 还柜地址所属地区标识 */
		returnPlaceId?: number;
		/** 工厂信息 */
		factories: Array<{
			/** 标识 */
			factoryId?: number;
			/** 联系人 */
			contactor?: string;
			/** 联系电话 */
			contactorNo?: string;
			placeId?: number;
		}>;
		/** 船公司 */
		shippingCompanyId?: number;
		/** 柜型
		 * 新建平台单，必填 */
		containerTypeId?: number;
		/** 到厂时间 */
		arrivingFactoryTime: string;
		/** 订舱号 */
		businessNo: string;
		/** 柜号 */
		containerNo?: string;
		/** 封条号 */
		sealNo?: string;
		/** 报关行 */
		customsBrokerId?: number;
		/** 拿单地址 */
		takeOrderAddress?: string;
		/** 还单地址 */
		returnOrderAddress?: string;
		/** 出口单信息 */
		exportOrderAdditionalDTO?: {
			/** 截关日期	 */
			cyClosingDate?: string;
			/** 补料日期	 */
			siCutoffDate?: string;
			/** 截重日期	 */
			cyCutoffDate?: string;
			/** 开舱时间	 */
			cargoReceivingDate?: string;
		};
	}>;
	/** 出口单集合 */
	importPortOrders?: Array<{
		/** 是否指派接单人，0否，1是
		 * 快捷外发新建订单指派时候用 */
		isDesignative?: number;
		/** 快捷外发信息
		 * 快捷外发新建订单时候用 */
		orderToPlatformDTO?: {
			/** 下单价 */
			quotedPrice: number;
			/** 开票类型，1专票，2普票，3不开票 */
			invoiceType: number;
			/** 税费 */
			taxation: number;
			/** 含税价 */
			priceWithTax: number;
			/** 发单联系人 */
			contactor: string;
			/** 发单联系电话 */
			contactorNo?: string;
			/** 发单备注 */
			platformRemark?: string;
			/** 指派信息 */
			dispatch?: {
				/** 车队标识 */
				dispatchMotorcadeId?: number;
				/** 车牌标识 */
				vehicleId?: number;
				/** 车辆标识 */
				driverId?: number;
				/** 指派的接单人标识 */
				userId: number;
			};
		};
		/** 订单类型 */
		orderType: number;
		/** 客户标识 */
		customerId?: number;
		/** 客户编号 */
		customerNo?: string;
		/** 货物类型 */
		commodityType?: string;
		/** 货重
		 * 快捷外发新建必填 */
		nettWeight?: number;
		/** 跟单备注 */
		followRemark?: string;
		/** 托运单备注 */
		consignmentBillRemark?: string;
		/** 做单文件 */
		appendices?: Array<{
			/** 路径 */
			filePath?: string;
			/** 文件类型，同上个版本 */
			fileType?: string;
		}>;
		/** 提柜地址标识 */
		pickupTerminalId: number;
		/** 提柜地址所属地区标识 */
		pickupPlaceId?: number;
		/** 还柜地址标识 */
		returnTerminalId: number;
		/** 还柜地址所属地区标识 */
		returnPlaceId?: number;
		/** 工厂信息 */
		factories: Array<{
			/** 标识 */
			factoryId?: number;
			/** 联系人 */
			contactor?: string;
			/** 联系电话 */
			contactorNo?: string;
			placeId?: number;
		}>;
		/** 船公司 */
		shippingCompanyId?: number;
		/** 柜型
		 * 新建平台单，必填 */
		containerTypeId?: number;
		/** 到厂时间 */
		arrivingFactoryTime: string;
		/** 订舱号 */
		businessNo: string;
		/** 柜号 */
		containerNo?: string;
		/** 封条号 */
		sealNo?: string;
		/** 报关行 */
		customsBrokerId?: number;
		/** 拿单地址 */
		takeOrderAddress?: string;
		/** 还单地址 */
		returnOrderAddress?: string;
		/** 进口单补充信息 */
		importOrderAdditionalDTO?: {
			/** 截还柜 */
			storageUpto?: string;
			/** 截提柜 */
			detentionDaysUpto?: string;
		};
	}>;
	/** 国内物流单集合 */
	domesticOrders?: Array<{
		isDesignative?: number;
		orderToPlatformDTO?: {
			quotedPrice?: number;
			invoiceType?: number;
			taxation?: number;
			priceWithTax?: number;
			contactor?: string;
			contactorNo?: string;
			platformRemark?: string;
			dispatch?: {
				dispatchMotorcadeId?: null;
				vehicleId?: number;
				driverId?: number;
				userId?: number;
			};
		};
		orderType: number;
		customerId?: number;
		customerNo?: string;
		follower?: number;
		containerTypeId?: number;
		containerNo?: string;
		sealNo?: string;
		customsBrokerId?: null;
		commodityType?: string;
		nettWeight?: number;
		followRemark?: string;
		consignmentBillRemark?: string;
		appendices?: Array<{
			filePath?: string;
			fileType?: number;
		}>;
		/** 装货工厂 */
		loadFactories?: Array<{
			factoryId?: number;
			contactor?: string;
			contactorNo?: string;
			placeId?: null;
		}>;
		/** 卸货工厂 */
		unloadFactories?: Array<{
			factoryId?: number;
			contactor?: string;
			contactorNo?: string;
			placeId?: null;
		}>;
		/** 承运编号 */
		businessNo?: string;
		/** 到厂时间 */
		arrivingFactoryTime?: string;
		/** 时效 */
		effectiveTime?: number;
		/** 体积 */
		volume?: number;
		/** 车型 */
		vehicleType?: string;
		/** 车长 */
		vehicleLength?: number;
	}>;
}

export interface OrderCenterOrderBatchCreateResponse {}

/**
 * `发单方` 批量下单
 * - `POST` `/order-center/order/batchCreate`
 * @description 业务逻辑；
1、新增计划（内部单）和快捷外发（平台单）都是公用此接口，快捷外发的专用字段在文档上有标注；

2、exportPortOrders、importPortOrders、domesticOrders 字段大部分相同，因此相同字段的名称解释只写了一个；

3、快捷外发（平台单）指派订单的时候，车队和后面的车牌、司机姓名是互斥的，即车队是一个整体，车牌、司机姓名、电话是一个整体，检索车牌的时候在下面显示的是
    车牌+司机姓名+电话，如“浙F7PQ33+王炸+18969129262”，检索司机姓名的时候也是一样的显示风格，车队检索只会出现一个结果，车牌或者司机姓名检索会出现过个结果；

4、快捷外发（平台单）指派订单的时候入参userId必填，接口会返回，其他根据参数如果是指派车队，那么orderToPlatformDTO.dispacth中的dispatchMotorcadeId不能为空，其他的vehicleId和driverId的值为null，不能是0，
    如果是指派车队，那么orderToPlatformDTO.dispacth中的dispatchMotorcadeId为null，不能是0，vehicleId和driverId的不能是0和null；

5、快捷外发（平台单）指派订单，精准检索车队接口[精准检索车队](https://api.zaitugongda.com/project/520/interface/api/7068)；

6、快捷外发（平台单）指派订单，精准检索车牌接口[精准检索车牌](https://api.zaitugongda.com/project/520/interface/api/7070)；

7、快捷外发（平台单）指派订单，精准检索司机接口[精准检索司机](https://api.zaitugongda.com/project/520/interface/api/7069)；

8、客户是非必选项，因此选择工厂的时候如果选择了客户就带上客户标识，没选择就不带客户标识；

9、发单联系人和联系电话，默认是当前登录用户的姓名和电话。
 */
export function orderCenterOrderBatchCreate(
  data?: OrderCenterOrderBatchCreateRequest,
  options?: RequestOptions
): Promise<OrderCenterOrderBatchCreateResponse>

export interface SenderOrderDetailExportInfoRequest {
	orderNo: string
}

export interface SenderOrderDetailExportInfoResponse {
	code: string;
	msg?: string;
	data: {
		/** 基础信息 */
		baseInfo: {
			/** 订单号 */
			orderNo: number;
			/** 订单类型 */
			orderType: number;
			/** 客户标识 */
			customerId?: number;
			/** 回单确认状态 */
			returnReceiptConfirm?: number;
			/** 客户编号 */
			customerNo?: string;
			/** 货物类型 */
			commodityType?: string;
			/** 货重 */
			nettWeight?: number;
			/** 跟单备注 */
			remark?: string;
			/** 托运单备注 */
			consignmentBillRemark?: string;
			/** 提柜堆场标识 */
			pickupTerminalId: number;
			/** 还柜堆场标识 */
			returnTerminalId: number;
			/** 工厂标识 */
			factories: Array<number>;
			contacts?: Array<{
				contactor?: string;
				contactorNo?: string;
			}>;
			/** 船公司标识 */
			shippingCompanyId: number;
			/** 柜型标识 */
			containerTypeId: number;
			/** 到厂时间 */
			arrivingFactoryTime: string;
			/** 提单号 */
			businessNo: string;
			/** 柜号 */
			containerNo?: string;
			/** 封条 */
			sealNo?: string;
			/** 柜重 */
			containerWeight?: number;
			/** 报关行 */
			customsBrokerId?: number;
			/** 拿单地址 */
			takeOrderAddress?: string;
			/** 还单地址 */
			returnOrderAddress?: string;
			appendices?: Array<{
				fileType?: number;
				fileTypeName?: string;
				filePath?: string;
			}>;
			/** 提柜时间 */
			pickupTerminalTime?: string;
			/** 还柜时间 */
			returnTerminalTime?: string;
			/** 平台单信息 */
			orderToPlatformDTO?: {
				/** 下单价 */
				quotedPrice: number;
				/** 开票类型，1专票，2普票，3不开票 */
				invoiceType: number;
				/** 税费 */
				taxation: number;
				/** 含税价 */
				priceWithTax: number;
				/** 发单联系人 */
				contactor: string;
				/** 发单联系电话 */
				contactorNo: string;
				/** 发单备注 */
				platformRemark?: string;
			};
		};
		/** 订单状态 */
		orderStatus: number;
		/** 订单类别 */
		orderClassification: number;
		/** 柜型名称 */
		containerTypeName?: string;
		/** 客户名称 */
		customerName?: string;
		/** 货物名称 */
		commodityTypeName?: string;
		/** 车队名称 */
		dispatchMotorcadeName?: string;
		/** 车牌号 */
		tractorNo?: string;
		/** 司机姓名 */
		driverName?: string;
		/** 司机电话 */
		driverTel?: string;
		/** 结算方式 */
		settlement?: string;
		/** 下单价
		 * 平台单用 */
		quotedPrice?: number;
		/** 提柜堆场 */
		pickupTerminal: {
			/** 名称 */
			terminalName: string;
			/** 地址 */
			terminalAddress: string;
		};
		/** 还柜堆场 */
		returnTerminal: {
			/** 名称 */
			terminalName: string;
			/** 地址 */
			terminalAddress: string;
		};
		/** 装货工厂 */
		loadFactories: Array<{
			factoryId: number;
			factoryName: string;
			factoryContact?: string;
			contactNo?: string;
			province: string;
			city: string;
			district: string;
			detailAddress: string;
		}>;
		/** 报关行名称 */
		customsBrokerName?: string;
		/** 船公司名称 */
		shippingCompanyName: string;
		exportOrderAdditionalVo?: {
			/** 截关日期 */
			cyClosingDate?: string;
			/** 补料日期 */
			siCutoffDate?: string;
			/** 截重日期 */
			cyCutoffDate?: string;
			/** 开舱日期 */
			cargoReceivingDate?: string;
		};
	};
}

/**
 * `发单方` 订单详情-出口
 * - `GET` `/order-center/sender/order/detail/export/info`
 * @description 1、复制订单和订单详情都用此接口，维持上个版本的复制信息就行；

2、变动的地方，**baseInfo**里面添加了orderToPlatformDTO对象，订单为平台单的时候用，字段订舱号字段名称变为businessNo；

3、将地址/order\-center/sender/order/detail\_1661341722391后面的\_1661341722391去掉\~\~\~\~；

4、~~~~returnReceiptConfirm回单确认，如果状态是1，那么就不允许编辑了，如果是0都可以编辑，目前平台单都按这么处理，后续如果有需求，在变动。
 */
export function senderOrderDetailExportInfo(
  params?: SenderOrderDetailExportInfoRequest,
  options?: RequestOptions
): Promise<SenderOrderDetailExportInfoResponse>

export interface OrderCenterSenderOrderDetail1661342573508Request {
	orderNo: string
}

export interface OrderCenterSenderOrderDetail1661342573508Response {
	code?: string;
	msg?: string;
	data: {
		/** 订单基础信息 */
		baseInfo: {
			/** 订单号 */
			orderNo: number;
			/** 订单类型 */
			orderType: number;
			/** 回单确认 */
			returnReceiptConfirm: number;
			/** 客户标识 */
			customerId?: number;
			/** 客户编号 */
			customerNo?: string;
			/** 报关行标识 */
			customsBrokerId?: number;
			/** 跟单员标识 */
			follower: number;
			/** 货物类型 */
			commodityType?: string;
			/** 货重 */
			nettWeight?: number;
			/** 跟单备注 */
			followRemark?: string;
			/** 托运单备注 */
			consignmentBillRemark?: string;
			/** 装货工厂标识 */
			loadFactories: Array<number>;
			/** 装货联系人 */
			loadContacts?: Array<{
				contactor?: string;
				contactorNo?: string;
				palceId?: string;
			}>;
			/** 卸货工厂标识 */
			unloadFactories: Array<number>;
			/** 装货联系人 */
			unloadContacts?: Array<{
				contactor?: string;
				contactorNo?: string;
				palceId?: string;
			}>;
			/** 承运编号 */
			businessNo?: string;
			/** 装货时间 */
			arrivingFactoryTime: string;
			/** 柜型标识 */
			containerTypeId?: number;
			/** 柜号 */
			containerNo?: string;
			/** 封条 */
			sealNo?: string;
			/** 时效 */
			effectiveTime: number;
			/** 体积 */
			volume?: number;
			/** 车型 */
			vehicleType?: string;
			/** 车长 */
			vehicleLength?: number;
			appendices?: Array<{
				fileType?: number;
				fileTypeName?: string;
				filePath?: string;
			}>;
			/** 平台单信息 */
			orderToPlatformDTO?: {
				/** 下单价 */
				quotedPrice: number;
				/** 开票类型，1专票，2普票，3不开票 */
				invoiceType: number;
				/** 税费 */
				taxation: number;
				/** 含税价 */
				priceWithTax: number;
				/** 发单联系人 */
				contactor: string;
				/** 发单联系电话 */
				contactorNo: string;
				/** 发单备注 */
				platformRemark?: string;
			};
		};
		/** 订单状态 */
		orderStatus: number;
		/** 订单类别 */
		orderClassification: number;
		/** 柜型名称 */
		containerTypeName?: string;
		/** 客户名称 */
		customerName: string;
		/** 货物类型名称 */
		commodityTypeName?: string;
		/** 跟单员名称 */
		followerName: string;
		/** 车队名称 */
		dispatchMotorcadeName?: string;
		/** 车牌号 */
		tractorNo?: string;
		/** 司机姓名 */
		driverName?: string;
		/** 司机电话 */
		driverTel?: string;
		/** 装货工厂 */
		loadFactories: Array<{}>;
		/** 卸货工厂 */
		unloadFactories: Array<{}>;
		/** 车型名称 */
		vehicleTypeName?: string;
	};
}

/**
 * `发单方` 订单详情-国内
 * - `GET` `/order-center/sender/order/detail_1661342573508`
 * @description 1、复制订单和订单详情都用此接口，维持上个版本的复制信息就行；

2、变动的地方，**baseInfo**里面添加了orderToPlatformDTO对象，订单为平台单的时候用，字段承运编号字段名称变为businessNo，装货时间变为arrivingFactoryTime；

3、将地址/order\-center/sender/order/detail\_1661342573508后面的\_1661342573508去掉\~\~\~\~；

4、~~~~returnReceiptConfirm回单确认，如果状态是1，那么就不允许编辑了，如果是0都可以编辑，目前平台单都按这么处理，后续如果有需求，在变动。
 */
export function orderCenterSenderOrderDetail1661342573508(
  params?: OrderCenterSenderOrderDetail1661342573508Request,
  options?: RequestOptions
): Promise<OrderCenterSenderOrderDetail1661342573508Response>

export interface OrderCenterSenderOrderDetailRequest {
	/** 订单号 */
	orderNo: string
}

export interface OrderCenterSenderOrderDetailResponse {
	code: string;
	msg?: string;
	data: {
		/** 基础信息 */
		baseInfo: {
			/** 订单号 */
			orderNo: number;
			/** 订单类型 */
			orderType: number;
			/** 回单确认，0否，1是 */
			returnReceiptConfirm: number;
			/** 客户标识 */
			customerId?: number;
			/** 客户编号 */
			customerNo?: string;
			/** 货物类型 */
			commodityType?: string;
			/** 货重 */
			nettWeight?: number;
			/** 跟单备注 */
			followRemark?: string;
			/** 托运单备注 */
			consignmentBillRemark?: string;
			/** 提柜堆场标识 */
			pickupTerminalId: number;
			/** 还柜堆场标识 */
			returnTerminalId: number;
			/** 工厂标识 */
			factories: Array<number>;
			contacts?: Array<{
				contactor?: string;
				contactorNo?: string;
				palceId?: string;
			}>;
			/** 船公司标识 */
			shippingCompanyId: number;
			/** 柜型标识 */
			containerTypeId: number;
			/** 到厂时间 */
			arrivingFactoryTime: string;
			/** 提单号 */
			businessNo: string;
			/** 柜号 */
			containerNo?: string;
			/** 封条 */
			sealNo?: string;
			/** 柜重 */
			containerWeight?: number;
			/** 报关行 */
			customsBrokerId?: number;
			/** 拿单地址 */
			takeOrderAddress?: string;
			/** 还单地址 */
			returnOrderAddress?: string;
			/** 附件 */
			appendices?: Array<{
				/** 文件类型 */
				fileType?: number;
				/** 文件类型名称 */
				fileTypeName?: string;
				/** 文件路劲 */
				filePath?: string;
			}>;
			/** 提柜时间 */
			pickupTerminalTime?: string;
			/** 还柜时间 */
			returnTerminalTime?: string;
			/** 平台单信息 */
			orderToPlatformDTO?: {
				/** 下单价 */
				quotedPrice: number;
				/** 开票类型，1专票，2普票，3不开票 */
				invoiceType: number;
				/** 税费 */
				taxation: number;
				/** 含税价 */
				priceWithTax: number;
				/** 发单联系人 */
				contactor: string;
				/** 发单联系电话 */
				contactorNo: string;
				/** 发单备注 */
				platformRemark?: string;
			};
		};
		/** 订单状态 */
		orderStatus: number;
		/** 订单类别 */
		orderClassification: number;
		/** 柜型名称 */
		containerTypeName?: string;
		/** 客户名称 */
		customerName?: string;
		/** 货物名称 */
		commodityTypeName?: string;
		/** 卸货工厂信息 */
		unloadFactories: Array<{
			/** 工厂标识 */
			factoryId: number;
			/** 工厂名称 */
			factoryName: string;
			/** 联系人 */
			factoryContact?: string;
			/** 联系电话 */
			contactNo?: string;
			/** 省 */
			province: string;
			/** 市 */
			city: string;
			/** 区 */
			district?: string;
			/** 详细地址 */
			detailAddress: string;
		}>;
		/** 车队名称 */
		dispatchMotorcadeName?: string;
		/** 车牌号 */
		tractorNo?: string;
		/** 司机姓名 */
		driverName?: string;
		/** 司机电话 */
		driverTel?: string;
		/** 下单价
		 * 平台单用 */
		quotedPrice?: string;
		/** 提柜堆场 */
		pickupTerminal: {
			/** 名称 */
			terminalName: string;
			/** 地址 */
			terminalAddress: string;
		};
		/** 还柜堆场 */
		returnTerminal: {
			/** 名称 */
			terminalName: string;
			/** 地址 */
			terminalAddress: string;
		};
		/** 工厂名称
		 * 和前面的工厂标识是一一对应的 */
		factoryNames: Array<string>;
		/** 报关行名称 */
		customsBrokerName?: string;
		/** 船公司名称 */
		shippingCompanyName: string;
		importOrderAdditionalVo: {
			/** 截还柜 */
			storageUpto?: string;
			/** 截提柜	 */
			detentionDaysUpto?: string;
		};
	};
}

/**
 * `发单方` 订单详情-进口
 * - `GET` `/order-center/sender/order/detail`
 * @description 1、复制订单和订单详情都用此接口，维持上个版本的复制信息就行；

2、变动的地方，**baseInfo**里面添加了orderToPlatformDTO对象，订单为平台单的时候用，字段提单号字段名称变为businessNo；

3、returnReceiptConfirm回单确认，如果状态是1，那么就不允许编辑了，如果是0都可以编辑，目前平台单都按这么处理，后续如果有需求，在变动。
 */
export function orderCenterSenderOrderDetail(
  params?: OrderCenterSenderOrderDetailRequest,
  options?: RequestOptions
): Promise<OrderCenterSenderOrderDetailResponse>

export interface OrderCenterSenderChangePriceRequest {
	orderNo: string
	orderType: string
	price: string
}

export interface OrderCenterSenderChangePriceResponse {
	code: string;
	msg?: string;
	data?: null;
}

/**
 * `发单方` 调价
 * - `GET` `/order-center/sender/changePrice`
 * @description 1、订单状态在 7（已接单之前）才可以调价，其他状态，按钮置灰；

2、如果价格没改变，不需要调用后端接口。
 */
export function orderCenterSenderChangePrice(
  params?: OrderCenterSenderChangePriceRequest,
  options?: RequestOptions
): Promise<OrderCenterSenderChangePriceResponse>

export interface OrderCenterSenderPageNeedPayRequest {
	current: number;
	size: number;
	data: {
		/** 订单类型 */
		orderType?: number;
		/** 开票类型，1专票，2普票，3不开票 */
		invoiceType?: number;
		/** 到厂开始时间 */
		startArrivingTime: string;
		/** 到厂结束时间 */
		endArrivingTime?: string;
		/** 提单号/订舱号/承运编号 */
		businessNo?: string;
		/** 柜号 */
		containerNo?: string;
		/** 车牌 */
		vehicleId?: number;
		/** 司机 */
		driverId?: number;
		/** 车队 */
		dispatchMotorcadeId?: number;
	};
}

export interface OrderCenterSenderPageNeedPayResponse {
	code?: string;
	msg?: string;
	data?: Array<{
		orderNo: string;
		/** 订单类型名称 */
		orderTypeName: string;
		/** 订单状态名称 */
		orderStatusName: string;
		/** 到厂时间 */
		arrivingTime: string;
		/** 提单号/订舱号/承运编号 */
		businessNo?: string;
		/** 柜号 */
		containerNo?: string;
		/** 封条 */
		sealNo?: string;
		/** 货重 */
		nettWeight?: number;
		/** 车队 */
		dispatchMotorcadeName?: string;
		/** 车牌 */
		tractorNo?: string;
		/** 司机名称 */
		driverName?: string;
		/** 司机电话 */
		driverTel?: string;
		/** 开票类型，1专票，2普票，3不开票
		 * 前端根据返回的数字值来显示文字，可能为null */
		invoiceType?: number;
		/** 行驶路线 */
		innerViewRoutes: Array<string>;
		/** 运费 */
		transportationFee: number;
		/** 其他费用 */
		otherFee: number;
		/** 总费用 */
		totalFee: number;
		/** 含税总费用 */
		totalFeeIncludingTax: number;
	}>;
	pageInfo: {
		current?: number;
		size?: number;
		pages?: number;
		total?: number;
	};
}

/**
 * `发单方` 运费支付列表数据
 * - `POST` `/order-center/sender/page/needPay`
 * @description 业务逻辑：

1、invoiceType开票类型，1专票，2普票，3不开票，前端根据返回的数字值来显示文字，可能为null；

2、承运人信息按照 dispatchMotorcadeName+driverName+tractorNo+driverTel显示，dispatchMotorcadeName可能为空，其他三个字段不为空；

3、行驶路线按照innerViewRoutes集合的顺序拼接元素；

4、车队检索信息接口[车队检索](https://api.zaitugongda.com/project/52/interface/api/7021)；

5、司机信息检索接口[司机检索](https://api.zaitugongda.com/project/52/interface/api/7019)；

6、车牌信息检索接口[车牌检索](/customer/vehicle/matchByNameOfPlatform)。
 */
export function orderCenterSenderPageNeedPay(
  data?: OrderCenterSenderPageNeedPayRequest,
  options?: RequestOptions
): Promise<OrderCenterSenderPageNeedPayResponse>

export interface OrderCenterSenderPageOtherFeeRequest {
	current: number;
	size: number;
	data: {
		/** 订单类型 */
		orderType?: number;
		/** 到厂开始时间 */
		startArrivingTime: string;
		/** 到厂结束时间 */
		endArrivingTime?: string;
		/** 提单号/订舱号/承运编号 */
		businessNo?: string;
		/** 柜号 */
		containerNo?: string;
		/** 车牌 */
		vehicleId?: number;
		/** 司机 */
		driverId?: number;
		/** 车队 */
		dispatchMotorcadeId?: number;
	};
}

export interface OrderCenterSenderPageOtherFeeResponse {
	code?: string;
	msg?: string;
	data?: Array<{
		orderNo: string;
		/** 订单类型名称 */
		orderTypeName: string;
		/** 订单状态名称 */
		orderStatusName: string;
		/** 到厂时间 */
		arrivingTime: string;
		/** 提单号/订舱号/承运编号 */
		businessNo?: string;
		/** 柜号 */
		containerNo?: string;
		/** 车队 */
		dispatchMotorcadeName?: string;
		/** 车牌 */
		tractorNo: string;
		/** 司机名称 */
		driverName: string;
		/** 司机电话 */
		driverTel: string;
		/** 行驶路线 */
		innerViewRoutes: Array<string>;
		/** 费用信息 */
		otherFees: Array<{
			/** 额外费用标识 */
			id: number;
			/** 费用名称 */
			feeName: string;
			/** 金额 */
			amount: number;
			/** 费用状态 */
			checkStatus: number;
			/** 费用凭证 */
			credentialPath: Array<string>;
		}>;
	}>;
	pageInfo: {
		current?: number;
		size?: number;
		pages?: number;
		total?: number;
	};
}

/**
 * `发单方` 额外费用审核列表数据
 * - `POST` `/order-center/sender/page/otherFee`
 * @description 业务逻辑：

1、invoiceType开票类型，1专票，2普票，3不开票，前端根据返回的数字值来显示文字，可能为null；

2、承运人信息按照 dispatchMotorcadeName+driverName+tractorNo+driverTel显示，dispatchMotorcadeName可能为空，其他三个字段不为空；

3、行驶路线按照innerViewRoutes集合的顺序拼接元素；

4、车队检索信息接口[车队检索](https://api.zaitugongda.com/project/52/interface/api/7021)；

5、司机信息检索接口[司机检索](https://api.zaitugongda.com/project/52/interface/api/7019)；

6、车牌信息检索接口[车牌检索](/customer/vehicle/matchByNameOfPlatform)；

7、费用状态checkStatus，1审核中，2审核通过；3驳回，前端按照返回值显示对应的状态名称。
 */
export function orderCenterSenderPageOtherFee(
  data?: OrderCenterSenderPageOtherFeeRequest,
  options?: RequestOptions
): Promise<OrderCenterSenderPageOtherFeeResponse>

export interface OrderCenterOrderExportUpdateRequest {
	/** 订单类型，1进口单，2出口单，3直拼单，4间拼单，5国内物流 */
	orderType: number;
	/** 订单号 */
	orderNo: string;
	/** 客户 */
	customerId?: number;
	/** 货重
	 * 小数点后一位 */
	nettWeight?: number;
	/** 货物类型 */
	commodityType?: string;
	/** 跟单备注 */
	followRemark?: string;
	/** 托运单备注 */
	consignmentBillRemark?: string;
	/** 附件 */
	appendices?: Array<{
		/** 文件类型
		 * 1、提单文件，2、提柜文件，3、还柜文件，4、托运单文件 */
		fileType?: number;
		/** 文件oss路径 */
		filePath?: string;
	}>;
	/** 提柜堆场/码头 */
	pickupTerminalId?: number;
	/** 提柜地址所属地区标识 */
	pickupPlaceId?: number;
	/** 还柜堆场/码头 */
	returnTerminalId?: number;
	/** 还柜地址所属地区标识 */
	returnPlaceId?: string;
	/** 提柜时间 */
	pickupTerminalTime?: string;
	/** 还柜时间 */
	returnTerminalTime?: string;
	/** 卸货工厂 */
	factories?: Array<number>;
	/** 联系人 */
	contacts?: Array<{
		/** 标识 */
		factoryId?: number;
		/** 联系人 */
		contactor?: string;
		/** 联系电话 */
		contactorNo?: string;
		/** 地区标识 */
		placeId?: number;
	}>;
	/** 船公司 */
	shippingCompanyId?: number;
	/** 柜型 */
	containerTypeId?: number;
	/** 到厂时间 */
	arrivingFactoryTime?: string;
	/** 提单号 */
	businessNo?: string;
	/** 柜号 */
	containerNo?: string;
	/** 封条 */
	sealNo?: string;
	/** 柜重
	 * 小数点后一位 */
	containerWeight?: number;
	/** 报关行 */
	customsBrokerId?: number;
	/** 拿单地址 */
	takeOrderAddress?: string;
	/** 还单地址 */
	returnOrderAddress?: string;
	exportOrderAdditionalDTO?: {
		/** 截关日期 */
		cyClosingDate?: string;
		/** 补料日期 */
		siCutoffDate?: string;
		/** 截重日期 */
		cyCutoffDate?: string;
		/** 开舱日期 */
		cargoReceivingDate?: string;
	};
	/** 快捷外发信息
	 * 更新平台单时候用 */
	orderToPlatformDTO?: {
		/** 下单价 */
		quotedPrice?: number;
		/** 开票类型，1专票，2普票，3不开票 */
		invoiceType?: number;
		/** 税费 */
		taxation?: number;
		/** 含税价 */
		priceWithTax?: number;
		/** 发单联系人 */
		contactor?: string;
		/** 发单联系电话 */
		contactorNo?: string;
		/** 发单备注 */
		platformRemark?: string;
	};
}

export interface OrderCenterOrderExportUpdateResponse {
	code: string;
	msg?: string;
	data?: null;
}

/**
 * `订单更新` 出口单更新
 * - `POST` `/order-center/order/export/update`
 * @description 业务逻辑：
1、编辑的时候把所有字段的值都带上，原来为空的可以传，可以传，建议不传，属于平台单的特有字段更新内部单的时候就没必要带，如果用户想清空某一个值，数字类型的入参传0，字符类型的传空字符串，时间类型的传null。
 */
export function orderCenterOrderExportUpdate(
  data?: OrderCenterOrderExportUpdateRequest,
  options?: RequestOptions
): Promise<OrderCenterOrderExportUpdateResponse>

export interface OrderCenterOrderDomesticUpdateRequest {
	/** 订单类型值为5 */
	orderType: number;
	/** 订单号 */
	orderNo: string;
	/** 客户 */
	customerId?: number;
	/** 货重 */
	nettWeight?: number;
	/** 柜型 */
	containerTypeId?: number;
	/** 货物类型 */
	commodityType?: string;
	/** 报关行标识 */
	customsBrokerId?: number;
	/** 跟单备注 */
	followRemark?: string;
	/** 托运单备注 */
	consignmentBillRemark?: string;
	/** 做单资料 */
	appendices?: Array<{
		/** 4、托运单文件，5、承运单文件 */
		fileType?: string;
		filePath?: string;
	}>;
	/** 装货工厂 */
	loadFactories?: Array<number>;
	loadContacts?: Array<{
		factoryId?: number;
		contactor?: string;
		contactorNo?: string;
		placeId?: null;
	}>;
	/** 卸货工厂 */
	unloadFactories?: Array<number>;
	unloadContacts?: Array<{
		factoryId?: number;
		contactor?: string;
		contactorNo?: string;
		placeId?: null;
	}>;
	/** 承运编号 */
	businessNo?: string;
	/** 装货时间 */
	arrivingFactoryTime?: string;
	/** 时效 */
	effectiveTime?: number;
	/** 体积 */
	volume?: number;
	/** 车型 */
	vehicleType?: string;
	/** 车长 */
	vehicleLength?: number;
	/** 快捷外发信息
	 * 更新平台单时候用 */
	orderToPlatformDTO?: {
		/** 下单价 */
		quotedPrice: number;
		/** 开票类型，1专票，2普票，3不开票 */
		invoiceType: number;
		/** 税费 */
		taxation: number;
		/** 含税价 */
		priceWithTax: number;
		/** 发单联系人 */
		contactor: string;
		/** 发单联系电话 */
		contactorNo: string;
		/** 发单备注 */
		platformRemark?: string;
	};
}

export interface OrderCenterOrderDomesticUpdateResponse {}

/**
 * `订单更新` 国内单更新
 * - `POST` `/order-center/order/domestic/update`
 * @description 业务逻辑：
1、编辑的时候把所有字段的值都带上，原来为空的可以传，可以传，建议不传，属于平台单的特有字段更新内部单的时候就没必要带，如果用户想清空某一个值，数字类型的入参传0，字符类型的传空字符串，时间类型的传null。
 */
export function orderCenterOrderDomesticUpdate(
  data?: OrderCenterOrderDomesticUpdateRequest,
  options?: RequestOptions
): Promise<OrderCenterOrderDomesticUpdateResponse>

export interface OrderCenterOrderImportUpdateRequest {
	/** 订单类型，1进口单，2出口单，3直拼单，4间拼单，5国内物流 */
	orderType: number;
	/** 订单号 */
	orderNo: string;
	/** 客户 */
	customerId?: number;
	/** 跟单员 */
	follower?: number;
	/** 货重
	 * 小数点后一位 */
	nettWeight?: number;
	/** 货物类型 */
	commodityType?: string;
	/** 跟单备注 */
	followRemark?: string;
	/** 托运单备注 */
	consignmentBillRemark?: string;
	/** 附件 */
	appendices?: Array<{
		/** 文件类型
		 * 1、提单文件，2、提柜文件，3、还柜文件，4、托运单文件 */
		fileType: number;
		/** 文件oss路径 */
		filePath: string;
	}>;
	/** 提柜堆场/码头 */
	pickupTerminalId?: number;
	/** 提柜地址所属地区标识 */
	pickupPlaceId?: number;
	/** 还柜堆场/码头 */
	returnTerminalId?: number;
	/** 还柜地址所属地区标识 */
	returnPlaceId?: string;
	/** 提柜时间 */
	pickupTerminalTime?: string;
	/** 还柜时间 */
	returnTerminalTime?: string;
	/** 卸货工厂 */
	factories?: Array<number>;
	/** 联系人 */
	contacts?: Array<{
		/** 标识 */
		factoryId?: number;
		/** 联系人 */
		contactor?: string;
		/** 联系电话 */
		contactorNo?: string;
		/** 地区标识 */
		placeId?: number;
	}>;
	/** 船公司 */
	shippingCompanyId?: number;
	/** 柜型 */
	containerTypeId?: number;
	/** 到厂时间 */
	arrivingFactoryTime?: string;
	/** 提单号 */
	businessNo?: string;
	/** 柜号 */
	containerNo?: string;
	/** 封条 */
	sealNo?: string;
	/** 柜重
	 * 小数点后一位 */
	containerWeight?: number;
	/** 报关行 */
	customsBrokerId?: number;
	/** 拿单地址 */
	takeOrderAddress?: string;
	/** 还单地址 */
	returnOrderAddress?: string;
	/** 进口信息 */
	importOrderAdditionalDTO?: {
		/** 截还柜 */
		storageUpto?: string;
		/** 截提柜 */
		detentionDaysUpto?: string;
	};
	/** 快捷外发信息
	 * 更新平台单时候用 */
	orderToPlatformDTO?: {
		/** 下单价 */
		quotedPrice: number;
		/** 开票类型，1专票，2普票，3不开票 */
		invoiceType: number;
		/** 税费 */
		taxation: number;
		/** 含税价 */
		priceWithTax: number;
		/** 发单联系人 */
		contactor: string;
		/** 发单联系电话 */
		contactorNo: string;
		/** 发单备注 */
		platformRemark?: string;
	};
}

export interface OrderCenterOrderImportUpdateResponse {
	code: string;
	msg?: string;
	data?: null;
}

/**
 * `订单更新` 进口单更新
 * - `POST` `/order-center/order/import/update`
 * @description 业务逻辑：
1、编辑的时候把所有字段的值都带上，原来为空的可以传，可以传，建议不传，属于平台单的特有字段更新内部单的时候就没必要带，如果用户想清空某一个值，数字类型的入参传0，字符类型的传空字符串，时间类型的传null。
 */
export function orderCenterOrderImportUpdate(
  data?: OrderCenterOrderImportUpdateRequest,
  options?: RequestOptions
): Promise<OrderCenterOrderImportUpdateResponse>
