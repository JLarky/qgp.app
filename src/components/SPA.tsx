import { useEffect, useState } from 'react';
import { Link, Outlet, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { setSetPath } from './IslandLink';

export const Layout = () => {
	const navigate = useNavigate();
	useEffect(() => {
		setSetPath(navigate);
	}, []);
	return <Outlet />;
};

export const SPA = () => {
	return (
		<div>
			<h1>
				QGP powered SPA <Loading>⚡️</Loading>
			</h1>
			<div>
				<Sidebar />
				<Outlet />
			</div>
		</div>
	);
};

export const Index = () => {
	return (
		<div>
			<h1>Hello from Vite ⚡️</h1>
			<p>You can only see this message if you are looking at it from Vite.</p>
			<p>
				Now click on <Link to="/SPA">SPA</Link> link
			</p>
		</div>
	);
};

export const Loading = ({ children }: { children: string }) => {
	const [count, setCount] = useState(0);
	const [state, setState] = useState('initial' as 'initial' | 'loading' | 'loaded');
	useEffect(() => {
		if (state === 'initial') {
			setState('loading');
			setTimeout(() => setState('loaded'), 1000);
		}
	}, []);
	return (
		<>
			{state === 'loading' && '(spinner...)'}
			{state === 'loaded' && (
				<button onClick={() => setCount((i) => (i + 1) % 3)}>
					{Array(count + 1).fill(children)}
				</button>
			)}
		</>
	);
};

export const Sidebar = () => {
	const [state, setState] = useState('initial' as 'initial' | 'loading' | 'loaded');
	useEffect(() => {
		if (state === 'initial') {
			setState('loading');
			setTimeout(() => setState('loaded'), 1000);
		}
	}, []);
	return (
		<aside>
			<h4>Sidebar Menu</h4>
			<Link to="/SPA">index</Link>
			<Link to="/SPA/counter">counter</Link>
			<Link to="/SPA/nested">nested</Link>
		</aside>
	);
};

export const SPAIndex = () => {
	return (
		<div>
			<h3>Welcome to the SPA</h3>
			<p>
				Think of this as having a whole vite or create-react-app app embedded just in a subroute of
				your application.
			</p>
			<p>
				This page is available from both Astro and Vite and the main difference is HMR (hot module
				replacement). In Vite your React state can be preserved when you edit a file. This example
				app has a examples of such state, like the ⚡️ button in the header. Or a counter in{' '}
				<Link to="/SPA/counter">counter</Link> page.
			</p>
		</div>
	);
};

export const NotFound = () => {
	return (
		<div>
			<h1>404</h1>
			<p>Page not found (in react router)</p>
			<Link to="/SPA">Go back home</Link>
		</div>
	);
};

export const Nested = () => {
	const x = useLoaderData() as string;

	const { id = '' } = useParams<{ id?: string }>();
	const prev = id === '1' ? '' : id ? Number(id) - 1 : '';
	const next = id ? Number(id) + 1 : 1;

	return (
		<div>
			<h3>Just some kind of nested page</h3>
			<div dangerouslySetInnerHTML={{ __html: x }} />
			<p>We are on the page /SPA/nested/{id}</p>
			{id != '' && <Link to={'/SPA/nested/' + prev}>Previous</Link>}{' '}
			{!!next && <Link to={'/SPA/nested/' + next}>Next</Link>}
		</div>
	);
};

export const Counter = () => {
	const [count, setCount] = useState(0);
	return (
		<div>
			<p>
				Notice that you can edit <code>src/components/SPA.tsx</code> and counter value will be
				preserved in Vite, but not in Astro.
			</p>
			<p>Counter: {count}</p>
			<button onClick={() => setCount(count + 1)}>Increment</button>
		</div>
	);
};
