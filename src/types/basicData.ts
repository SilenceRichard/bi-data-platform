export interface BasicParams {
  warehouseCode: string,
  companyCode: string,
  token: string,
}

export interface CompanyInfo {
  code: string, // 货主code
  name: string, // 货主名称
}

export interface WarehouseInfo {
  code: string, // 货主code
  name: string, // 货主名称
}

export interface BasicInfo { // 副标题统计信息
  area: string, // 仓库总面积
  empQty: string, // 在岗人数
  skuNum: string, // SKU数量
  stockNum: string, // 库存总数
  outboundNum: string, // 累计出库订单数
  inboundNum: string, // 累计入库订单数
  returnOrderNum: string, // 累计退货订单数
}

export interface StorageBasicInfo { // 仓储 副标题统计信息
  area: string,
  returnOrderNum: string, // 累计退货订单数
  skuNum: string, // SKU数量
  stockNum: string, // 库存总数
  inboundNum: string, // 累计入库订单数
}