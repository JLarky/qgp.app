import type { APIRoute } from 'astro';
import { handleEvent, hasHandler } from '@qgp-js/bling/server';

export const all: APIRoute = async ({ params, request }) => {
	console.log('params', params);
	const id = params.bling;
	if (hasHandler('/' + id)) {
		const res = await handleEvent({ request });
		if (!res) {
			throw new Error('failed to handle event');
		}
		return res;
	}
	return new Response(null, {
		status: 404,
		statusText: 'Not found',
	});
};
