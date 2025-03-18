// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import solid from '@astrojs/solid-js';
import partytown from '@astrojs/partytown';
import vercel from '@astrojs/vercel/serverless';
import { defineAstro } from 'qgp';

import { common } from './qgp.config.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://qgp.deno.dev',
	integrations: [mdx(), sitemap(), solid(), partytown({ config: { forward: ['dataLayer.push'] } })],
	vite: defineAstro(common, {}),
	output: 'server',
	server: { port: 3000 },
	adapter: vercel(),
});
