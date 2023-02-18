import { useLocation, useParams, useRouteData } from '@solidjs/router';
import { createEffect, Resource } from 'solid-js';

// const text =
// 	(typeof document !== 'undefined' &&
// 		document.querySelector('[data-hk="s00-0-0-0-0-0-1-0-0-0-6-0-0-0-0-0"]')?.textContent) ||
// 	undefined;

export const Docs = () => {
	const x = useLocation();
	const __html = useRouteData() as unknown as Resource<string>;
	console.log('useRouteData', x.pathname, __html());
	createEffect(() => {
		console.log('useRouteData', x.pathname, __html());
	});
	return <div innerHTML={__html()} />;
};
