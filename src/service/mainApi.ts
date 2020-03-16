import { $get } from '../utils/http';
import { CompanyInfo, WarehouseInfo, BasicParams, BasicInfo } from '../types';


export const getCompanyInfo = async function (token: string): Promise<Array<CompanyInfo>>{
  const data: any = await $get({
    url: '/show/companyList',
    params: { token },
  })
  return data;
}

export const getWarehouseInfo = async function (companyCode: string, token: string): Promise<Array<WarehouseInfo>>{
  const data: any = await $get({
    url: '/show/warehouseList',
    params: { companyCode, token },
  })
  return data;
}

export const getBasicInfo = async function (basicParams: BasicParams, day: string): Promise<BasicInfo>{
  const data: any = await $get({
    url: '/show/warehouse',
    params: { ...basicParams, day },
  })
  return data;
}