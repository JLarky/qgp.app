import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const get: APIRoute = async function get({ params, request }) {
	const docs = await getCollection('docs');

	console.log('getArticle.ts', await docs[0].render());
	return {
		body: 'hello world',
	};
};
