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
