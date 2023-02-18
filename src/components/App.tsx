import {
	Link,
	Outlet,
	RouteDataFunc,
	RouteDefinition,
	useNavigate,
	useRoutes,
} from '@solidjs/router';
import { createEffect, createResource, createSignal } from 'solid-js';
import { transform } from 'ultrahtml';
import sanitize from 'ultrahtml/transformers/sanitize';
import { Docs } from './Docs';
import { setSetPath } from './IslandLink';

const getDoc = async (slugArg: string) => {
	const slug = slugArg || 'index';
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
	}
	const magicString = '<!DOCTYPE html><!-- MARKER -->';
	if (output) {
		// check magical string
		if (!output.startsWith(magicString)) {
			throw new Error('Invalid response');
		}
		return output.slice(magicString.length);
	} else {
		throw new Error('Failed to load');
	}
};

const ssrCache = {} as Record<string, string>;
if (import.meta.env.SSR) {
	ssrCache[''] = await getDoc('');
	ssrCache['our-philosophy'] = await getDoc('our-philosophy');
	ssrCache['comparisons'] = await getDoc('comparisons');
}

const docsGetter: RouteDataFunc = ({ params }) => {
	const cache = ssrCache[params.slug];
	const [doc] = createResource(
		() => params.slug,
		getDoc,
		cache
			? {
					initialValue: cache,
			  }
			: {
					initialValue: 'value in js bundle 🤷‍♀️',
					ssrLoadFrom: 'initial',
			  }
	);
	return doc;
};

const routes = [
	{
		path: '/',
		component: () => <Layout />,
		children: [
			{
				path: '/',
				component: () => (
					<>
						Go to <Link href="/docs">docs</Link>
					</>
				),
			},
			{
				path: '/docs',
				children: [
					{
						path: '*slug',
						data: docsGetter,
						component: () => <Docs />,
					},
				],
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
	const navigate = useNavigate();
	createEffect(() => {
		setSetPath(navigate);
	});
	return <Outlet />;
}
