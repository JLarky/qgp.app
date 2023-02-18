import { Link, Outlet, RouteDefinition, useNavigate, useRoutes } from '@solidjs/router';
import { createEffect, createSignal } from 'solid-js';
import { setSetPath } from './IslandLink';

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
				path: '*',
				component: Counter,
			},
		],
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
