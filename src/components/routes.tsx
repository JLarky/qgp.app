import type { RouteObject } from 'react-router-dom';
import { SPA, Nested, Layout, Index, NotFound, SPAIndex, Counter } from './SPA';
import { transform } from 'ultrahtml';
import sanitize from 'ultrahtml/transformers/sanitize';
import { Docs } from './Docs';

export const routes = (): RouteObject[] => [
	{
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Index />,
			},
			{
				path: '/docs',
				element: 'DOCS 123123',
			},
			{
				path: '/docs/*',
				element: <Docs />,
				loader: async ({ params }) => {
					const slug = params['*'];
					if (!slug) {
						throw new Error('No slug');
					}
					let output = '';
					if (import.meta.env.SSR && import.meta.env.PROD) {
						// if (import.meta.env.SSR) {
						console.log('SSR prod', slug);
						try {
							async function readFile(path: string) {
								try {
									const { readFile } = await import('fs/promises');
									output = await readFile(path, 'utf-8');
								} catch (err) {
									throw err;
								}
							}
							console.log(await readFile('dist/get_article/' + slug + '/index.html'));
						} catch (err) {
							console.error(err);
						}
					}
					if (!output) {
						// await new Promise((resolve) => setTimeout(resolve, 3000));
						const url = new URL('http://localhost:3000/get_article/' + slug);
						const res = await fetch(url);
						if (res.ok) {
							const data = await res.text();
							output = await transform(data, [sanitize({ allowElements: ['style'] })]);
						}
					}
					if (output) {
						// check magical string
						if (!output.startsWith('<!DOCTYPE html>\nMARKER')) {
							throw new Error('Invalid response');
						}
						return output.slice(22);
					} else {
						throw new Error('Failed to load');
					}
				},
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
