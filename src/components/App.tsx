// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
// import { routes } from './routes';
// import { getContext } from '../ssr/context';
import { Link, Outlet, RouteDataFunc, RouteDefinition, useRoutes } from '@solidjs/router';
import { createResource, createSignal } from 'solid-js';
import { transform } from 'ultrahtml';
import sanitize from 'ultrahtml/transformers/sanitize';
import { Docs } from './Docs';

// let App = () => {
// 	const router = createBrowserRouter(routes());
// 	return <RouterProvider router={router} fallbackElement={null} />;
// };

// if (import.meta.env.SSR) {
// 	App = () => {
// 		const ctx = getContext();
// 		const router = createStaticRouter(routes(), ctx);
// 		return <StaticRouterProvider context={ctx} router={router} />;
// 	};
// }

// WTH? How is it not working when fetchUser is async?
// const fetchUsers = async () => {
const fetchUsers = () => {
	const x = Math.random() + '123 + ' + 'slug';
	console.log('createResource', x);
	return x;
};
const docsGetter =
	(slug: string): RouteDataFunc =>
	({ params }) => {
		const [user] = createResource(() => {
			console.log('createResource', slug, params.slug);
			return slug;
		}, fetchUsers);
		return user();
	};

const routes = [
	{
		path: '/',
		component: () => <Layout />,
		children: [
			{
				path: '/',
				component: () => <>Index</>,
			},
			{
				path: '/SPA',
				component: () => <Counter />,
			},
			{
				path: '/docs/our-philosophy',
				data: docsGetter('our-philosophy'),
				component: () => <Docs />,
			},
			{
				path: '/docs/comparisons',
				data: docsGetter('comparisons'),
				component: () => <Docs />,
			},
			{
				path: '/docs/:slug',
				data: docsGetter(':slug'),
				component: () => <Docs />,
			},
			{
				path: '/old_docs/:slug',
				data: ({ params }) => {
					const [user] = createResource(
						() => {
							console.log('createResource', params.slug);
							return params.slug;
						},
						() => {
							const x = Math.random() + '123 + ' + params.slug;
							console.log('createResource', x);
							return x;
						}
					);
					return user();

					let output = '';
					let i = 0;
					const slug = params.slug;

					const getDoc = async (slug: string) => {
						// await new Promise((resolve) => setTimeout(resolve, 3000));
						const url = new URL(
							'/get_article/' + slug,
							// during ssr we don't have access to window.location.origin
							import.meta.env.SSR ? 'http://localhost:3000' : window.location.origin
						);
						const res = await fetch(url);
						if (res.ok) {
							const data = await res.text();
							output = await transform(data, [sanitize({ allowElements: ['style'] })]);
						}
						console.log('getDoc', i, import.meta.env.SSR, slug, output.length);
						return output;
						if (i++ === 0) {
							return;
						}

						return 'value from client ' + slug;
					};

					return createResource(
						() => data.params.slug,
						() => Math.random() + '123 + ' + data.params.slug
					)[0]();

					const res = createResource(
						() => data.params.slug,
						async (slug) => {
							const r = await getDoc(slug);
							console.log('args', slug, r);
							return r;
						},
						import.meta.env.SSR
							? {
									initialValue: 'value from SSR 123 ',
							  }
							: {
									initialValue: 'value in js bundle',
									ssrLoadFrom: 'initial',
							  }
					);
					console.log('res', res);
					return res[0]();
					async () => {
						let output = '';
						if (!output) {
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
						return 'some docs';
					};
				},
				component: () => <Docs />,
			},
			{
				path: '*',
				component: () => <>Catch all</>,
			},
		],
	},
	{
		path: '*',
		component: () => <>404</>,
	},
] satisfies RouteDefinition[];

export default function App() {
	const Routes = useRoutes(routes);

	return <Routes />;
}

function Layout() {
	return (
		<div class="App">
			<h1>Vite + Solid</h1>
			<ul>
				<li>
					<Link href="/">Index</Link>
				</li>

				<li>
					<Link href="/docs">Docs</Link>
				</li>
				<li>
					<Link href="/docs/our-philosophy">Docs - Philosophy</Link>
				</li>
				<li>
					<Link href="/docs/comparisons">Docs - comparisons</Link>
				</li>
				<li>
					<Link href="/SPA">SPA</Link>
				</li>
			</ul>
			<Outlet />
		</div>
	);
}

function Counter() {
	const [count, setCount] = createSignal(0);
	return (
		<>
			<div class="card">
				<button onClick={() => setCount((count) => count + 1)}>count is {count()}</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p class="read-the-docs">Click on the Vite and Solid logos to learn more</p>
		</>
	);
}
