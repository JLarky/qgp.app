import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import type { StaticHandlerContext } from '@remix-run/router';
import { routes } from './routes';

export default ({ context }: { context?: StaticHandlerContext }) => {
	if (typeof document === 'undefined' && context) {
		const router = createStaticRouter(routes(), context);
		return <StaticRouterProvider context={context} router={router} />;
	} else {
		const router = createBrowserRouter(routes());
		return <RouterProvider router={router} fallbackElement={null} />;
	}
};
