import type { RouteObject } from 'react-router-dom';
import { SPA, Nested, Layout, Index, NotFound, SPAIndex, Counter } from './SPA';

export const routes = (): RouteObject[] => [
	{
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Index />,
			},
			{
				path: '/SPA',
				element: <SPA />,
				children: [
					{
						index: true,
						element: <SPAIndex />,
					},
					{
						path: '/SPA/nested',
						element: <Nested />,
					},
					{
						path: '/SPA/nested/:id',
						element: <Nested />,
					},
					{
						path: '/SPA/counter',
						element: <Counter />,
					},
				],
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
];
