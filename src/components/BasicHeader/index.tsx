import React from 'react';
import { Dropdown, Row, Col, Menu, Icon, Statistic } from 'antd';

import { CompanyInfo, WarehouseInfo, StorageBasicInfo, BasicInfo } from '../../types';
import './index.css';

interface MainProps {
  companyInfo: Array<CompanyInfo>,
  warehouseInfo: Array<WarehouseInfo>
  companyName: string,
  warehouseName: string,
  onChangeItem?: (key: string, type: 'warehouseCode' | 'companyCode') => void;
  year: number,
  month: number,
  day: number,
  time: string,
}

interface SubProps {
  basicInfo: BasicInfo
}

interface StorageProps {
  basicInfo: StorageBasicInfo,
}

const MainHeader = (props: MainProps) => {
  const {
    companyInfo,
    warehouseInfo,
    companyName = '',
    warehouseName = '',
    onChangeItem,
    year = '',
    month = '',
    day = '',
    time = '',
  } = props;
  const companyMenu = (
    <Menu>
      {
        companyInfo && companyInfo.map((item) => (
          <Menu.Item
            title={item.name}
            key={item.code}
            onClick={(params) => {
              if (onChangeItem) {
                const { key } = params;
                onChangeItem(key, 'companyCode');
              }
            }}
          >
            {item.name}
          </Menu.Item>
        ))
      }
    </Menu>
  );
  const warehouseMenu = (
    <Menu>
      {
        warehouseInfo && warehouseInfo.map((item) => (
          <Menu.Item
            key={item.code}
            onClick={(params) => {
              if (onChangeItem) {
                const { key } = params;
                onChangeItem(key, 'warehouseCode');
              }
            }}
          >
            {item.name}
          </Menu.Item>
        ))
      }
    </Menu>
  );
  return (
    <>
      <div className='mainHeaderRow'>
        <span className='label-wrapper'>
          <label className="label labelFirst">客户名称</label>
          <span className='item'>
            {companyName}
            {
              companyInfo && (
                <Dropdown overlay={companyMenu}>
                  <Icon type='caret-down' />
                </Dropdown>
              )
            }
          </span>
        </span>
        <span className='label-wrapper'>
          <label className="label">仓库名称</label>
          <span className='item'>
            {warehouseName}
            {
              warehouseInfo && (
                <Dropdown overlay={warehouseMenu}>
                  <Icon type='caret-down' />
                </Dropdown>
              )
            }
          </span>
        </span>
        <span className='label-wrapper'>
          <label className="label">数据更新时间</label>
          <span className='item'>
            {`${year}年${month}月${day}日 ${time}`}
          </span>
        </span>
      </div>
    </>
  )
};

const SubHeader = (props: SubProps) => {
  const {
    area = '0',
    empQty = '0',
    skuNum = '0',
    stockNum = '0',
    outboundNum = '0',
    inboundNum = '0',
    returnOrderNum = '0',
  } = props.basicInfo;
  return (
    <>
      <Row type='flex' justify='space-around'>
        <Col>
          <Statistic
            valueStyle={{ fontSize: '3vh' }}
            suffix='仓储面积(m²)'
            value={area}
          />
        </Col>
        <Col>
          <Statistic
            valueStyle={{ fontSize: '48px' }}
            suffix='各岗位人员(人)'
            value={empQty}
          />
        </Col>
        <Col>
          <Statistic
            valueStyle={{ fontSize: '48px' }}
            suffix='SKU'
            value={skuNum}
          />
        </Col>
        <Col>
          <Statistic
            valueStyle={{ fontSize: '48px' }}
            suffix='总库存'
            value={stockNum}
          />
        </Col>
        <Col>
          <Statistic
            valueStyle={{ fontSize: '48px' }}
            suffix='累计出库订单'
            value={outboundNum}
          />
        </Col>
        <Col>
          <Statistic
            valueStyle={{ fontSize: '48px' }}
            suffix='累计入库订单'
            value={inboundNum}
          />
        </Col>
        <Col>
          <Statistic
            valueStyle={{ fontSize: '48PX' }}
            suffix='累计退货订单'
            value={returnOrderNum}
          />
        </Col>
      </Row>
    </>
  );
};

const StorageHeader = (props: StorageProps) => {
  const {
    area = '0',
    skuNum = '0',
    stockNum = '0',
    inboundNum = '0',
    returnOrderNum = '0',
  } = props.basicInfo;
  return (
    <>
      <Row type='flex' justify='space-around'>
        <Col>
          <Statistic
            valueStyle={{ fontSize: '3vh' }}
            suffix='仓储面积(m²)'
            value={area}
          />
        </Col>
        <Col>
          <Statistic
            valueStyle={{ fontSize: '3vh' }}
            suffix='SKU'
            value={skuNum}
          />
        </Col>
        <Col>
          <Statistic
            valueStyle={{ fontSize: '3vh' }}
            suffix='总库存'
            value={stockNum}
          />
        </Col>
        <Col>
          <Statistic
            valueStyle={{ fontSize: '3vh' }}
            suffix='累计入库订单'
            value={inboundNum}
          />
        </Col>
        <Col>
          <Statistic
            valueStyle={{ fontSize: '3vh' }}
            suffix='累计退货订单'
            value={returnOrderNum}
          />
        </Col>
      </Row>
    </>
  );
};

export { MainHeader, SubHeader, StorageHeader };
