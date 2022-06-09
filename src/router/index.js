import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router';


const routers = [
	{
		path: '/',
		auth: false,
		element: lazy(() => import('../pages/login'))
	},
	{
		path: '/home',
		auth: false,
		element: lazy(() => import('../pages/home'))
	}
];

const syncRouter = (routerArray = []) => {
	let routerList = [];
	routerArray.forEach((router) => {
		routerList.push({
			path: router.path,
			auth: router.auth,
			element: (
				<Suspense>
					<router.element />
				</Suspense>
			),
			children: router.children && syncRouter(router.children)
		});
	});
	return routerList;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => useRoutes(syncRouter(routers))
