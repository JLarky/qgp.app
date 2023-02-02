import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import style from './SPA.module.css';
import '../styles/global.css';

export const Layout = () => {
	return (
		<div className={style.spa}>
			<header>
				<h2>QGP — Astro superpowered by Vite HMR</h2>
				<nav>
					<a href="/">Home</a>
					<a href="/astro">Astro</a>
					<a href="/blog">Blog</a>
					<a href="/about">About</a>
					<Link className={style.active} to="/SPA">
						SPA
					</Link>
					<a href="https://twitter.com/JLarky" target="_blank">
						Twitter
					</a>
					<a href="https://github.com/JLarky/qgp.app" target="_blank">
						GitHub
					</a>
					<a href="https://qgp.vercel.app/" target="_blank">
						Docs
					</a>
				</nav>
			</header>
			<Outlet />
		</div>
	);
};

export const SPA = () => {
	const [theme, setTheme] = useState('light');

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
		console.log('theme', theme);
	};

	return (
		<div className={theme + ' root'}>
			<button className={style.toggleTheme} onClick={toggleTheme}>
				Toggle theme
			</button>
			<h1 className={theme}>
				React App powered by QGP<Loading>⚡️</Loading>
			</h1>
			<div className={style.app}>
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
			<p>
				You can only see this message on the Vite dev server. If you want to work on the rest of the
				website, you need to use the Astro dev server currently on running on port 3000{' '}
				<a href="http://localhost:3000/">here</a>.
			</p>
			<p>
				But, if you want to see the HMR in action, go to the <Link to="/SPA">SPA</Link> page.
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
			{state === 'loading' && ' (Imagine this is a spinner. 😄)'}
			{state === 'loaded' && (
				<button onClick={() => setCount((i) => (i + 1) % 3)} className={style.btn}>
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
			<Link to="/SPA">Index</Link>
			<Link to="/SPA/counter">Counter</Link>
			<Link to="/SPA/nested">Nested Routes</Link>
		</aside>
	);
};

export const SPAIndex = () => {
	return (
		<div className="flex flex-col gap-2">
			<h3>QGP Example SPA!</h3>
			<p>
				Toggle the theme with the button on the top-left. Now, click around the sidebar and come
				back. Watch the URL. It changes without refreshing the page. This is how you know that this
				is not just a React app, it's a single page application with{' '}
				<Link to="/SPA/nested">full client-side routing!</Link>
			</p>

			<p>
				If you follow <a href="/#create-qgp">the instructions</a> to copy the demo template, you can
				edit this text in <code>src/components/SPA.tsx</code> and see the changes without reloading
				the entire page-- but only if you're running the Vite dev server that QGP set up.
			</p>

			<p>
				To clarify, this page is available from both dev servers (
				<a href="http://localhost:3000">Astro</a> and <a href="http://localhost:5173">Vite</a>). The
				Vite server is just for the React app, and the main difference is the{' '}
				<a href="https://vitejs.dev/guide/why.html">HMR</a> experience. In Vite, the state of your
				React app is preserved even after you edit the files that it uses. In contrast, Astro
				refreshes the entire web page every time you save any file that it uses -- losing the app's
				state.
			</p>

			<p>
				This example app has several demonstrations of such state like the ⚡️ button in the header,
				the toggle theme button in the upper-left corner, and{' '}
				<Link to="/SPA/counter">a classic counter</Link>. It also includes{' '}
				<Link to="/SPA/nested">some nested routes</Link> to show that your React app doesn't have to
				live inside one route. After you're done here, you can either start building or you can
				check out <a href="http://qgp.vercel.app">the docs</a> to learn more about QGP.
			</p>
		</div>
	);
};

export const NotFound = () => {
	return (
		<div
			className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
			role="alert"
		>
			<h1>404</h1>
			<p>This page was routed through Astro into React Router. Pretty cool, huh?</p>
			<p>
				The only limitation is that you will lose your React app's state each time this happens.
			</p>
			<Link to="/SPA">Go back home</Link>
		</div>
	);
};

export const Nested = () => {
	const { id = '' } = useParams<{ id?: string }>();
	const prev = id === '1' ? '' : id ? Number(id) - 1 : '';
	const next = id ? Number(id) + 1 : 1;

	return (
		<div>
			<h3>Nested Routes!</h3>
			<p>We are on the page /SPA/nested/{id}</p>
			{id != '' && <Link to={'/SPA/nested/' + prev}>Previous</Link>}{' '}
			{!!next && <Link to={'/SPA/nested/' + next}>Next</Link>}
			<p>
				This template takes advantage of a little known hack of Astro's routing system. Astro allows
				you to implement a custom 404 page for all unspecified routes with a file at{' '}
				<code>/404.astro</code>. We simply redirect that 404 page back into our single page
				application.
			</p>
			<p>
				Within the SPA, we use React Router to handle routing from there. There is a shared header
				with a nav bar to connect us back to the rest of the website. For any actual 404 errors, we
				can just push them back to{' '}
				<Link to="/some/nonsense/that/doesnt/work">the SPA's 404 page</Link> using React Router.
			</p>
		</div>
	);
};

export const Counter = () => {
	const [count, setCount] = useState(0);
	return (
		<div>
			<h3>Counter!</h3>
			<p>
				This is just here to show the difference in state preservation between Astro and Vite's HMR.
				Notice that you can edit <code>src/components/SPA.tsx</code> and the counter's value will be
				preserved on the <a href="http://localhost:5173/SPA/counter">Vite dev server</a>, but not on{' '}
				<a href="http://localhost:3000/SPA/counter">Astro's.</a> For obvious reasons, the count will
				not be shared between the two servers.
			</p>
			<p>Counter: {count}</p>
			<button className="p-2 m-2 bg-blue-500 text-white" onClick={() => setCount(count + 1)}>
				Increment
			</button>
		</div>
	);
};
