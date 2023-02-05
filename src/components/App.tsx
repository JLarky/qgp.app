import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import { routes } from './routes';
import { getContext } from '../ssr/context';

let App = () => {
	const router = createBrowserRouter(routes());
	return <RouterProvider router={router} fallbackElement={null} />;
};

if (import.meta.env.SSR) {
	App = () => {
		const ctx = getContext();
		const router = createStaticRouter(routes(), ctx);
		return <StaticRouterProvider context={ctx} router={router} />;
	};
}

export default App;
