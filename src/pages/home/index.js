import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Divider, Tabs, Layout, Spin } from 'antd';
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

// import instance from '../../api/instance';
// import { IMGS } from '../../api/api';
import { fetchImgListAsync } from '../../store/homeSlice';
import styles from './index.module.css';

import { useGetCategoryQuery } from '../../store/homeApi';

const { TabPane } = Tabs;
const { Header, Footer, Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 28 }} spin />;

export default function HomePage() {
	const dispatch = useDispatch();

	const [ params, setParams ] = useState({
		searchValue: '',
		categoryName: '1',
		pageIndex: 1,
		pageSize: 30,
		tags: ''
	});

	// 获取分类数据
	const { data: categoryList } = useGetCategoryQuery(null, {
		  // useQuery可以接收一个对象作为第二个参数，通过该对象可以对请求进行配置
        // selectFromResult: result => {
        //     if (result.data) {
        //         result.data = result.data.filter(item => item._id);
        //     }
        //
        //     return result;
        // }, // 用来指定useQuery返回的结果
        pollingInterval:0, // 设置轮询的间隔，单位毫秒 如果为0则表示不轮询
        skip:false, // 设置是否跳过当前请求，默认false
        refetchOnMountOrArgChange:false, // 设置是否每次都重新加载数据 false正常使用缓存，
                                            // true每次都重载数据
                                            //数字，数据缓存的时间（秒）
        refetchOnFocus:false, // 是否在重新获取焦点时重载数据
        refetchOnReconnect:true, // 是否在重新连接后重载数据
	});

	// 获取图片资源
	const { imgList, loading } = useSelector((state) => state.home);

	const extraContent = (
		<Input
			placeholder="搜索壁纸"
			size="large"
			style={{ borderRadius: '7px' }}
			suffix={
				<SearchOutlined
					style={{
						fontSize: 16,
						color: '#1890ff'
					}}
				/>
			}
		/>
	);

	const handleChangeKey = (key) => {
		// dispatch(fetchImgListAsync({ ...params, categoryName: key }));
		setParams({ ...params, categoryName: key });
	};

	useEffect(() => {
		dispatch(fetchImgListAsync(params));
	}, [params]);

	return (
		<Layout style={{ height: '100vh', backgroundColor: '#fff', overflow: 'hidden' }}>
			<Header>
				<Row align="middle">
					<Col flex={3}>
						<span className={styles.logo}>logo</span>
					</Col>
					<Col flex={2}>
						<div className={styles.nav}>
							<span>壁纸库</span>
							<span>动态壁纸</span>
							<span>我的壁纸</span>
						</div>
					</Col>
					<Col flex={3} />
				</Row>
			</Header>
			<Divider style={{ margin: 0 }} />
			<Content style={{ overflow: 'auto' }}>
				<div style={{ padding: '0 40px' }}>
					<Tabs
						size="large"
						defaultActiveKey="1"
						tabBarExtraContent={extraContent}
						onChange={handleChangeKey}
					>
						<TabPane tab="最新" key="1">
							<div className={styles.container}>
								{_.map(imgList, (item) => (
									<div className={styles.item} key={item._id}>
										<img src={item.url} alt="" />
									</div>
								))}
							</div>
						</TabPane>
						{_.map(categoryList, (c) => (
							<TabPane tab={c.cName} key={c.cName}>
								<Spin size="large" tip="Loading..." indicator={antIcon} spinning={loading}>
									<div className={styles.container}>
										{_.map(imgList, (item) => (
											<div className={styles.item} key={item._id}>
												<img src={item.url} alt="" />
											</div>
										))}
									</div>
								</Spin>
							</TabPane>
						))}
					</Tabs>
				</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>辰星壁纸 ©2022 Created by Lance 仅作学习使用</Footer>
			{/* <div className="sea">
                  <div className="wave"></div>
                  <div className="wave"></div>
              </div> */}
		</Layout>
	);
}
