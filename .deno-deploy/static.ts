#!/usr/bin/env -S deno run --allow-net --allow-read

import { Application, isHttpError, Status } from 'https://deno.land/x/oak/mod.ts';

const app = new Application();
console.log('http://localhost:8080/');

app.use(async (context, next) => {
	try {
		await context.send({
			root: `${Deno.cwd()}`,
			index: 'index.html',
		});
	} catch (err) {
		if (isHttpError(err) && err.status === Status.NotFound) {
			// redirect to our custom 404 page
			context.request.url.pathname = '404.html';
			await context.send({
				root: `${Deno.cwd()}`,
			});
		} else {
			await next();
		}
	}
});

await app.listen({ port: 8080 });
