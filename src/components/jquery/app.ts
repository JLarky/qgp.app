import { fetch$ } from '@qgp-js/bling';
import $ from 'jquery';

export const increment = fetch$(
	async function ({ count, button }: { count: number; button: '+' | '-' }) {
		// await new Promise((r) => setTimeout(r, 1000));
		return {
			count: count + (button === '+' ? 1 : -1),
		};
	},
	{
		method: 'POST',
	}
);

const run = () => {
	const div = $('.counter');
	const pre = div.find('pre');
	let count = Number(div[0].dataset.count || 0);
	div.find('button').on('click', async function () {
		const res = await increment({ count, button: $(this).text() as '+' | '-' });
		count = res.count;
		pre.text(count);
	});
};

typeof document === 'object' && run();

export const registerHandler = (x: number) => {
	// this is done during SSR so that bling server know that we have a handler for this route
	// it's not necessary to do it in the real app that uses real SSR, this is jQuery 😅
	// otherise this function is not getting included into server bundle
	if (x) {
		increment;
	}
};
