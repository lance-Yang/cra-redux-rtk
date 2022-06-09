import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const homeApi = createApi({
	reducerPath: 'homeApi', // Api的标识，不能和其他的Api或reducer重复
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://48a801df-ae69-40f3-a7f0-31479d7e7879.bspapp.com'
    }),
	endpoints(build) {
		return {
			// 获取分类
			getCategory: build.query({
				query() {
					return '/category';
				},
				// transformResponse 用来转换响应数据的格式
				transformResponse(baseQueryReturnValue) {
					return baseQueryReturnValue.data;
				}
			}),
			// 获取图片资源
			getImgList: build.query({
				query(args) {
					return {
						url: '/imgs',
						params: {
							searchValue: '',
							categoryName: '1',
							pageIndex: 1,
							pageSize: 30,
                            tags: '',
                            ...args
						}
					};
				},
				// transformResponse 用来转换响应数据的格式
				transformResponse(baseQueryReturnValue) {
					return baseQueryReturnValue.data;
                },
            })
		};
	} // endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值
});

// Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数
// 通过这些钩子函数，可以来向服务器发送请求
// 钩子函数的命名规则 fetchLogin --> useFetchLoginQuery
export const { useGetCategoryQuery, useGetImgListQuery } = homeApi;

export default homeApi;
