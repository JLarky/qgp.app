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
	if (import.meta.env.SSR) {
		throw new Error('getDoc should not be called on the server');
	}
	const slug = slugArg || 'index';
	let output = '';
	if (!output) {
		// await new Promise((resolve) => setTimeout(resolve, 3000));
		const url = new URL('/get_article/' + slug, window.location.origin);
		if (import.meta.env.DEV) {
			const isAstro = !!import.meta.env.SITE;
			if (!isAstro) {
				url.port = '3000';
			}
		}
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

const docsGetter: RouteDataFunc = ({ params }) => {
	const [doc] = createResource(() => params.slug, getDoc, {
		initialValue: '', // use astro child for initial SSR value instead (no double serialization)
		ssrLoadFrom: 'initial',
	});
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
